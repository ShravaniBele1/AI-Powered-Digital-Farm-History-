import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  BotMessageSquare,
  FileSpreadsheet,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';

export type NavTab = 'dashboard' | 'timeline' | 'ai_copilot' | 'vault' | 'analytics' | 'passport';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { activities, documents, aiQueries } = useFarm();

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string | number; glow?: boolean }[] = [
    {
      id: 'dashboard',
      label: t('dashboard'),
      icon: <LayoutDashboard className="h-4 w-4" />
    },
    {
      id: 'timeline',
      label: t('timeline'),
      icon: <CalendarDays className="h-4 w-4" />,
      badge: activities.length
    },
    {
      id: 'ai_copilot',
      label: t('ai_copilot'),
      icon: <BotMessageSquare className="h-4 w-4" />,
      badge: 'Grounded AI',
      glow: true
    },
    {
      id: 'vault',
      label: t('vault'),
      icon: <FileSpreadsheet className="h-4 w-4" />,
      badge: documents.length
    },
    {
      id: 'analytics',
      label: t('analytics'),
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'passport',
      label: t('passport'),
      icon: <Award className="h-4 w-4" />,
      badge: 'Verified'
    }
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 lg:min-h-[calc(100vh-61px)] bg-slate-950/60 border-r border-slate-800/80 p-3 lg:p-4 flex flex-row lg:flex-col justify-between overflow-x-auto lg:overflow-x-visible">
      {/* Navigation List */}
      <div className="flex flex-row lg:flex-col gap-1 w-full">
        <div className="hidden lg:block text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-2">
          Farm Modules
        </div>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group whitespace-nowrap ${
                isActive
                  ? item.glow
                    ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                    : 'bg-slate-800/90 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-400 group-hover:text-emerald-400 group-hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-500/30 text-emerald-200'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
