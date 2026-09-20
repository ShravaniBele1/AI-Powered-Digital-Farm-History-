import { Router } from 'express';
import { getActivities, createActivity, deleteActivity, exportActivitiesCsv } from '../controllers/activityController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

// Export CSV before :id route
router.get('/export', exportActivitiesCsv);
router.get('/', getActivities);
router.post('/', createActivity);
router.delete('/:id', deleteActivity);

export default router;
