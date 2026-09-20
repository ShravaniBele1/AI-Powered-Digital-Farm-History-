import { Router } from 'express';
import { getActivityTypes } from '../controllers/activityTypeController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getActivityTypes);

export default router;
