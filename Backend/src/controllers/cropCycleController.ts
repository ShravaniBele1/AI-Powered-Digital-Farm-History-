import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createCropCycleSchema, updateCropCycleSchema } from '../validators/schemas';

export async function getCropCycles(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { field_id, crop_id, season_id } = req.query;

    const cycles = await prisma.crop_cycles.findMany({
      where: {
        fields: {
          farms: { user_id: userId }
        },
        ...(field_id ? { field_id: String(field_id) } : {}),
        ...(crop_id ? { crop_id: String(crop_id) } : {}),
        ...(season_id ? { season_id: String(season_id) } : {})
      },
      orderBy: { created_at: 'desc' }
    });

    const formatted = cycles.map(c => ({
      id: c.id,
      field_id: c.field_id,
      crop_id: c.crop_id,
      season_id: c.season_id,
      variety: c.variety || '',
      sowing_date: c.sowing_date ? new Date(c.sowing_date).toISOString().split('T')[0] : '',
      expected_harvest_date: c.expected_harvest_date ? new Date(c.expected_harvest_date).toISOString().split('T')[0] : '',
      actual_harvest_date: c.actual_harvest_date ? new Date(c.actual_harvest_date).toISOString().split('T')[0] : undefined,
      status: c.status || 'Active',
      notes: c.notes || undefined,
      created_at: c.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createCropCycle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createCropCycleSchema.parse(req.body);

    // Verify user owns the field
    const field = await prisma.fields.findFirst({
      where: {
        id: data.field_id,
        farms: { user_id: userId }
      }
    });

    if (!field) {
      res.status(403).json({ error: 'Invalid field_id or access denied' });
      return;
    }

    const cycle = await prisma.crop_cycles.create({
      data: {
        field_id: data.field_id,
        crop_id: data.crop_id,
        season_id: data.season_id,
        variety: data.variety || null,
        sowing_date: data.sowing_date ? new Date(data.sowing_date) : null,
        expected_harvest_date: data.expected_harvest_date ? new Date(data.expected_harvest_date) : null,
        actual_harvest_date: data.actual_harvest_date ? new Date(data.actual_harvest_date) : null,
        status: data.status || 'Active',
        notes: data.notes || null
      }
    });

    res.status(201).json({
      id: cycle.id,
      field_id: cycle.field_id,
      crop_id: cycle.crop_id,
      season_id: cycle.season_id,
      variety: cycle.variety || '',
      sowing_date: cycle.sowing_date ? new Date(cycle.sowing_date).toISOString().split('T')[0] : '',
      expected_harvest_date: cycle.expected_harvest_date ? new Date(cycle.expected_harvest_date).toISOString().split('T')[0] : '',
      actual_harvest_date: cycle.actual_harvest_date ? new Date(cycle.actual_harvest_date).toISOString().split('T')[0] : undefined,
      status: cycle.status || 'Active',
      notes: cycle.notes || undefined,
      created_at: cycle.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCropCycle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const data = updateCropCycleSchema.parse(req.body);

    const existingCycle = await prisma.crop_cycles.findFirst({
      where: {
        id,
        fields: { farms: { user_id: userId } }
      }
    });

    if (!existingCycle) {
      res.status(404).json({ error: 'Crop cycle not found or access denied' });
      return;
    }

    const updated = await prisma.crop_cycles.update({
      where: { id },
      data: {
        ...(data.field_id !== undefined && { field_id: data.field_id }),
        ...(data.crop_id !== undefined && { crop_id: data.crop_id }),
        ...(data.season_id !== undefined && { season_id: data.season_id }),
        ...(data.variety !== undefined && { variety: data.variety }),
        ...(data.sowing_date !== undefined && { sowing_date: data.sowing_date ? new Date(data.sowing_date) : null }),
        ...(data.expected_harvest_date !== undefined && { expected_harvest_date: data.expected_harvest_date ? new Date(data.expected_harvest_date) : null }),
        ...(data.actual_harvest_date !== undefined && { actual_harvest_date: data.actual_harvest_date ? new Date(data.actual_harvest_date) : null }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.notes !== undefined && { notes: data.notes }),
        updated_at: new Date()
      }
    });

    res.json({
      id: updated.id,
      field_id: updated.field_id,
      crop_id: updated.crop_id,
      season_id: updated.season_id,
      variety: updated.variety || '',
      sowing_date: updated.sowing_date ? new Date(updated.sowing_date).toISOString().split('T')[0] : '',
      expected_harvest_date: updated.expected_harvest_date ? new Date(updated.expected_harvest_date).toISOString().split('T')[0] : '',
      actual_harvest_date: updated.actual_harvest_date ? new Date(updated.actual_harvest_date).toISOString().split('T')[0] : undefined,
      status: updated.status || 'Active',
      notes: updated.notes || undefined,
      created_at: updated.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}
