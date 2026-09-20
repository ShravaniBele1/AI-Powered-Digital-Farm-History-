import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createHarvestSchema } from '../validators/schemas';

export async function getHarvests(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { crop_cycle_id } = req.query;

    const harvests = await prisma.harvests.findMany({
      where: {
        crop_cycles: {
          fields: {
            farms: { user_id: userId }
          }
        },
        ...(crop_cycle_id ? { crop_cycle_id: String(crop_cycle_id) } : {})
      },
      orderBy: { harvest_date: 'desc' }
    });

    const formatted = harvests.map(h => ({
      id: h.id,
      crop_cycle_id: h.crop_cycle_id,
      harvest_date: h.harvest_date ? new Date(h.harvest_date).toISOString().split('T')[0] : '',
      quantity: h.quantity ? Number(h.quantity) : 0,
      unit: h.unit || '',
      quality_grade: h.quality_grade || '',
      selling_price: h.selling_price ? Number(h.selling_price) : 0,
      total_revenue: h.total_revenue ? Number(h.total_revenue) : 0,
      buyer: h.buyer || '',
      notes: h.notes || undefined,
      created_at: h.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createHarvest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createHarvestSchema.parse(req.body);

    const cropCycle = await prisma.crop_cycles.findFirst({
      where: {
        id: data.crop_cycle_id,
        fields: {
          farms: { user_id: userId }
        }
      }
    });

    if (!cropCycle) {
      res.status(403).json({ error: 'Invalid crop_cycle_id or access denied' });
      return;
    }

    const calculatedRevenue = data.total_revenue || ((data.quantity || 0) * (data.selling_price || 0));

    const harvest = await prisma.harvests.create({
      data: {
        crop_cycle_id: data.crop_cycle_id,
        harvest_date: new Date(data.harvest_date),
        quantity: data.quantity || null,
        unit: data.unit || null,
        quality_grade: data.quality_grade || null,
        selling_price: data.selling_price || null,
        total_revenue: calculatedRevenue || null,
        buyer: data.buyer || null,
        notes: data.notes || null
      }
    });

    res.status(201).json({
      id: harvest.id,
      crop_cycle_id: harvest.crop_cycle_id,
      harvest_date: harvest.harvest_date ? new Date(harvest.harvest_date).toISOString().split('T')[0] : '',
      quantity: harvest.quantity ? Number(harvest.quantity) : 0,
      unit: harvest.unit || '',
      quality_grade: harvest.quality_grade || '',
      selling_price: harvest.selling_price ? Number(harvest.selling_price) : 0,
      total_revenue: harvest.total_revenue ? Number(harvest.total_revenue) : 0,
      buyer: harvest.buyer || '',
      notes: harvest.notes || undefined,
      created_at: harvest.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}
