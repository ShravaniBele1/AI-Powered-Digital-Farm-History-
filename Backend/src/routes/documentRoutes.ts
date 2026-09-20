import { Router } from 'express';
import { getDocuments, createDocument, scanDocument } from '../controllers/documentController';
import { authenticate } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = Router();

router.use(authenticate);

// Scan endpoint allows uploading receipt image for OCR parsing
router.post('/scan', upload.single('file'), scanDocument);
router.get('/', getDocuments);
router.post('/', upload.single('file'), createDocument);

export default router;
