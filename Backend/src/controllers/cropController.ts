import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export async function getCrops(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const crops = await prisma.crops.findMany({
      orderBy: { name: 'asc' }
    });

    const formatted = crops.map(c => ({
      id: c.id,
      name: c.name,
      category: c.category || 'Cereal',
      created_at: c.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}
