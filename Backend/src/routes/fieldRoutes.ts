import { Router } from 'express';
import { getFields, createField, updateField, deleteField } from '../controllers/fieldController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getFields);
router.post('/', createField);
router.patch('/:id', updateField);
router.delete('/:id', deleteField);

export default router;
