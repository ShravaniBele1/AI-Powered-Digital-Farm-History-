import { Router } from 'express';
import { askAiCopilot, getAiHistory } from '../controllers/aiController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/query', askAiCopilot);
router.get('/history', getAiHistory);

export default router;
