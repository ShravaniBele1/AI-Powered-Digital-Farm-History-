import {
  User,
  Farm,
  Field,
  Crop,
  Season,
  CropCycle,
  ActivityType,
  Activity,
  InputItem,
  Expense,
  Harvest,
  FarmDocument,
  AiQuery
} from '../types/farm';

export const SEED_USER: User = {
  id: '7721bdac-c50f-4e11-8e98-436f6ab2488e',
  name: 'Rajesh Patil (Test Farmer)',
  email: 'farmer@test.com',
  phone: '+91 98765 43210',
  created_at: '2026-09-20T12:38:32Z',
};

export const SEED_FARM: Farm = {
  id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
  user_id: '7721bdac-c50f-4e11-8e98-436f6ab2488e',
  farm_name: 'Green Valley Organic Farm',
  village: 'Ichalkaranji',
  district: 'Kolhapur',
  state: 'Maharashtra',
  total_area_acres: 10.50,
  created_at: '2026-09-20T12:39:21Z',
};

export const SEED_FIELDS: Field[] = [
  {
    id: '66214d15-3c87-4831-9f1e-c50840e03521',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_name: 'Field A (North Plot)',
    area_acres: 4.00,
    soil_type: 'Medium Black Soil (Kali Mitti)',
    irrigation_type: 'Drip Irrigation & Borewell',
    color_code: '#10b981',
    notes: 'Main fertile field with automated drip emitters and soil moisture sensors.',
    created_at: '2026-09-20T12:40:24Z',
  },
  {
    id: 'ea1c5125-7b45-445a-9301-87cdde24938c',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_name: 'Field B (Canal Plot)',
    area_acres: 3.50,
    soil_type: 'Deep Black Alluvial Soil',
    irrigation_type: 'Canal Sub-Surface & Flood',
    color_code: '#3b82f6',
    notes: 'Direct canal feeder connectivity; ideal for soybean and paddy rotation.',
    created_at: '2026-09-20T12:41:04Z',
  },
  {
    id: 'f189c4a2-1142-49aa-a182-901bc09320e8',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_name: 'Field C (Well Plot)',
    area_acres: 3.00,
    soil_type: 'Red Loamy Soil (Tambadi Mitti)',
    irrigation_type: 'Micro-Sprinkler & Open Well',
    color_code: '#f59e0b',
    notes: 'Perennial sugarcane and intercropped pulses.',
    created_at: '2026-09-20T12:41:30Z',
  }
];

export const SEED_CROPS: Crop[] = [
  { id: '1c746d9c-1b13-47a4-895c-dccfb46c805c', name: 'Wheat', category: 'Cereal', created_at: '2026-09-20T12:35:03Z' },
  { id: '5360b47e-3849-4777-9a99-5eaaf0d33071', name: 'Rice (Paddy)', category: 'Cereal', created_at: '2026-09-20T12:35:03Z' },
  { id: 'e2992d02-43b9-4a87-9dff-b8f7bb2de522', name: 'Sugarcane', category: 'Cash Crop', created_at: '2026-09-20T12:35:03Z' },
  { id: 'ab88bb2f-a6d3-452f-89eb-161a4bc82be1', name: 'Soybean', category: 'Oilseed', created_at: '2026-09-20T12:35:03Z' },
  { id: '188712ea-19f8-4507-bb84-eee8424457f3', name: 'Cotton', category: 'Cash Crop', created_at: '2026-09-20T12:35:03Z' },
];

export const SEED_SEASONS: Season[] = [
  {
    id: '724bbc53-d19f-4e21-9220-33e7039f087f',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    name: 'Rabi 2025-26',
    year: 2025,
    start_date: '2025-11-01',
    end_date: '2026-03-31',
  },
  {
    id: 'c8192a54-7629-4d22-b519-58bc4498aa21',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    name: 'Kharif 2025',
    year: 2025,
    start_date: '2025-06-15',
    end_date: '2025-10-31',
  },
  {
    id: 'a9018e32-9012-4211-87ab-189cb78100ef',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    name: 'Rabi 2024-25',
    year: 2024,
    start_date: '2024-11-01',
    end_date: '2025-03-30',
  }
];

export const SEED_ACTIVITY_TYPES: ActivityType[] = [
  { id: 'c61e763f-a52f-4a9b-aee9-793676df8b46', name: 'Ploughing', category: 'Land Preparation' },
  { id: 'b452900c-9b57-4f96-ad59-d7e94e353fd9', name: 'Sowing', category: 'Planting' },
  { id: 'e27b4c70-69cd-4499-8978-e3d6b90a3824', name: 'Irrigation', category: 'Water Management' },
  { id: '47e05813-7a93-4ded-a09b-96b75b25063e', name: 'Fertilization', category: 'Nutrient Management' },
  { id: '499e5ed4-25d6-4d22-8004-8a86c50f8640', name: 'Pesticide Application', category: 'Crop Protection' },
  { id: '90c85719-1e1b-48f3-9e93-5c9f63552a44', name: 'Weeding', category: 'Crop Maintenance' },
  { id: 'e87f356d-3f75-4d21-81b9-7f9d1e8d4f74', name: 'Harvesting', category: 'Harvest' },
  { id: '3109db81-44bb-4277-9a01-8b0129cd45a0', name: 'Soil Testing', category: 'Land Preparation' },
];

export const SEED_CROP_CYCLES: CropCycle[] = [
  {
    id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    field_id: '66214d15-3c87-4831-9f1e-c50840e03521',
    crop_id: '1c746d9c-1b13-47a4-895c-dccfb46c805c',
    season_id: '724bbc53-d19f-4e21-9220-33e7039f087f',
    variety: 'HD 2967 (Sharbati)',
    sowing_date: '2025-11-15',
    expected_harvest_date: '2026-03-20',
    actual_harvest_date: '2026-03-20',
    status: 'Completed',
    notes: 'High-yielding certified seed lot with balanced NPK and bio-fertilizer protocol.',
    created_at: '2026-09-20T12:43:12Z',
    fieldName: 'Field A (North Plot)',
    cropName: 'Wheat',
    seasonName: 'Rabi 2025-26',
    seasonYear: 2025,
    area_acres: 4.0,
  },
  {
    id: '5566aa11-8884-4c5c-8e0b-112233445566',
    field_id: 'ea1c5125-7b45-445a-9301-87cdde24938c',
    crop_id: 'ab88bb2f-a6d3-452f-89eb-161a4bc82be1',
    season_id: 'c8192a54-7629-4d22-b519-58bc4498aa21',
    variety: 'JS 335 (Early Maturing)',
    sowing_date: '2025-06-20',
    expected_harvest_date: '2025-10-10',
    actual_harvest_date: '2025-10-12',
    status: 'Completed',
    notes: 'Kharif oilseed rotation crop. High pod density recorded.',
    created_at: '2025-06-18T10:15:00Z',
    fieldName: 'Field B (Canal Plot)',
    cropName: 'Soybean',
    seasonName: 'Kharif 2025',
    seasonYear: 2025,
    area_acres: 3.5,
  },
  {
    id: '7788bb22-9999-4a4a-bfbf-223344556677',
    field_id: 'f189c4a2-1142-49aa-a182-901bc09320e8',
    crop_id: 'e2992d02-43b9-4a87-9dff-b8f7bb2de522',
    season_id: '724bbc53-d19f-4e21-9220-33e7039f087f',
    variety: 'Co 86032 (Nira)',
    sowing_date: '2025-12-05',
    expected_harvest_date: '2026-11-30',
    status: 'Active',
    notes: 'Tissue-cultured sugarcane seedlings under micro-sprinkler irrigation.',
    created_at: '2025-12-01T09:30:00Z',
    fieldName: 'Field C (Well Plot)',
    cropName: 'Sugarcane',
    seasonName: 'Rabi 2025-26',
    seasonYear: 2025,
    area_acres: 3.0,
  }
];

export const SEED_ACTIVITIES: Activity[] = [
  // Field A - Wheat Cycle (Matches SQL Dump + Extras)
  {
    id: '34856007-1ee5-48d3-aee2-f5b909400f1c',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: 'c61e763f-a52f-4a9b-aee9-793676df8b46',
    activity_date: '2025-11-05',
    description: 'Field preparation and deep ploughing completed with tractor rotavator',
    quantity: 4.0,
    unit: 'acres',
    cost: 3000.00,
    notes: 'Initial land preparation for Rabi wheat. Soil tilth optimal.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: ['doc-001']
  },
  {
    id: 'bc4e4c2f-f8a2-44f8-bac7-fd2e299c6274',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: 'b452900c-9b57-4f96-ad59-d7e94e353fd9',
    activity_date: '2025-11-15',
    description: 'Wheat seeds sown with automatic seed-cum-fertilizer drill machine',
    quantity: 50.00,
    unit: 'kg',
    cost: 2500.00,
    notes: 'HD 2967 certified variety sown at 4-5 cm depth with line spacing 20 cm.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: ['doc-002']
  },
  {
    id: 'bc23acc8-a2ff-40c1-8438-5b68e016177f',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: 'e27b4c70-69cd-4499-8978-e3d6b90a3824',
    activity_date: '2025-12-01',
    description: 'First Crown Root Initiation (CRI) stage drip irrigation completed',
    quantity: 2.00,
    unit: 'hours',
    cost: 450.00,
    notes: 'Critical irrigation stage executed via automated drip lines.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: []
  },
  {
    id: 'f634ef5a-35b0-412b-b6a0-93a0d0e26ed1',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: '47e05813-7a93-4ded-a09b-96b75b25063e',
    activity_date: '2025-12-10',
    description: 'NPK 10:26:26 and Urea top dressing applied to wheat crop',
    quantity: 100.00,
    unit: 'kg',
    cost: 3500.00,
    notes: 'Basal dose applied during active tillering stage. Purchased from Agro Fertilizer Store.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: ['doc-003']
  },
  {
    id: 'd8a400dd-3fb0-490b-bcad-b9e3ae9d9a52',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: '499e5ed4-25d6-4d22-8004-8a86c50f8640',
    activity_date: '2026-01-05',
    description: 'Pesticide & Fungicide foliar spray for aphid and rust protection',
    quantity: 5.00,
    unit: 'litre',
    cost: 2200.00,
    notes: 'Crop protection preventive treatment sprayed using knapsack power sprayer.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: ['doc-004']
  },
  {
    id: '6d0ad2a6-e4eb-4707-b1fc-514f16ab6b90',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: '90c85719-1e1b-48f3-9e93-5c9f63552a44',
    activity_date: '2026-01-15',
    description: 'Manual inter-row weeding and soil aeration completed by farm crew',
    quantity: 3.00,
    unit: 'labour-days',
    cost: 1800.00,
    notes: 'Removed broad-leaf weeds and Bathua weed patches.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: []
  },
  {
    id: 'd34dfe58-84c4-4a83-93e7-9095cc416332',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_type_id: 'e87f356d-3f75-4d21-81b9-7f9d1e8d4f74',
    activity_date: '2026-03-20',
    description: 'Wheat combine harvesting and grain threshing completed successfully',
    quantity: 4.00,
    unit: 'acres',
    cost: 4000.00,
    notes: 'Yield: 4,200 kg (42 quintals). Golden lustrous grains with Grade A moisture.',
    created_at: '2026-09-20T12:43:12Z',
    document_ids: ['doc-005']
  },

  // Field B - Soybean Cycle (Kharif 2025)
  {
    id: '9901aa11-1ee5-48d3-aee2-f5b909400f1c',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    activity_type_id: 'b452900c-9b57-4f96-ad59-d7e94e353fd9',
    activity_date: '2025-06-20',
    description: 'Soybean JS-335 seeds treated with Rhizobium culture and sown',
    quantity: 75.00,
    unit: 'kg',
    cost: 3800.00,
    notes: 'Bio-inoculated seed sowing after pre-monsoon shower.',
    created_at: '2025-06-20T11:00:00Z',
    document_ids: ['doc-006']
  },
  {
    id: '9902aa22-1ee5-48d3-aee2-f5b909400f1c',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    activity_type_id: '47e05813-7a93-4ded-a09b-96b75b25063e',
    activity_date: '2025-07-15',
    description: 'Single Super Phosphate (SSP) & MOP fertilizer applied',
    quantity: 120.00,
    unit: 'kg',
    cost: 2900.00,
    notes: 'Nutrient application for pod development.',
    created_at: '2025-07-15T10:00:00Z',
    document_ids: []
  },
  {
    id: '9903aa33-1ee5-48d3-aee2-f5b909400f1c',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    activity_type_id: 'e87f356d-3f75-4d21-81b9-7f9d1e8d4f74',
    activity_date: '2025-10-12',
    description: 'Soybean threshing and bag packing completed',
    quantity: 3.50,
    unit: 'acres',
    cost: 3500.00,
    notes: 'Total harvest output 3,150 kg high oil content grade.',
    created_at: '2025-10-12T16:00:00Z',
    document_ids: ['doc-007']
  },

  // Field C - Sugarcane Active Cycle
  {
    id: '7701bb11-1ee5-48d3-aee2-f5b909400f1c',
    crop_cycle_id: '7788bb22-9999-4a4a-bfbf-223344556677',
    activity_type_id: 'b452900c-9b57-4f96-ad59-d7e94e353fd9',
    activity_date: '2025-12-05',
    description: 'Sugarcane two-eye bud setts planted in paired furrows',
    quantity: 25000.00,
    unit: 'setts',
    cost: 12000.00,
    notes: 'Nira Co 86032 variety setts treated with carbendazim.',
    created_at: '2025-12-05T14:00:00Z',
    document_ids: []
  },
  {
    id: '7702bb22-1ee5-48d3-aee2-f5b909400f1c',
    crop_cycle_id: '7788bb22-9999-4a4a-bfbf-223344556677',
    activity_type_id: 'e27b4c70-69cd-4499-8978-e3d6b90a3824',
    activity_date: '2026-02-10',
    description: 'Micro-sprinkler fertigation with 19:19:19 water-soluble grade',
    quantity: 50.00,
    unit: 'kg',
    cost: 2800.00,
    notes: 'Vegetative growth booster fertigation.',
    created_at: '2026-02-10T09:00:00Z',
    document_ids: []
  }
];

export const SEED_INPUTS: InputItem[] = [
  {
    id: '5c2aa783-d7e7-462e-bf8a-e68b5eeb0969',
    activity_id: 'bc4e4c2f-f8a2-44f8-bac7-fd2e299c6274',
    input_type: 'Seed',
    product_name: 'Wheat Certified Seeds HD 2967',
    quantity: 50.00,
    unit: 'kg',
    cost: 2500.00,
    supplier: 'Kolhapur Kisan Agro Seed Corp',
    notes: 'Certified lot #K-2025-W99, 98% germination guarantee.'
  },
  {
    id: '40c13c6e-91ce-43a4-9b86-1382ddc55d8e',
    activity_id: 'f634ef5a-35b0-412b-b6a0-93a0d0e26ed1',
    input_type: 'Fertilizer',
    product_name: 'IFFCO NPK 10:26:26 Complex',
    quantity: 100.00,
    unit: 'kg',
    cost: 3500.00,
    supplier: 'Agro Fertilizer Store Ichalkaranji',
    notes: 'Subsidized fertilizer bag with POS receipt.'
  },
  {
    id: 'b2f2bf59-0bff-44f9-b4d9-4ff861ec43f0',
    activity_id: 'd8a400dd-3fb0-490b-bcad-b9e3ae9d9a52',
    input_type: 'Pesticide',
    product_name: 'Syngenta Amistar Top + Confidor',
    quantity: 5.00,
    unit: 'litre',
    cost: 2200.00,
    supplier: 'Shree Agro Chemicals',
    notes: 'Broad-spectrum systemic insecticide & strobilurin fungicide.'
  },
  {
    id: 'in-soy-01',
    activity_id: '9901aa11-1ee5-48d3-aee2-f5b909400f1c',
    input_type: 'Seed',
    product_name: 'Mahabeej Soybean JS 335',
    quantity: 75.00,
    unit: 'kg',
    cost: 3800.00,
    supplier: 'Mahabeej Agro Kendra',
    notes: 'High vigor seed pack with Rhizobium packet.'
  }
];

export const SEED_EXPENSES: Expense[] = [
  {
    id: 'cf8b23af-e6c9-45f6-952a-95dedc8dc227',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    expense_date: '2025-11-05',
    category: 'Machinery',
    description: 'Tractor and ploughing rotavator hire',
    amount: 3000.00,
    payment_method: 'Cash',
    notes: 'Land preparation for Field A Wheat crop.',
    created_at: '2026-09-20T12:43:12Z',
    activity_id: '34856007-1ee5-48d3-aee2-f5b909400f1c'
  },
  {
    id: 'f36b6b1b-a0c7-4332-a64c-0bf9f49a5c16',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    expense_date: '2025-11-15',
    category: 'Seeds',
    description: 'Wheat HD 2967 certified seeds (50 kg)',
    amount: 2500.00,
    payment_method: 'UPI',
    notes: 'Paid to Kolhapur Kisan Seed Center.',
    created_at: '2026-09-20T12:43:12Z',
    activity_id: 'bc4e4c2f-f8a2-44f8-bac7-fd2e299c6274'
  },
  {
    id: '8714465b-e6e9-43e8-9c0a-f56a10477737',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    expense_date: '2025-12-10',
    category: 'Fertilizer',
    description: 'IFFCO NPK 10:26:26 (2 bags x 50kg)',
    amount: 3500.00,
    payment_method: 'UPI',
    notes: 'Crop nutrition tillering stage.',
    created_at: '2026-09-20T12:43:12Z',
    activity_id: 'f634ef5a-35b0-412b-b6a0-93a0d0e26ed1'
  },
  {
    id: 'd4cc9283-f1da-419f-b106-d83a7dcdb3ea',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    expense_date: '2026-01-05',
    category: 'Pesticide',
    description: 'Syngenta Amistar Top + Confidor spray chemical',
    amount: 2200.00,
    payment_method: 'Cash',
    notes: 'Pesticide application for Field A.',
    created_at: '2026-09-20T12:43:12Z',
    activity_id: 'd8a400dd-3fb0-490b-bcad-b9e3ae9d9a52'
  },
  {
    id: 'f6d2345d-7fd2-4132-b1f7-16319d769114',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    expense_date: '2026-01-15',
    category: 'Labour',
    description: 'Manual weeding labour wages (3 farm hands)',
    amount: 1800.00,
    payment_method: 'Cash',
    notes: 'Manual weed removal in Field A.',
    created_at: '2026-09-20T12:43:12Z',
    activity_id: '6d0ad2a6-e4eb-4707-b1fc-514f16ab6b90'
  },
  {
    id: '93ba3f65-9c01-47fb-b3db-715b303e0795',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    expense_date: '2026-03-20',
    category: 'Harvesting',
    description: 'Combine harvester machine rental and thresher labor',
    amount: 4000.00,
    payment_method: 'UPI',
    notes: 'Wheat harvesting & bagging operations.',
    created_at: '2026-09-20T12:43:12Z',
    activity_id: 'd34dfe58-84c4-4a83-93e7-9095cc416332'
  },
  // Soybean expenses
  {
    id: 'exp-soy-01',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    expense_date: '2025-06-20',
    category: 'Seeds',
    description: 'Mahabeej Soybean seeds 75kg',
    amount: 3800.00,
    payment_method: 'UPI',
    notes: 'Purchased with receipt.',
    created_at: '2025-06-20T11:00:00Z',
    activity_id: '9901aa11-1ee5-48d3-aee2-f5b909400f1c'
  },
  {
    id: 'exp-soy-02',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    expense_date: '2025-07-15',
    category: 'Fertilizer',
    description: 'SSP & MOP Fertilizer bags',
    amount: 2900.00,
    payment_method: 'Cash',
    notes: 'Field B application.',
    created_at: '2025-07-15T10:00:00Z',
    activity_id: '9902aa22-1ee5-48d3-aee2-f5b909400f1c'
  },
  {
    id: 'exp-soy-03',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    expense_date: '2025-10-12',
    category: 'Harvesting',
    description: 'Soybean cutting and threshing crew',
    amount: 3500.00,
    payment_method: 'UPI',
    notes: 'Field B harvest operation.',
    created_at: '2025-10-12T16:00:00Z',
    activity_id: '9903aa33-1ee5-48d3-aee2-f5b909400f1c'
  }
];

export const SEED_HARVESTS: Harvest[] = [
  {
    id: '720ef77b-c672-4db2-8638-c6a1ed2ce858',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    harvest_date: '2026-03-20',
    quantity: 4200.00,
    unit: 'kg (42 Quintals)',
    quality_grade: 'Grade A Sharbati',
    selling_price: 25.00,
    total_revenue: 105000.00,
    buyer: 'Kolhapur APMC Grain Merchant Syndicate',
    notes: 'Sold at premium Mandi MSP rate (+ ₹2.25/kg bonus for high luster & low moisture < 10%).',
    created_at: '2026-09-20T12:43:12Z'
  },
  {
    id: 'harv-soy-01',
    crop_cycle_id: '5566aa11-8884-4c5c-8e0b-112233445566',
    harvest_date: '2025-10-14',
    quantity: 3150.00,
    unit: 'kg (31.5 Quintals)',
    quality_grade: 'Standard Oil Grade',
    selling_price: 46.50,
    total_revenue: 146475.00,
    buyer: 'Sangli Agro Processing Oil Mills',
    notes: 'Direct mill gate sale with instant bank transfer.',
    created_at: '2025-10-14T17:30:00Z'
  }
];

export const SEED_DOCUMENTS: FarmDocument[] = [
  {
    id: 'doc-001',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_id: '66214d15-3c87-4831-9f1e-c50840e03521',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    document_type: 'Soil Test Report',
    file_name: 'Soil_Health_Card_FieldA_2025.pdf',
    file_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    extracted_text: 'District Soil Testing Lab Kolhapur. Field A North Plot. Soil pH: 7.4 (Neutral/Slightly Alkaline), Organic Carbon: 0.68% (Medium), Available N: 240 kg/ha (Low), Available P2O5: 22 kg/ha (Medium), Available K2O: 380 kg/ha (High). Recommendation: Apply 100 kg NPK 10:26:26 and Zinc Sulphate foliar spray.',
    uploaded_at: '2025-10-28T09:00:00Z',
    tags: ['Soil Test', 'pH 7.4', 'NPK Advisory', 'Govt Certified'],
    meta: {
      vendor: 'Govt Soil Testing Lab, Kolhapur',
      date: '2025-10-28',
      items: ['pH 7.4', 'OC 0.68%', 'Available N 240 kg/ha', 'Available P 22 kg/ha']
    }
  },
  {
    id: 'doc-002',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_id: '66214d15-3c87-4831-9f1e-c50840e03521',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_id: 'bc4e4c2f-f8a2-44f8-bac7-fd2e299c6274',
    document_type: 'Invoice / Bill',
    file_name: 'Wheat_Seed_Invoice_K2025.jpg',
    file_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    extracted_text: 'TAX INVOICE #INV-4921. Kolhapur Kisan Agro Seed Corp. Buyer: Rajesh Patil. Item: Certified Wheat Seeds Variety HD-2967 (2 bags x 25kg = 50kg). Rate: ₹50.00/kg. Total Amount: ₹2,500.00. Payment: UPI Ref 3391028491. Certified seed germination 98%.',
    uploaded_at: '2025-11-15T10:30:00Z',
    tags: ['Seeds', 'HD-2967', 'Tax Invoice', 'UPI'],
    meta: {
      vendor: 'Kolhapur Kisan Agro Seed Corp',
      amount: 2500.00,
      date: '2025-11-15',
      items: ['Wheat Seeds HD 2967 50kg']
    }
  },
  {
    id: 'doc-003',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_id: '66214d15-3c87-4831-9f1e-c50840e03521',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_id: 'f634ef5a-35b0-412b-b6a0-93a0d0e26ed1',
    document_type: 'Invoice / Bill',
    file_name: 'Fertilizer_Bill_IFFCO_NPK.jpg',
    file_url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    extracted_text: 'RETAIL INVOICE. Agro Fertilizer Store Ichalkaranji. POS Transaction #DBT-881923. Customer: Rajesh Patil (Aadhaar Seeded). Product: IFFCO NPK 10:26:26 (2 Bags x 50kg = 100kg). Govt Subsidized Rate: ₹1,750/bag. Total: ₹3,500.00. Mode: UPI.',
    uploaded_at: '2025-12-10T11:45:00Z',
    tags: ['Fertilizer', 'NPK 10:26:26', 'IFFCO', 'POS Receipt'],
    meta: {
      vendor: 'Agro Fertilizer Store Ichalkaranji',
      amount: 3500.00,
      date: '2025-12-10',
      items: ['IFFCO NPK 10:26:26 (100 kg)']
    }
  },
  {
    id: 'doc-004',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_id: '66214d15-3c87-4831-9f1e-c50840e03521',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    activity_id: 'd8a400dd-3fb0-490b-bcad-b9e3ae9d9a52',
    document_type: 'Invoice / Bill',
    file_name: 'Pesticide_Syngenta_Amistar.jpg',
    file_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    extracted_text: 'BILL / CASH MEMO #4092. Shree Agro Chemicals. Item: Amistar Top 5L + Confidor 250ml. Batch #AG-9930. Amount: ₹2,200.00 Paid in Cash. Expiry 2027.',
    uploaded_at: '2026-01-05T15:00:00Z',
    tags: ['Pesticide', 'Crop Protection', 'Syngenta'],
    meta: {
      vendor: 'Shree Agro Chemicals',
      amount: 2200.00,
      date: '2026-01-05',
      items: ['Amistar Top 5L', 'Confidor 250ml']
    }
  },
  {
    id: 'doc-005',
    farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
    field_id: '66214d15-3c87-4831-9f1e-c50840e03521',
    crop_cycle_id: '8688db81-8884-4c5c-8e0b-0a32395fb219',
    document_type: 'Mandi Sale Slip',
    file_name: 'Wheat_Mandi_Sale_Voucher_APMC.pdf',
    file_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    extracted_text: 'AGRICULTURAL PRODUCE MARKET COMMITTEE (APMC) KOLHAPUR. Sale Voucher #APMC-W-88910. Commission Agent: Shri Ganesh Trading. Seller: Rajesh Patil. Commodity: Wheat Sharbati Grade A. Gross Weight: 4,200 kg (42 Quintals). Auction Rate: ₹2,500.00 / Quintal (₹25/kg). Total Amount: ₹1,05,000.00. Payment Status: Cleared to Bank A/c.',
    uploaded_at: '2026-03-21T09:30:00Z',
    tags: ['Mandi Slip', 'APMC Kolhapur', 'Harvest Sale', '₹1,05,000'],
    meta: {
      vendor: 'APMC Kolhapur Grain Merchant Syndicate',
      amount: 105000.00,
      date: '2026-03-20',
      items: ['Wheat Grain 4200 kg @ ₹25/kg']
    }
  }
];

export const SEED_AI_QUERIES: AiQuery[] = [
  {
    id: 'ai-q-1',
    user_id: '7721bdac-c50f-4e11-8e98-436f6ab2488e',
    question: 'How much did I spend on fertilizers for Field A in Rabi 2025-26?',
    answer: 'In Rabi 2025-26 on Field A (North Plot), you spent a total of ₹3,500.00 on fertilizer on December 10, 2025. You applied 100 kg of IFFCO NPK 10:26:26 during tillering stage, purchased from Agro Fertilizer Store Ichalkaranji with POS invoice DBT-881923.',
    summary_metrics: {
      total_cost: 3500.00,
      quantity: '100 kg NPK 10:26:26',
      key_dates: ['2025-12-10']
    },
    evidence_list: [
      {
        id: 'ev-1-1',
        ai_query_id: 'ai-q-1',
        activity_id: 'f634ef5a-35b0-412b-b6a0-93a0d0e26ed1',
        expense_id: '8714465b-e6e9-43e8-9c0a-f56a10477737',
        relevance_score: 0.99,
        evidence_title: 'Activity: Fertilization (NPK 10:26:26 applied)',
        evidence_snippet: 'Date: 2025-12-10 | Quantity: 100.00 kg | Expense: ₹3,500.00 (UPI) | Notes: Basal dose applied during active tillering stage.',
        evidence_type: 'activity',
        date: '2025-12-10'
      },
      {
        id: 'ev-1-2',
        ai_query_id: 'ai-q-1',
        document_id: 'doc-003',
        relevance_score: 0.96,
        evidence_title: 'Document: Fertilizer Bill IFFCO NPK',
        evidence_snippet: 'Agro Fertilizer Store Ichalkaranji | POS DBT-881923 | IFFCO NPK 10:26:26 (2 Bags x 50kg) = ₹3,500.00',
        evidence_type: 'document',
        date: '2025-12-10'
      }
    ],
    created_at: '2026-09-20T12:50:00Z'
  },
  {
    id: 'ai-q-2',
    user_id: '7721bdac-c50f-4e11-8e98-436f6ab2488e',
    question: 'What was our wheat yield, cost, and net profit for Field A?',
    answer: 'For your Rabi 2025-26 Wheat crop cycle on Field A (4.0 acres):\n• Total Yield: 4,200 kg (10.5 quintals/acre)\n• Total Harvest Revenue: ₹1,05,000.00 (@ ₹25/kg sold at Kolhapur APMC)\n• Total Operating Expenses: ₹17,000.00 (Machinery: ₹3,000, Seeds: ₹2,500, Fertilizer: ₹3,500, Pesticide: ₹2,200, Labour: ₹1,800, Harvesting: ₹4,000)\n• Net Profit: ₹88,000.00 (Net Margin: 83.8%, Profit/Acre: ₹22,000/acre)',
    summary_metrics: {
      total_cost: 17000.00,
      total_revenue: 105000.00,
      net_profit: 88000.00,
      quantity: '4,200 kg Wheat (42 Quintals)'
    },
    evidence_list: [
      {
        id: 'ev-2-1',
        ai_query_id: 'ai-q-2',
        harvest_id: '720ef77b-c672-4db2-8638-c6a1ed2ce858',
        relevance_score: 0.99,
        evidence_title: 'Harvest Record: Wheat 4,200 kg sold to APMC',
        evidence_snippet: 'Harvest Date: 2026-03-20 | Quantity: 4,200 kg | Revenue: ₹1,05,000.00 | Buyer: Kolhapur APMC',
        evidence_type: 'harvest',
        date: '2026-03-20'
      },
      {
        id: 'ev-2-2',
        ai_query_id: 'ai-q-2',
        document_id: 'doc-005',
        relevance_score: 0.98,
        evidence_title: 'Document: APMC Kolhapur Mandi Sale Voucher #88910',
        evidence_snippet: 'Official Mandi Sale Voucher: 42 quintals @ ₹2,500/quintal = ₹1,05,000.00 paid.',
        evidence_type: 'document',
        date: '2026-03-20'
      }
    ],
    created_at: '2026-09-20T12:55:00Z'
  }
];
