import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import storageService from '../services/storageService';
import ocrService from '../services/ocrService';
import { createDocumentSchema } from '../validators/schemas';

export async function getDocuments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { farm_id, field_id, crop_cycle_id } = req.query;

    const documents = await prisma.documents.findMany({
      where: {
        farms: { user_id: userId },
        ...(farm_id ? { farm_id: String(farm_id) } : {}),
        ...(field_id ? { field_id: String(field_id) } : {}),
        ...(crop_cycle_id ? { crop_cycle_id: String(crop_cycle_id) } : {})
      },
      orderBy: { uploaded_at: 'desc' }
    });

    const formatted = documents.map(d => ({
      id: d.id,
      farm_id: d.farm_id,
      field_id: d.field_id || undefined,
      crop_cycle_id: d.crop_cycle_id || undefined,
      document_type: d.document_type || 'Invoice / Bill',
      file_name: d.file_name,
      file_url: d.file_url,
      extracted_text: d.extracted_text || undefined,
      uploaded_at: d.uploaded_at?.toISOString() || new Date().toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}

export async function createDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    let farmId = req.body.farm_id;
    let fieldId = req.body.field_id || null;
    let cropCycleId = req.body.crop_cycle_id || null;
    let documentType = req.body.document_type || 'Invoice / Bill';
    let extractedText = req.body.extracted_text || null;
    let fileName = req.body.file_name;
    let fileUrl = req.body.file_url;

    // Handle file upload if present via multer
    if (req.file) {
      fileName = req.file.originalname;
      fileUrl = storageService.getPublicUrl(req.file.filename);
      // Auto-extract text if not provided
      if (!extractedText) {
        const ocrResult = await ocrService.extractFromImage(req.file.path, req.file.originalname);
        extractedText = ocrResult.raw_text || null;
      }
    }

    // If farm_id was not explicitly passed, find the user's primary farm
    if (!farmId) {
      const primaryFarm = await prisma.farms.findFirst({
        where: { user_id: userId }
      });
      if (primaryFarm) farmId = primaryFarm.id;
    }

    if (!farmId) {
      res.status(400).json({ error: 'farm_id is required' });
      return;
    }

    // Verify farm belongs to user
    const farm = await prisma.farms.findFirst({
      where: { id: farmId, user_id: userId }
    });

    if (!farm) {
      res.status(403).json({ error: 'Invalid farm_id or access denied' });
      return;
    }

    if (!fileName || !fileUrl) {
      res.status(400).json({ error: 'File upload or file_name & file_url are required' });
      return;
    }

    const doc = await prisma.documents.create({
      data: {
        farm_id: farmId,
        field_id: fieldId || null,
        crop_cycle_id: cropCycleId || null,
        document_type: documentType,
        file_name: fileName,
        file_url: fileUrl,
        extracted_text: extractedText
      }
    });

    res.status(201).json({
      id: doc.id,
      farm_id: doc.farm_id,
      field_id: doc.field_id || undefined,
      crop_cycle_id: doc.crop_cycle_id || undefined,
      document_type: doc.document_type || 'Invoice / Bill',
      file_name: doc.file_name,
      file_url: doc.file_url,
      extracted_text: doc.extracted_text || undefined,
      uploaded_at: doc.uploaded_at?.toISOString() || new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

export async function scanDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'Receipt or bill image file is required for scanning' });
      return;
    }

    const ocrData = await ocrService.extractFromImage(file.path, file.originalname);

    res.status(200).json({
      supplier: ocrData.supplier,
      date: ocrData.date,
      amount: ocrData.amount,
      items: ocrData.items,
      document_type: ocrData.document_type,
      raw_text: ocrData.raw_text,
      confidence: ocrData.confidence,
      file_url: storageService.getPublicUrl(file.filename)
    });
  } catch (error) {
    next(error);
  }
}
