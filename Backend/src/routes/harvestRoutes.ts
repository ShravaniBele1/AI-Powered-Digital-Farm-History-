import { Router } from 'express';
import { getHarvests, createHarvest } from '../controllers/harvestController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getHarvests);
router.post('/', createHarvest);

export default router;
