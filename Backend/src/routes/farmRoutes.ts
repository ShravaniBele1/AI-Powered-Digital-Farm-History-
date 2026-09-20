import { Router } from 'express';
import { getFarms, createFarm, updateFarm } from '../controllers/farmController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getFarms);
router.post('/', createFarm);
router.patch('/:id', updateFarm);

export default router;
