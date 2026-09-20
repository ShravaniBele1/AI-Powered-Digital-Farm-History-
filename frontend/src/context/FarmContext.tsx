import React, { createContext, useContext, useState, useEffect } from 'react';
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
  AiQuery,
  TimelineFilter
} from '../types/farm';
import {
  SEED_USER,
  SEED_FARM,
  SEED_FIELDS,
  SEED_CROPS,
  SEED_SEASONS,
  SEED_ACTIVITY_TYPES,
  SEED_CROP_CYCLES,
  SEED_ACTIVITIES,
  SEED_INPUTS,
  SEED_EXPENSES,
  SEED_HARVESTS,
  SEED_DOCUMENTS,
  SEED_AI_QUERIES
} from '../data/seedData';
import { processFarmAiQuery } from '../services/aiEngine';

interface FarmContextType {
  user: User;
  farm: Farm;
  fields: Field[];
  crops: Crop[];
  seasons: Season[];
  cropCycles: CropCycle[];
  activityTypes: ActivityType[];
  activities: Activity[];
  inputs: InputItem[];
  expenses: Expense[];
  harvests: Harvest[];
  documents: FarmDocument[];
  aiQueries: AiQuery[];

  // Filter State
  filter: TimelineFilter;
  setFilter: React.Dispatch<React.SetStateAction<TimelineFilter>>;
  filteredActivities: Activity[];

  // CRUD Actions
  addActivity: (activity: Omit<Activity, 'id' | 'created_at'>, inputData?: Partial<InputItem>, expenseAmount?: number) => void;
  deleteActivity: (id: string) => void;
  addCropCycle: (cycle: Omit<CropCycle, 'id' | 'created_at'>) => void;
  addHarvest: (harvest: Omit<Harvest, 'id' | 'created_at'>) => void;
  addDocument: (doc: Omit<FarmDocument, 'id' | 'uploaded_at'>) => void;
  addExpense: (exp: Omit<Expense, 'id' | 'created_at'>) => void;
  askAiCopilot: (question: string) => Promise<AiQuery>;
  resetToDefaultData: () => void;

  // Active selection helpers
  selectedFieldId: string | 'all';
  setSelectedFieldId: (id: string | 'all') => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<User>(SEED_USER);
  const [farm] = useState<Farm>(SEED_FARM);

  const loadFromStorage = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(`krishi_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [fields, setFields] = useState<Field[]>(() => loadFromStorage('fields', SEED_FIELDS));
  const [crops] = useState<Crop[]>(() => loadFromStorage('crops', SEED_CROPS));
  const [seasons] = useState<Season[]>(() => loadFromStorage('seasons', SEED_SEASONS));
  const [cropCycles, setCropCycles] = useState<CropCycle[]>(() => loadFromStorage('cropCycles', SEED_CROP_CYCLES));
  const [activityTypes] = useState<ActivityType[]>(() => loadFromStorage('activityTypes', SEED_ACTIVITY_TYPES));
  const [activities, setActivities] = useState<Activity[]>(() => loadFromStorage('activities', SEED_ACTIVITIES));
  const [inputs, setInputs] = useState<InputItem[]>(() => loadFromStorage('inputs', SEED_INPUTS));
  const [expenses, setExpenses] = useState<Expense[]>(() => loadFromStorage('expenses', SEED_EXPENSES));
  const [harvests, setHarvests] = useState<Harvest[]>(() => loadFromStorage('harvests', SEED_HARVESTS));
  const [documents, setDocuments] = useState<FarmDocument[]>(() => loadFromStorage('documents', SEED_DOCUMENTS));
  const [aiQueries, setAiQueries] = useState<AiQuery[]>(() => loadFromStorage('aiQueries', SEED_AI_QUERIES));

  const [selectedFieldId, setSelectedFieldId] = useState<string | 'all'>('all');

  const [filter, setFilter] = useState<TimelineFilter>({
    fieldId: 'all',
    cropId: 'all',
    seasonId: 'all',
    activityTypeId: 'all',
    searchQuery: '',
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('krishi_fields', JSON.stringify(fields));
    localStorage.setItem('krishi_cropCycles', JSON.stringify(cropCycles));
    localStorage.setItem('krishi_activities', JSON.stringify(activities));
    localStorage.setItem('krishi_inputs', JSON.stringify(inputs));
    localStorage.setItem('krishi_expenses', JSON.stringify(expenses));
    localStorage.setItem('krishi_harvests', JSON.stringify(harvests));
    localStorage.setItem('krishi_documents', JSON.stringify(documents));
    localStorage.setItem('krishi_aiQueries', JSON.stringify(aiQueries));
  }, [fields, cropCycles, activities, inputs, expenses, harvests, documents, aiQueries]);

  // Enrich activities with joined metadata for easy rendering
  const enrichedActivities = activities.map(act => {
    const actType = activityTypes.find(t => t.id === act.activity_type_id);
    const cycle = cropCycles.find(c => c.id === act.crop_cycle_id);
    const relatedInputs = inputs.filter(i => i.activity_id === act.id);
    return {
      ...act,
      activityType: actType,
      cropCycle: cycle,
      inputs: relatedInputs,
    };
  });

  // Filter activities
  const filteredActivities = enrichedActivities.filter(act => {
    const cycle = act.cropCycle;
    if (filter.fieldId !== 'all' && cycle?.field_id !== filter.fieldId) return false;
    if (filter.cropId !== 'all' && cycle?.crop_id !== filter.cropId) return false;
    if (filter.seasonId !== 'all' && cycle?.season_id !== filter.seasonId) return false;
    if (filter.activityTypeId !== 'all' && act.activity_type_id !== filter.activityTypeId) return false;

    if (filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase();
      const matchDesc = act.description.toLowerCase().includes(q);
      const matchType = act.activityType?.name.toLowerCase().includes(q);
      const matchNotes = act.notes?.toLowerCase().includes(q);
      const matchCrop = cycle?.cropName?.toLowerCase().includes(q);
      const matchField = cycle?.fieldName?.toLowerCase().includes(q);
      const matchInput = act.inputs?.some(i => i.product_name.toLowerCase().includes(q));
      if (!matchDesc && !matchType && !matchNotes && !matchCrop && !matchField && !matchInput) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime());

  const addActivity = (
    activityData: Omit<Activity, 'id' | 'created_at'>,
    inputData?: Partial<InputItem>,
    expenseAmount?: number
  ) => {
    const newActId = 'act-' + Date.now();
    const newActivity: Activity = {
      ...activityData,
      id: newActId,
      created_at: new Date().toISOString(),
    };

    setActivities(prev => [newActivity, ...prev]);

    if (inputData && inputData.product_name) {
      const newInput: InputItem = {
        id: 'inp-' + Date.now(),
        activity_id: newActId,
        input_type: inputData.input_type || 'General',
        product_name: inputData.product_name,
        quantity: inputData.quantity || activityData.quantity,
        unit: inputData.unit || activityData.unit,
        cost: inputData.cost || activityData.cost,
        supplier: inputData.supplier || 'Local Supplier',
        notes: inputData.notes,
      };
      setInputs(prev => [newInput, ...prev]);
    }

    if (expenseAmount && expenseAmount > 0) {
      const actType = activityTypes.find(t => t.id === activityData.activity_type_id);
      let cat: Expense['category'] = 'Other';
      const name = actType?.name.toLowerCase() || '';
      if (name.includes('fertiliz')) cat = 'Fertilizer';
      else if (name.includes('pesticide')) cat = 'Pesticide';
      else if (name.includes('sow') || name.includes('seed')) cat = 'Seeds';
      else if (name.includes('plough') || name.includes('machin')) cat = 'Machinery';
      else if (name.includes('weed') || name.includes('labour')) cat = 'Labour';
      else if (name.includes('harvest')) cat = 'Harvesting';

      const newExpense: Expense = {
        id: 'exp-' + Date.now(),
        crop_cycle_id: activityData.crop_cycle_id,
        expense_date: activityData.activity_date,
        category: cat,
        description: activityData.description,
        amount: expenseAmount,
        payment_method: 'UPI',
        activity_id: newActId,
        notes: activityData.notes,
        created_at: new Date().toISOString(),
      };
      setExpenses(prev => [newExpense, ...prev]);
    }
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
    setInputs(prev => prev.filter(i => i.activity_id !== id));
    setExpenses(prev => prev.filter(e => e.activity_id !== id));
  };

  const addCropCycle = (cycleData: Omit<CropCycle, 'id' | 'created_at'>) => {
    const field = fields.find(f => f.id === cycleData.field_id);
    const crop = crops.find(c => c.id === cycleData.crop_id);
    const season = seasons.find(s => s.id === cycleData.season_id);

    const newCycle: CropCycle = {
      ...cycleData,
      id: 'cycle-' + Date.now(),
      created_at: new Date().toISOString(),
      fieldName: field?.field_name,
      cropName: crop?.name,
      seasonName: season?.name,
      seasonYear: season?.year,
      area_acres: field?.area_acres,
    };
    setCropCycles(prev => [newCycle, ...prev]);
  };

  const addHarvest = (harvestData: Omit<Harvest, 'id' | 'created_at'>) => {
    const newHarvest: Harvest = {
      ...harvestData,
      id: 'harv-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setHarvests(prev => [newHarvest, ...prev]);
  };

  const addDocument = (docData: Omit<FarmDocument, 'id' | 'uploaded_at'>) => {
    const newDoc: FarmDocument = {
      ...docData,
      id: 'doc-' + Date.now(),
      uploaded_at: new Date().toISOString(),
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const addExpense = (expData: Omit<Expense, 'id' | 'created_at'>) => {
    const newExp: Expense = {
      ...expData,
      id: 'exp-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setExpenses(prev => [newExp, ...prev]);
  };

  const askAiCopilot = async (question: string): Promise<AiQuery> => {
    const result = processFarmAiQuery(question, {
      activities: enrichedActivities,
      expenses,
      harvests,
      documents,
      cropCycles,
      fields,
    });

    const newQuery: AiQuery = {
      id: 'ai-q-' + Date.now(),
      user_id: user.id,
      question,
      answer: result.answer,
      summary_metrics: result.summaryMetrics,
      evidence_list: result.evidenceList,
      created_at: new Date().toISOString(),
    };

    setAiQueries(prev => [newQuery, ...prev]);
    return newQuery;
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setFields(SEED_FIELDS);
    setCropCycles(SEED_CROP_CYCLES);
    setActivities(SEED_ACTIVITIES);
    setInputs(SEED_INPUTS);
    setExpenses(SEED_EXPENSES);
    setHarvests(SEED_HARVESTS);
    setDocuments(SEED_DOCUMENTS);
    setAiQueries(SEED_AI_QUERIES);
  };

  return (
    <FarmContext.Provider
      value={{
        user,
        farm,
        fields,
        crops,
        seasons,
        cropCycles,
        activityTypes,
        activities: enrichedActivities,
        inputs,
        expenses,
        harvests,
        documents,
        aiQueries,
        filter,
        setFilter,
        filteredActivities,
        addActivity,
        deleteActivity,
        addCropCycle,
        addHarvest,
        addDocument,
        addExpense,
        askAiCopilot,
        resetToDefaultData,
        selectedFieldId,
        setSelectedFieldId,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
