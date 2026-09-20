import { Router } from 'express';
import authRoutes from './authRoutes';
import farmRoutes from './farmRoutes';
import fieldRoutes from './fieldRoutes';
import cropRoutes from './cropRoutes';
import seasonRoutes from './seasonRoutes';
import cropCycleRoutes from './cropCycleRoutes';
import activityTypeRoutes from './activityTypeRoutes';
import activityRoutes from './activityRoutes';
import inputRoutes from './inputRoutes';
import expenseRoutes from './expenseRoutes';
import harvestRoutes from './harvestRoutes';
import documentRoutes from './documentRoutes';
import aiRoutes from './aiRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'KrishiGatha AI Backend',
    timestamp: new Date().toISOString()
  });
});

// Mount modules
router.use('/auth', authRoutes);
router.use('/farms', farmRoutes);
router.use('/fields', fieldRoutes);
router.use('/crops', cropRoutes);
router.use('/seasons', seasonRoutes);
router.use('/crop-cycles', cropCycleRoutes);
router.use('/activity-types', activityTypeRoutes);
router.use('/activities', activityRoutes);
router.use('/inputs', inputRoutes);
router.use('/expenses', expenseRoutes);
router.use('/harvests', harvestRoutes);
router.use('/documents', documentRoutes);
router.use('/ai', aiRoutes);

export default router;
