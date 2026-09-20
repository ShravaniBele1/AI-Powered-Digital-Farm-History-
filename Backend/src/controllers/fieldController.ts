import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createFieldSchema, updateFieldSchema } from '../validators/schemas';

export async function getFields(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { farm_id } = req.query;

    const fields = await prisma.fields.findMany({
      where: {
        farms: { user_id: userId },
        ...(farm_id ? { farm_id: String(farm_id) } : {})
      },
      orderBy: { created_at: 'asc' }
    });

    const formatted = fields.map(f => ({
      id: f.id,
      farm_id: f.farm_id,
      field_name: f.field_name,
      area_acres: f.area_acres ? Number(f.area_acres) : 0,
      soil_type: f.soil_type || '',
      irrigation_type: f.irrigation_type || '',
      notes: f.notes || undefined,
      created_at: f.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createField(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createFieldSchema.parse(req.body);

    // Verify farm ownership
    const farm = await prisma.farms.findFirst({
      where: { id: data.farm_id, user_id: userId }
    });

    if (!farm) {
      res.status(403).json({ error: 'Invalid farm_id or access denied' });
      return;
    }

    const field = await prisma.fields.create({
      data: {
        farm_id: data.farm_id,
        field_name: data.field_name,
        area_acres: data.area_acres || null,
        soil_type: data.soil_type || null,
        irrigation_type: data.irrigation_type || null,
        notes: data.notes || null
      }
    });

    res.status(201).json({
      id: field.id,
      farm_id: field.farm_id,
      field_name: field.field_name,
      area_acres: field.area_acres ? Number(field.area_acres) : 0,
      soil_type: field.soil_type || '',
      irrigation_type: field.irrigation_type || '',
      notes: field.notes || undefined,
      created_at: field.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function updateField(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const data = updateFieldSchema.parse(req.body);

    const existingField = await prisma.fields.findFirst({
      where: {
        id,
        farms: { user_id: userId }
      }
    });

    if (!existingField) {
      res.status(404).json({ error: 'Field not found or access denied' });
      return;
    }

    const updated = await prisma.fields.update({
      where: { id },
      data: {
        ...(data.field_name !== undefined && { field_name: data.field_name }),
        ...(data.area_acres !== undefined && { area_acres: data.area_acres }),
        ...(data.soil_type !== undefined && { soil_type: data.soil_type }),
        ...(data.irrigation_type !== undefined && { irrigation_type: data.irrigation_type }),
        ...(data.notes !== undefined && { notes: data.notes }),
        updated_at: new Date()
      }
    });

    res.json({
      id: updated.id,
      farm_id: updated.farm_id,
      field_name: updated.field_name,
      area_acres: updated.area_acres ? Number(updated.area_acres) : 0,
      soil_type: updated.soil_type || '',
      irrigation_type: updated.irrigation_type || '',
      notes: updated.notes || undefined,
      created_at: updated.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteField(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const existingField = await prisma.fields.findFirst({
      where: {
        id,
        farms: { user_id: userId }
      }
    });

    if (!existingField) {
      res.status(404).json({ error: 'Field not found or access denied' });
      return;
    }

    await prisma.fields.delete({
      where: { id }
    });

    res.json({ message: 'Field deleted successfully' });
  } catch (error) {
    next(error);
  }
}
