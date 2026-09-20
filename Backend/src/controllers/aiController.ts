import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { aiQuerySchema } from '../validators/schemas';
import { processFarmerAiQuery } from '../services/aiService';

export async function askAiCopilot(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;
    const { question } = aiQuerySchema.parse(req.body);

    const result = await processFarmerAiQuery(userId, question);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAiHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.id;

    const queries = await prisma.ai_queries.findMany({
      where: { user_id: userId },
      include: {
        ai_evidence: {
          include: {
            activities: true,
            documents: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    const formatted = queries.map(q => ({
      id: q.id,
      user_id: q.user_id,
      question: q.question,
      answer: q.answer || '',
      evidence_list: q.ai_evidence.map(e => ({
        id: e.id,
        ai_query_id: e.ai_query_id,
        activity_id: e.activity_id || undefined,
        document_id: e.document_id || undefined,
        relevance_score: e.relevance_score ? Number(e.relevance_score) : 0.9,
        evidence_title: e.activities ? `Activity: ${e.activities.description}` : (e.documents ? `Document: ${e.documents.file_name}` : 'Farm Record'),
        evidence_snippet: e.activities?.description || e.documents?.extracted_text || '',
        evidence_type: e.activities ? 'activity' : 'document'
      })),
      created_at: q.created_at?.toISOString() || new Date().toISOString()
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
}
