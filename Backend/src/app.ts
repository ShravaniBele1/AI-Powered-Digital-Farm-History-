import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app: Express = express();

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file hosting for uploaded receipts/documents
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api', apiRouter);

// Serve Frontend Static Build if available (for 1-place all-in-one deployment)
const frontendDistCandidates = [
  path.join(process.cwd(), '../frontend/dist'),
  path.join(process.cwd(), 'frontend/dist'),
  path.join(__dirname, '../../frontend/dist')
];

let frontendDistPath: string | null = null;
for (const candidate of frontendDistCandidates) {
  if (fs.existsSync(candidate)) {
    frontendDistPath = candidate;
    break;
  }
}

if (frontendDistPath) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(frontendDistPath!, 'index.html'));
  });
} else {
  // Root info when running standalone backend
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to KrishiGatha AI API Server',
      status: 'online',
      version: '1.0.0',
      documentation: '/api/health'
    });
  });

  // 404 Handler for API only mode
  app.use((req: Request, res: Response) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
  });
}

// Centralized error handler
app.use(errorHandler);

export default app;
