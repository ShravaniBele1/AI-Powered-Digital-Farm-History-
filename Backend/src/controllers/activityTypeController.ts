import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export async function getActivityTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const types = await prisma.activity_types.findMany({
      orderBy: { name: 'asc' }
    });

    const formatted = types.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category || 'General',
      created_at: t.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}
