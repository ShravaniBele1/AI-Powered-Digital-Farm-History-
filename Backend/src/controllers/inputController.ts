import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createInputSchema } from '../validators/schemas';

export async function getInputs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { activity_id } = req.query;

    const inputs = await prisma.inputs.findMany({
      where: {
        activities: {
          crop_cycles: {
            fields: {
              farms: { user_id: userId }
            }
          }
        },
        ...(activity_id ? { activity_id: String(activity_id) } : {})
      },
      orderBy: { id: 'asc' }
    });

    const formatted = inputs.map(i => ({
      id: i.id,
      activity_id: i.activity_id,
      input_type: i.input_type,
      product_name: i.product_name,
      quantity: i.quantity ? Number(i.quantity) : undefined,
      unit: i.unit || undefined,
      cost: i.cost ? Number(i.cost) : undefined,
      supplier: i.supplier || undefined,
      notes: i.notes || undefined
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createInput(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createInputSchema.parse(req.body);

    const activity = await prisma.activities.findFirst({
      where: {
        id: data.activity_id,
        crop_cycles: {
          fields: {
            farms: { user_id: userId }
          }
        }
      }
    });

    if (!activity) {
      res.status(403).json({ error: 'Invalid activity_id or access denied' });
      return;
    }

    const input = await prisma.inputs.create({
      data: {
        activity_id: data.activity_id,
        input_type: data.input_type,
        product_name: data.product_name,
        quantity: data.quantity !== undefined ? data.quantity : null,
        unit: data.unit || null,
        cost: data.cost !== undefined ? data.cost : null,
        supplier: data.supplier || null,
        notes: data.notes || null
      }
    });

    res.status(201).json({
      id: input.id,
      activity_id: input.activity_id,
      input_type: input.input_type,
      product_name: input.product_name,
      quantity: input.quantity ? Number(input.quantity) : undefined,
      unit: input.unit || undefined,
      cost: input.cost ? Number(input.cost) : undefined,
      supplier: input.supplier || undefined,
      notes: input.notes || undefined
    });
  } catch (error) {
    next(error);
  }
}
