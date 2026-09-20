import React from 'react';
import {
  Sprout,
  Languages,
  RotateCcw
} from 'lucide-react';
import { useLanguage, LanguageCode } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { resetToDefaultData } = useFarm();

  const languageNames: Record<LanguageCode, string> = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    mr: 'मराठी (Marathi)'
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sprout className="h-5 w-5 text-emerald-400 animate-pulse-subtle" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              KrishiGatha <span className="text-emerald-400 text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">AI</span>
            </h1>
            <p className="text-[11px] text-slate-400">Digital Farm History & Intelligence</p>
          </div>
        </div>

        {/* Right Controls: Language Selector & Reset Data */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs">
              <Languages className="h-3.5 w-3.5 text-emerald-400" />
              <span className="uppercase font-semibold">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-xl shadow-black/50 py-1 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800">
                Select Language
              </div>
              {(Object.keys(languageNames) as LanguageCode[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors ${
                    language === lang ? 'text-emerald-400 font-semibold bg-emerald-500/5' : 'text-slate-300'
                  }`}
                >
                  <span>{languageNames[lang]}</span>
                  {language === lang && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all farm records to the verified sample database?')) {
                resetToDefaultData();
              }
            }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset to Original Seed Data"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
