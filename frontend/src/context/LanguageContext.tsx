import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    app_title: 'KrishiGatha AI',
    app_tagline: 'AI-Powered Digital Farm History & Intelligence Platform',
    dashboard: 'Farm Dashboard',
    timeline: 'Farm History Timeline',
    ai_copilot: 'AI Farm Assistant',
    vault: 'Document Vault & OCR',
    analytics: 'Financials & Yield',
    passport: 'Farm Passport',
    add_activity: 'Log Activity',
    scan_bill: 'Scan Bill / OCR',
    ask_ai: 'Ask Farm AI',
    total_area: 'Total Farm Area',
    active_crops: 'Active Crops',
    total_revenue: 'Total Revenue',
    total_expenses: 'Total Expenses',
    net_profit: 'Net Farm Profit',
    recent_activities: 'Recent Farm Activities',
    view_all: 'View All',
    filter_by_field: 'Filter by Field',
    filter_by_crop: 'Filter by Crop',
    filter_by_season: 'Filter by Season',
    filter_by_type: 'Activity Type',
    all_fields: 'All Fields',
    all_crops: 'All Crops',
    all_seasons: 'All Seasons',
    all_activities: 'All Types',
    search_records: 'Search timeline by keywords...',
    evidence_traceability: 'Evidence Traceability',
    evidence_score: 'Confidence Match',
    view_source_doc: 'View Source Bill',
    source_record: 'Source Record',
    export_csv: 'Export CSV',
    print_passport: 'Print Official Farm Passport',
    acres: 'Acres',
    crop_cycle: 'Crop Cycle',
    harvest_record: 'Harvest Record',
    notes: 'Notes',
    quantity: 'Quantity',
    cost: 'Cost',
    date: 'Date',
    category: 'Category',
  },
  hi: {
    app_title: 'कृषिगाथा AI',
    app_tagline: 'एआई-संचालित डिजिटल फार्म इतिहास और विश्लेषण मंच',
    dashboard: 'फार्म डैशबोर्ड',
    timeline: 'खेत का इतिहास टाइमलाइन',
    ai_copilot: 'एआई फार्म सहायक',
    vault: 'दस्तावेज़ और बिल स्कैनर',
    analytics: 'लागत एवं उपज विश्लेषण',
    passport: 'डिजिटल फार्म पासपोर्ट',
    add_activity: 'गतिविधि दर्ज करें',
    scan_bill: 'बिल स्कैन करें',
    ask_ai: 'एआई से पूछें',
    total_area: 'कुल खेत क्षेत्रफल',
    active_crops: 'सक्रिय फसलें',
    total_revenue: 'कुल आय (राजस्व)',
    total_expenses: 'कुल खर्च',
    net_profit: 'शुद्ध मुनाफा',
    recent_activities: 'हालिया गतिविधियां',
    view_all: 'सभी देखें',
    filter_by_field: 'खेत चुनें',
    filter_by_crop: 'फसल चुनें',
    filter_by_season: 'मौसम चुनें',
    filter_by_type: 'गतिविधि प्रकार',
    all_fields: 'सभी खेत',
    all_crops: 'सभी फसलें',
    all_seasons: 'सभी मौसम',
    all_activities: 'सभी गतिविधियां',
    search_records: 'इतिहास खोजें...',
    evidence_traceability: 'प्रमाण एवं साक्ष्य',
    evidence_score: 'सटीकता स्कोर',
    view_source_doc: 'मूल बिल देखें',
    source_record: 'स्रोत रिकॉर्ड',
    export_csv: 'सीएसवी निर्यात',
    print_passport: 'फार्म पासपोर्ट प्रिंट करें',
    acres: 'एकड़',
    crop_cycle: 'फसल चक्र',
    harvest_record: 'कटाई रिकॉर्ड',
    notes: 'टिप्पणी',
    quantity: 'मात्रा',
    cost: 'लागत',
    date: 'दिनांक',
    category: 'श्रेणी',
  },
  mr: {
    app_title: 'कृषिगाथा AI',
    app_tagline: 'एआय-सक्षम डिजिटल शेती इतिहास व बुद्धिमत्ता प्रणाली',
    dashboard: 'शेत डॅशबोर्ड',
    timeline: 'शेतीचा इतिहास टाइमलाइन',
    ai_copilot: 'एआय शेती सल्लागार',
    vault: 'दस्तऐवज व बिल स्कॅनर',
    analytics: 'खर्च व उत्पन्न विश्लेषण',
    passport: 'फार्म पासपोर्ट',
    add_activity: 'कामाची नोंद करा',
    scan_bill: 'पावती स्कॅन करा',
    ask_ai: 'एआय ला विचारा',
    total_area: 'एकूण शेत जमीन',
    active_crops: 'सक्रिय पिके',
    total_revenue: 'एकूण उत्पन्न',
    total_expenses: 'एकूण खर्च',
    net_profit: 'निव्वळ नफा',
    recent_activities: 'अलीकडील कामे',
    view_all: 'सर्व पहा',
    filter_by_field: 'शेत निवडा',
    filter_by_crop: 'पीक निवडा',
    filter_by_season: 'हंगाम निवडा',
    filter_by_type: 'कामाचा प्रकार',
    all_fields: 'सर्व शेते',
    all_crops: 'सर्व पिके',
    all_seasons: 'सर्व हंगाम',
    all_activities: 'सर्व कामे',
    search_records: 'नोंदी शोधा...',
    evidence_traceability: 'पुरावा आणि मूळ दस्तऐवज',
    evidence_score: 'तंतोतंत जुळणी',
    view_source_doc: 'मूळ पावती पहा',
    source_record: 'मूळ नोंद',
    export_csv: 'सीएसव्ही डाउनलोड',
    print_passport: 'शेती प्रमाणपत्र प्रिंट करा',
    acres: 'एकर',
    crop_cycle: 'पीक फेरपालट',
    harvest_record: 'उत्पादन नोंद',
    notes: 'नोंद',
    quantity: 'प्रमाण',
    cost: 'खर्च',
    date: 'तारीख',
    category: 'प्रकार',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('farm_lang') as LanguageCode;
    return (saved === 'en' || saved === 'hi' || saved === 'mr') ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('farm_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
