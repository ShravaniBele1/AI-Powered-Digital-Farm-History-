import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createActivitySchema } from '../validators/schemas';
import { generateActivitiesCsv, ActivityCsvRow } from '../utils/csvExporter';

export async function getActivities(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { fieldId, cropId, seasonId, activityTypeId, searchQuery, startDate, endDate } = req.query;

    const activities = await prisma.activities.findMany({
      where: {
        crop_cycles: {
          fields: {
            farms: { user_id: userId }
          },
          ...(fieldId && fieldId !== 'all' ? { field_id: String(fieldId) } : {}),
          ...(cropId && cropId !== 'all' ? { crop_id: String(cropId) } : {}),
          ...(seasonId && seasonId !== 'all' ? { season_id: String(seasonId) } : {})
        },
        ...(activityTypeId && activityTypeId !== 'all' ? { activity_type_id: String(activityTypeId) } : {}),
        ...(startDate ? { activity_date: { gte: new Date(String(startDate)) } } : {}),
        ...(endDate ? { activity_date: { lte: new Date(String(endDate)) } } : {}),
        ...(searchQuery && String(searchQuery).trim() !== '' ? {
          OR: [
            { description: { contains: String(searchQuery), mode: 'insensitive' } },
            { notes: { contains: String(searchQuery), mode: 'insensitive' } }
          ]
        } : {})
      },
      orderBy: { activity_date: 'desc' }
    });

    const formatted = activities.map(a => ({
      id: a.id,
      crop_cycle_id: a.crop_cycle_id,
      activity_type_id: a.activity_type_id,
      activity_date: a.activity_date ? new Date(a.activity_date).toISOString().split('T')[0] : '',
      description: a.description || '',
      quantity: a.quantity ? Number(a.quantity) : undefined,
      unit: a.unit || undefined,
      cost: a.cost ? Number(a.cost) : undefined,
      notes: a.notes || undefined,
      created_at: a.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createActivitySchema.parse(req.body);

    // Verify user owns the crop cycle
    const cropCycle = await prisma.crop_cycles.findFirst({
      where: {
        id: data.crop_cycle_id,
        fields: { farms: { user_id: userId } }
      }
    });

    if (!cropCycle) {
      res.status(403).json({ error: 'Invalid crop_cycle_id or access denied' });
      return;
    }

    // Determine expense category if expenseAmount is provided
    let expenseCategory = 'Other';
    if (data.expenseAmount && data.expenseAmount > 0) {
      const actType = await prisma.activity_types.findUnique({
        where: { id: data.activity_type_id }
      });
      const name = actType?.name?.toLowerCase() || '';
      if (name.includes('fertiliz')) expenseCategory = 'Fertilizer';
      else if (name.includes('pesticide')) expenseCategory = 'Pesticide';
      else if (name.includes('sow') || name.includes('seed')) expenseCategory = 'Seeds';
      else if (name.includes('plough') || name.includes('machin')) expenseCategory = 'Machinery';
      else if (name.includes('weed') || name.includes('labour')) expenseCategory = 'Labour';
      else if (name.includes('harvest')) expenseCategory = 'Harvesting';
    }

    // Execute in an atomic database transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create activity
      const activity = await tx.activities.create({
        data: {
          crop_cycle_id: data.crop_cycle_id,
          activity_type_id: data.activity_type_id,
          activity_date: new Date(data.activity_date),
          description: data.description || null,
          quantity: data.quantity !== undefined ? data.quantity : null,
          unit: data.unit || null,
          cost: data.cost !== undefined ? data.cost : null,
          notes: data.notes || null
        }
      });

      // 2. Create linked input if provided
      let createdInput = null;
      if (data.inputData && data.inputData.product_name) {
        createdInput = await tx.inputs.create({
          data: {
            activity_id: activity.id,
            input_type: data.inputData.input_type || 'General',
            product_name: data.inputData.product_name,
            quantity: data.inputData.quantity !== undefined ? data.inputData.quantity : (data.quantity !== undefined ? data.quantity : null),
            unit: data.inputData.unit || data.unit || null,
            cost: data.inputData.cost !== undefined ? data.inputData.cost : (data.cost !== undefined ? data.cost : null),
            supplier: data.inputData.supplier || 'Local Supplier',
            notes: data.inputData.notes || null
          }
        });
      }

      // 3. Create linked expense if provided
      let createdExpense = null;
      if (data.expenseAmount && data.expenseAmount > 0) {
        createdExpense = await tx.expenses.create({
          data: {
            crop_cycle_id: data.crop_cycle_id,
            expense_date: new Date(data.activity_date),
            category: expenseCategory,
            description: data.description || 'Activity Expense',
            amount: data.expenseAmount,
            payment_method: 'UPI',
            notes: data.notes || null
          }
        });
      }

      return { activity, createdInput, createdExpense };
    });

    res.status(201).json({
      id: result.activity.id,
      crop_cycle_id: result.activity.crop_cycle_id,
      activity_type_id: result.activity.activity_type_id,
      activity_date: result.activity.activity_date ? new Date(result.activity.activity_date).toISOString().split('T')[0] : '',
      description: result.activity.description || '',
      quantity: result.activity.quantity ? Number(result.activity.quantity) : undefined,
      unit: result.activity.unit || undefined,
      cost: result.activity.cost ? Number(result.activity.cost) : undefined,
      notes: result.activity.notes || undefined,
      created_at: result.activity.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const activity = await prisma.activities.findFirst({
      where: {
        id,
        crop_cycles: {
          fields: {
            farms: { user_id: userId }
          }
        }
      }
    });

    if (!activity) {
      res.status(404).json({ error: 'Activity not found or access denied' });
      return;
    }

    await prisma.activities.delete({
      where: { id }
    });

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function exportActivitiesCsv(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { fieldId, cropId, seasonId, activityTypeId, searchQuery, startDate, endDate } = req.query;

    const activities = await prisma.activities.findMany({
      where: {
        crop_cycles: {
          fields: {
            farms: { user_id: userId }
          },
          ...(fieldId && fieldId !== 'all' ? { field_id: String(fieldId) } : {}),
          ...(cropId && cropId !== 'all' ? { crop_id: String(cropId) } : {}),
          ...(seasonId && seasonId !== 'all' ? { season_id: String(seasonId) } : {})
        },
        ...(activityTypeId && activityTypeId !== 'all' ? { activity_type_id: String(activityTypeId) } : {}),
        ...(startDate ? { activity_date: { gte: new Date(String(startDate)) } } : {}),
        ...(endDate ? { activity_date: { lte: new Date(String(endDate)) } } : {}),
        ...(searchQuery && String(searchQuery).trim() !== '' ? {
          OR: [
            { description: { contains: String(searchQuery), mode: 'insensitive' } },
            { notes: { contains: String(searchQuery), mode: 'insensitive' } }
          ]
        } : {})
      },
      include: {
        activity_types: true
      },
      orderBy: { activity_date: 'desc' }
    });

    const csvData: ActivityCsvRow[] = activities.map(a => ({
      id: a.id,
      activity_date: a.activity_date ? new Date(a.activity_date).toISOString().split('T')[0] : '',
      activity_type: a.activity_types?.name || 'General',
      crop_cycle_id: a.crop_cycle_id,
      description: a.description || '',
      quantity: a.quantity ? Number(a.quantity) : '',
      unit: a.unit || '',
      cost: a.cost ? Number(a.cost) : '',
      notes: a.notes || '',
      created_at: a.created_at?.toISOString() || ''
    }));

    const csvContent = generateActivitiesCsv(csvData);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=farm_activities_${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
}
