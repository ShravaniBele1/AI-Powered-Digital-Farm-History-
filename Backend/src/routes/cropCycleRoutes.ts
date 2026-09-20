import { Router } from 'express';
import { getCropCycles, createCropCycle, updateCropCycle } from '../controllers/cropCycleController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getCropCycles);
router.post('/', createCropCycle);
router.patch('/:id', updateCropCycle);

export default router;
