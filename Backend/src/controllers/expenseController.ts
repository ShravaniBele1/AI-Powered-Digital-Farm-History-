import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { createExpenseSchema } from '../validators/schemas';

export async function getExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { crop_cycle_id } = req.query;

    const expenses = await prisma.expenses.findMany({
      where: {
        crop_cycles: {
          fields: {
            farms: { user_id: userId }
          }
        },
        ...(crop_cycle_id ? { crop_cycle_id: String(crop_cycle_id) } : {})
      },
      orderBy: { expense_date: 'desc' }
    });

    const formatted = expenses.map(e => ({
      id: e.id,
      crop_cycle_id: e.crop_cycle_id,
      expense_date: e.expense_date ? new Date(e.expense_date).toISOString().split('T')[0] : '',
      category: e.category,
      description: e.description || '',
      amount: Number(e.amount),
      payment_method: e.payment_method || 'Cash',
      notes: e.notes || undefined,
      created_at: e.created_at?.toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const data = createExpenseSchema.parse(req.body);

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

    const expense = await prisma.expenses.create({
      data: {
        crop_cycle_id: data.crop_cycle_id,
        expense_date: new Date(data.expense_date),
        category: data.category,
        description: data.description || null,
        amount: data.amount,
        payment_method: data.payment_method || 'Cash',
        notes: data.notes || null
      }
    });

    res.status(201).json({
      id: expense.id,
      crop_cycle_id: expense.crop_cycle_id,
      expense_date: expense.expense_date ? new Date(expense.expense_date).toISOString().split('T')[0] : '',
      category: expense.category,
      description: expense.description || '',
      amount: Number(expense.amount),
      payment_method: expense.payment_method || 'Cash',
      notes: expense.notes || undefined,
      created_at: expense.created_at?.toISOString()
    });
  } catch (error) {
    next(error);
  }
}
