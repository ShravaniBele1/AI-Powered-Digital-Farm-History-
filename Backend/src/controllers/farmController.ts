import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createFarmSchema, updateFarmSchema } from '../validators/schemas';

export async function getFarms(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const farms = await prisma.farms.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });

    // Format raw rows
    const formatted = farms.map(f => ({
      id: f.id,
      user_id: f.user_id,
      farm_name: f.farm_name,
      village: f.village,
      district: f.district,
      state: f.state,
      total_area_acres: f.total_area_acres ? Number(f.total_area_acres) : 0,
      created_at: f.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createFarm(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createFarmSchema.parse(req.body);

    const farm = await prisma.farms.create({
      data: {
        user_id: userId,
        farm_name: data.farm_name,
        village: data.village || null,
        district: data.district || null,
        state: data.state || null,
        total_area_acres: data.total_area_acres || null
      }
    });

    res.status(201).json({
      id: farm.id,
      user_id: farm.user_id,
      farm_name: farm.farm_name,
      village: farm.village,
      district: farm.district,
      state: farm.state,
      total_area_acres: farm.total_area_acres ? Number(farm.total_area_acres) : 0,
      created_at: farm.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function updateFarm(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const data = updateFarmSchema.parse(req.body);

    const existingFarm = await prisma.farms.findFirst({
      where: { id, user_id: userId }
    });

    if (!existingFarm) {
      res.status(404).json({ error: 'Farm not found or access denied' });
      return;
    }

    const updated = await prisma.farms.update({
      where: { id },
      data: {
        ...(data.farm_name !== undefined && { farm_name: data.farm_name }),
        ...(data.village !== undefined && { village: data.village }),
        ...(data.district !== undefined && { district: data.district }),
        ...(data.state !== undefined && { state: data.state }),
        ...(data.total_area_acres !== undefined && { total_area_acres: data.total_area_acres }),
        updated_at: new Date()
      }
    });

    res.json({
      id: updated.id,
      user_id: updated.user_id,
      farm_name: updated.farm_name,
      village: updated.village,
      district: updated.district,
      state: updated.state,
      total_area_acres: updated.total_area_acres ? Number(updated.total_area_acres) : 0,
      created_at: updated.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}
