import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[Error Handler]:', err);

  // Zod validation errors
  if (err instanceof ZodError) {
    const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    res.status(400).json({ error: `Validation Error: ${messages}` });
    return;
  }

  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') || 'field';
      res.status(409).json({ error: `A record with this ${target} already exists.` });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Record not found or already deleted.' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(400).json({ error: 'Foreign key constraint violation. Referenced record does not exist.' });
      return;
    }
    res.status(400).json({ error: `Database Error (${err.code}): ${err.message}` });
    return;
  }

  // Standard or custom errors
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected internal server error occurred';

  res.status(statusCode).json({ error: message });
}
