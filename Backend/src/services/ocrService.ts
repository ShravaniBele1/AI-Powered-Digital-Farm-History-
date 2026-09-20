export interface OcrExtractedData {
  supplier: string;
  date: string;
  amount: number;
  items: string[];
  document_type?: string;
  raw_text?: string;
  confidence?: number;
}

/**
 * Modular OCR Service
 * Currently provides an intelligent heuristic/stub extractor that can be easily replaced
 * with a real vision model (e.g. Google Cloud Vision, Tesseract, Azure OCR, or Gemini Vision).
 */
export class OcrService {
  public async extractFromImage(filePath: string, originalFileName?: string): Promise<OcrExtractedData> {
    const filenameLower = (originalFileName || filePath).toLowerCase();

    // Contextual extraction heuristics based on file indicators
    if (filenameLower.includes('fertilizer') || filenameLower.includes('npk') || filenameLower.includes('iffco')) {
      return {
        supplier: 'IFFCO Agro Center / Kisan Seva Kendra',
        date: new Date().toISOString().split('T')[0],
        amount: 3500,
        items: ['NPK 10:26:26 (2 Bags)', 'Zinc Sulphate (5 kg)'],
        document_type: 'Invoice / Bill',
        raw_text: 'IFFCO Agro Center Cash Memo\nItem: NPK 10:26:26 Qty: 2 Bags Total: Rs. 3500\nPayment Mode: UPI\nDate: ' + new Date().toISOString().split('T')[0],
        confidence: 0.96
      };
    }

    if (filenameLower.includes('pesticide') || filenameLower.includes('spray') || filenameLower.includes('syngenta')) {
      return {
        supplier: 'Kisan Krishi Seva Kendra',
        date: new Date().toISOString().split('T')[0],
        amount: 2200,
        items: ['Syngenta Amistar Top (1 L)', 'Confidor Insecticide (250 ml)'],
        document_type: 'Invoice / Bill',
        raw_text: 'Tax Invoice: Syngenta Amistar Top + Confidor\nQty: 5L Solution Total Amount: INR 2200.00\nPaid in Cash',
        confidence: 0.94
      };
    }

    if (filenameLower.includes('seed') || filenameLower.includes('mahyco')) {
      return {
        supplier: 'Mahyco Seeds Distributor',
        date: new Date().toISOString().split('T')[0],
        amount: 2500,
        items: ['Certified Wheat Seeds HD-2967 (40 kg)'],
        document_type: 'Seed Tag',
        raw_text: 'Seed Certification & Cash Slip\nVariety: HD-2967 Lot No: IND-2025-998\nAmount: Rs 2500',
        confidence: 0.98
      };
    }

    if (filenameLower.includes('mandi') || filenameLower.includes('apmc') || filenameLower.includes('sale')) {
      return {
        supplier: 'APMC Grain Market Yard',
        date: new Date().toISOString().split('T')[0],
        amount: 105000,
        items: ['Wheat Grain (4200 kg @ Rs 25/kg)'],
        document_type: 'Mandi Sale Slip',
        raw_text: 'APMC Grain Market Sale Receipt / Anudan Patra\nCrop: Sharbati Wheat Grade A\nNet Weight: 42 Quintals (4200 kg)\nRate: 2500/Qtl\nTotal Payable: Rs. 1,05,000/-',
        confidence: 0.99
      };
    }

    // Default general bill stub
    return {
      supplier: 'Local Agro Chemical & Supply Store',
      date: new Date().toISOString().split('T')[0],
      amount: 1500,
      items: ['Farm Agricultural Supplies & Inputs'],
      document_type: 'Invoice / Bill',
      raw_text: `Invoice Receipt\nSupplier: Local Agro Chemical & Supply Store\nDate: ${new Date().toISOString().split('T')[0]}\nTotal: Rs. 1500.00`,
      confidence: 0.91
    };
  }
}

export const ocrService = new OcrService();
export default ocrService;
