export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Farm {
  id: string;
  user_id: string;
  farm_name: string;
  village: string;
  district: string;
  state: string;
  total_area_acres: number;
  created_at: string;
}

export interface Field {
  id: string;
  farm_id: string;
  field_name: string;
  area_acres: number;
  soil_type: string;
  irrigation_type: string;
  notes?: string;
  color_code?: string;
  coordinates?: string;
  created_at: string;
}

export interface Crop {
  id: string;
  name: string;
  category: 'Cereal' | 'Cash Crop' | 'Oilseed' | 'Pulse' | 'Vegetable' | 'Horticulture' | string;
  created_at: string;
}

export interface Season {
  id: string;
  farm_id: string;
  name: string; // e.g. "Rabi", "Kharif", "Summer"
  year: number; // e.g. 2025
  start_date: string;
  end_date: string;
}

export interface CropCycle {
  id: string;
  field_id: string;
  crop_id: string;
  season_id: string;
  variety: string;
  sowing_date: string;
  expected_harvest_date: string;
  actual_harvest_date?: string;
  status: 'Planned' | 'Active' | 'Harvesting' | 'Completed' | 'Failed';
  notes?: string;
  created_at: string;
  
  // Joined virtual fields for easy UI rendering
  fieldName?: string;
  cropName?: string;
  seasonName?: string;
  seasonYear?: number;
  area_acres?: number;
}

export interface ActivityType {
  id: string;
  name: string; // e.g. "Ploughing", "Sowing", "Irrigation", "Fertilization", "Pesticide Application", "Weeding", "Harvesting", "Pruning", "Soil Testing"
  category: string; // "Land Preparation", "Planting", "Water Management", "Nutrient Management", "Crop Protection", "Crop Maintenance", "Harvest"
}

export interface InputItem {
  id: string;
  activity_id: string;
  input_type: 'Seed' | 'Fertilizer' | 'Pesticide' | 'Bio-stimulant' | 'Organic Manure' | 'Equipment' | string;
  product_name: string;
  quantity?: number;
  unit?: string;
  cost?: number;
  supplier?: string;
  notes?: string;
}

export interface Activity {
  id: string;
  crop_cycle_id: string;
  activity_type_id: string;
  activity_date: string;
  description: string;
  quantity?: number;
  unit?: string;
  cost?: number;
  notes?: string;
  created_at: string;
  
  // Relations
  activityType?: ActivityType;
  inputs?: InputItem[];
  cropCycle?: CropCycle;
  document_ids?: string[];
}

export interface Expense {
  id: string;
  crop_cycle_id: string;
  expense_date: string;
  category: 'Machinery' | 'Seeds' | 'Fertilizer' | 'Pesticide' | 'Labour' | 'Harvesting' | 'Irrigation' | 'Transport' | 'Other';
  description: string;
  amount: number;
  payment_method: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit / Cheque' | string;
  notes?: string;
  created_at: string;
  activity_id?: string;
  cropCycle?: CropCycle;
}

export interface Harvest {
  id: string;
  crop_cycle_id: string;
  harvest_date: string;
  quantity: number;
  unit: string;
  quality_grade: string; // "A", "B", "Premium", "Standard"
  selling_price: number; // per unit
  total_revenue: number;
  buyer: string;
  notes?: string;
  created_at: string;
  cropCycle?: CropCycle;
}

export interface FarmDocument {
  id: string;
  farm_id: string;
  field_id?: string;
  crop_cycle_id?: string;
  activity_id?: string;
  document_type: 'Invoice / Bill' | 'Soil Test Report' | 'Mandi Sale Slip' | 'Field Photo' | 'Certification' | 'Seed Tag';
  file_name: string;
  file_url: string;
  extracted_text?: string;
  uploaded_at: string;
  tags?: string[];
  meta?: {
    vendor?: string;
    amount?: number;
    items?: string[];
    date?: string;
  };
}

export interface AiEvidence {
  id: string;
  ai_query_id: string;
  activity_id?: string;
  document_id?: string;
  expense_id?: string;
  harvest_id?: string;
  relevance_score: number; // 0.00 to 1.00
  evidence_title: string;
  evidence_snippet: string;
  evidence_type: 'activity' | 'document' | 'expense' | 'harvest' | 'field';
  date?: string;
}

export interface AiQuery {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  summary_metrics?: {
    total_cost?: number;
    total_revenue?: number;
    net_profit?: number;
    quantity?: string;
    key_dates?: string[];
  };
  evidence_list: AiEvidence[];
  created_at: string;
}

export type TimelineFilter = {
  fieldId: string; // 'all' or field uuid
  cropId: string; // 'all' or crop uuid
  seasonId: string; // 'all' or season uuid
  activityTypeId: string; // 'all' or type uuid
  searchQuery: string;
  startDate?: string;
  endDate?: string;
};
