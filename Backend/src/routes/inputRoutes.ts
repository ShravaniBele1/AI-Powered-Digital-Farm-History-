import { Router } from 'express';
import { getInputs, createInput } from '../controllers/inputController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getInputs);
router.post('/', createInput);

export default router;
