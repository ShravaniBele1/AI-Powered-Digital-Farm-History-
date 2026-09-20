import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().max(20).optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const createFarmSchema = z.object({
  farm_name: z.string().min(1, 'Farm name is required').max(150),
  village: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  total_area_acres: z.number().positive().optional()
});

export const updateFarmSchema = createFarmSchema.partial();

export const createFieldSchema = z.object({
  farm_id: z.string().uuid('Valid farm_id is required'),
  field_name: z.string().min(1, 'Field name is required').max(100),
  area_acres: z.number().positive().optional(),
  soil_type: z.string().max(100).optional(),
  irrigation_type: z.string().max(100).optional(),
  notes: z.string().optional()
});

export const updateFieldSchema = createFieldSchema.partial();

export const createSeasonSchema = z.object({
  farm_id: z.string().uuid('Valid farm_id is required'),
  name: z.string().min(1, 'Season name is required').max(50),
  year: z.number().int().min(2000).max(2100),
  start_date: z.string().optional(),
  end_date: z.string().optional()
});

export const createCropCycleSchema = z.object({
  field_id: z.string().uuid('Valid field_id is required'),
  crop_id: z.string().uuid('Valid crop_id is required'),
  season_id: z.string().uuid('Valid season_id is required'),
  variety: z.string().max(100).optional(),
  sowing_date: z.string().optional(),
  expected_harvest_date: z.string().optional(),
  actual_harvest_date: z.string().optional(),
  status: z.enum(['Planned', 'Active', 'Harvesting', 'Completed', 'Failed']).optional().default('Active'),
  notes: z.string().optional()
});

export const updateCropCycleSchema = createCropCycleSchema.partial();

export const createActivityInputSchema = z.object({
  input_type: z.string().default('General'),
  product_name: z.string().min(1, 'Product name is required'),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  cost: z.number().optional(),
  supplier: z.string().optional(),
  notes: z.string().optional()
});

export const createActivitySchema = z.object({
  crop_cycle_id: z.string().uuid('Valid crop_cycle_id is required'),
  activity_type_id: z.string().uuid('Valid activity_type_id is required'),
  activity_date: z.string().min(1, 'activity_date is required'),
  description: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  cost: z.number().optional(),
  notes: z.string().optional(),
  // Optional linked records to create in the same transaction:
  inputData: createActivityInputSchema.optional(),
  expenseAmount: z.number().positive().optional()
});

export const createInputSchema = z.object({
  activity_id: z.string().uuid('Valid activity_id is required'),
  input_type: z.string().min(1, 'input_type is required').max(100),
  product_name: z.string().min(1, 'product_name is required').max(150),
  quantity: z.number().optional(),
  unit: z.string().max(30).optional(),
  cost: z.number().optional(),
  supplier: z.string().max(150).optional(),
  notes: z.string().optional()
});

export const createExpenseSchema = z.object({
  crop_cycle_id: z.string().uuid('Valid crop_cycle_id is required'),
  expense_date: z.string().min(1, 'expense_date is required'),
  category: z.string().min(1, 'category is required').max(100),
  description: z.string().optional(),
  amount: z.number().positive('amount must be positive'),
  payment_method: z.string().max(50).optional(),
  notes: z.string().optional()
});

export const createHarvestSchema = z.object({
  crop_cycle_id: z.string().uuid('Valid crop_cycle_id is required'),
  harvest_date: z.string().min(1, 'harvest_date is required'),
  quantity: z.number().positive().optional(),
  unit: z.string().max(30).optional(),
  quality_grade: z.string().max(50).optional(),
  selling_price: z.number().positive().optional(),
  total_revenue: z.number().positive().optional(),
  buyer: z.string().max(150).optional(),
  notes: z.string().optional()
});

export const createDocumentSchema = z.object({
  farm_id: z.string().uuid('Valid farm_id is required'),
  field_id: z.string().uuid().optional(),
  crop_cycle_id: z.string().uuid().optional(),
  document_type: z.string().max(100).optional(),
  file_name: z.string().min(1, 'file_name is required').max(255),
  file_url: z.string().min(1, 'file_url is required'),
  extracted_text: z.string().optional()
});

export const aiQuerySchema = z.object({
  question: z.string().min(1, 'Question cannot be empty')
});
