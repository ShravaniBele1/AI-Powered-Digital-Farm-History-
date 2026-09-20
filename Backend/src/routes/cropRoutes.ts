import { Router } from 'express';
import { getCrops } from '../controllers/cropController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getCrops);

export default router;
