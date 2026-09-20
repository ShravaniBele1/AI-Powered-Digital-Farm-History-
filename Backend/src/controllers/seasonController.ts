import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createSeasonSchema } from '../validators/schemas';

export async function getSeasons(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { farm_id } = req.query;

    const seasons = await prisma.seasons.findMany({
      where: {
        farms: { user_id: userId },
        ...(farm_id ? { farm_id: String(farm_id) } : {})
      },
      orderBy: { year: 'desc' }
    });

    const formatted = seasons.map(s => ({
      id: s.id,
      farm_id: s.farm_id,
      name: s.name,
      year: s.year,
      start_date: s.start_date ? new Date(s.start_date).toISOString().split('T')[0] : '',
      end_date: s.end_date ? new Date(s.end_date).toISOString().split('T')[0] : ''
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createSeason(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createSeasonSchema.parse(req.body);

    const farm = await prisma.farms.findFirst({
      where: { id: data.farm_id, user_id: userId }
    });

    if (!farm) {
      res.status(403).json({ error: 'Invalid farm_id or access denied' });
      return;
    }

    const season = await prisma.seasons.create({
      data: {
        farm_id: data.farm_id,
        name: data.name,
        year: data.year,
        start_date: data.start_date ? new Date(data.start_date) : null,
        end_date: data.end_date ? new Date(data.end_date) : null
      }
    });

    res.status(201).json({
      id: season.id,
      farm_id: season.farm_id,
      name: season.name,
      year: season.year,
      start_date: season.start_date ? new Date(season.start_date).toISOString().split('T')[0] : '',
      end_date: season.end_date ? new Date(season.end_date).toISOString().split('T')[0] : ''
    });
  } catch (error) {
    next(error);
  }
}
