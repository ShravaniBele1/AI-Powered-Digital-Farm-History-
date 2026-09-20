export interface OcrSampleBill {
  id: string;
  name: string;
  category: 'Fertilizer' | 'Seeds' | 'Pesticide' | 'Soil Test' | 'Harvest Sale' | 'Machinery';
  imageUrl: string;
  extractedText: string;
  suggestedActivity: {
    activityTypeName: string;
    description: string;
    productName: string;
    quantity: number;
    unit: string;
    cost: number;
    supplier: string;
    date: string;
    category: string;
  };
}

export const OCR_SAMPLE_BILLS: OcrSampleBill[] = [
  {
    id: 'sample-fert-1',
    name: 'IFFCO Urea & DAP Purchase Slip',
    category: 'Fertilizer',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    extractedText: `KRISHI AGRO SEVA KENDRA
GSTIN: 27AABCK1234F1Z8
Tax Invoice #KAS-2026-901
Date: 2026-02-15
Buyer: Rajesh Patil (Green Valley Farm)

Item 1: IFFCO Nano Urea 500ml (2 Bottles) @ ₹225 = ₹450.00
Item 2: DAP 18:46:00 50kg (1 Bag) @ ₹1,350 = ₹1,350.00
Total Amount: ₹1,800.00 (Paid by UPI)
Batch: U-8812, Exp: 2028`,
    suggestedActivity: {
      activityTypeName: 'Fertilization',
      description: 'Nano Urea & DAP fertilizer application for active crop stage',
      productName: 'IFFCO Nano Urea + DAP 18:46:00',
      quantity: 51.0,
      unit: 'kg/litres',
      cost: 1800.0,
      supplier: 'Krishi Agro Seva Kendra',
      date: '2026-02-15',
      category: 'Fertilizer'
    }
  },
  {
    id: 'sample-pest-1',
    name: 'Bayer CropScience Insecticide Bill',
    category: 'Pesticide',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    extractedText: `MAHARASHTRA AGRO CHEMICALS
Cash Memo #MAC-4412
Date: 2026-01-20
Customer: Rajesh Patil

Item: Bayer Confidor Super (Imidacloprid) 1 Litre
Unit Price: ₹1,450.00
Tax: ₹0.00 (Agri Exempt)
Total: ₹1,450.00 (Cash)
Recommended Dose: 0.5ml / Litre water`,
    suggestedActivity: {
      activityTypeName: 'Pesticide Application',
      description: 'Bayer Confidor Super prophylactic spray against sucking pests',
      productName: 'Bayer Confidor Super 1L',
      quantity: 1.0,
      unit: 'litre',
      cost: 1450.0,
      supplier: 'Maharashtra Agro Chemicals',
      date: '2026-01-20',
      category: 'Pesticide'
    }
  },
  {
    id: 'sample-seed-1',
    name: 'Hybrid Cotton Seed Packet & Bill',
    category: 'Seeds',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    extractedText: `KOLHAPUR BEEJ NIGAM
Retail Receipt #KBN-771
Date: 2026-03-01
Farmer: Rajesh Patil

Item: Rasi Seeds BG-II Hybrid Cotton 450g (4 Packets)
Rate: ₹864.00 / Packet
Total: ₹3,456.00 (UPI)
Certified Seed Lot #RS-2026-C09`,
    suggestedActivity: {
      activityTypeName: 'Sowing',
      description: 'Rasi Seeds BG-II Hybrid cotton sowing',
      productName: 'Rasi BG-II Hybrid Cotton Seeds',
      quantity: 1.8,
      unit: 'kg',
      cost: 3456.0,
      supplier: 'Kolhapur Beej Nigam',
      date: '2026-03-01',
      category: 'Seeds'
    }
  }
];
