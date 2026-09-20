import { Router } from 'express';
import { getSeasons, createSeason } from '../controllers/seasonController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getSeasons);
router.post('/', createSeason);

export default router;
