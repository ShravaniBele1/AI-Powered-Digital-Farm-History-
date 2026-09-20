import React from 'react';
import {
  Sprout,
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  ScanLine,
  Plus,
  Wheat,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { FieldVisualizer } from './FieldVisualizer';
import { FarmDocument } from '../../types/farm';

interface DashboardOverviewProps {
  onNavigateTab: (tab: 'timeline' | 'ai_copilot' | 'vault' | 'analytics' | 'passport') => void;
  onOpenAddActivity: () => void;
  onOpenScanBill: () => void;
  onOpenPassport: () => void;
  onViewDocument: (doc: FarmDocument) => void;
  onAskAi: (prompt: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateTab,
  onOpenAddActivity,
  onOpenScanBill,
  onOpenPassport,
  onViewDocument,
  onAskAi
}) => {
  const { farm, fields, cropCycles, activities, expenses, harvests, documents } = useFarm();
  const { t } = useLanguage();

  const totalHarvestRev = harvests.reduce((s, h) => s + h.total_revenue, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalHarvestRev - totalExp;

  const recentActivities = activities.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 border border-emerald-500/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>AI-Powered Historical Farm Intelligence</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back to {farm.farm_name}
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
              Maintain chronological farming operations across your {fields.length} parcels. Search your complete history using natural language and verify every response against original invoices.
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateTab('ai_copilot')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-102"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask Farm AI Copilot</span>
            </button>
            <button
              onClick={onOpenScanBill}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-harvest-500/20 hover:bg-harvest-500/30 border border-harvest-500/40 text-harvest-300 text-xs font-bold transition-all"
            >
              <ScanLine className="h-4 w-4 text-harvest-400" />
              <span>Scan Bill with OCR</span>
            </button>
            <button
              onClick={onOpenPassport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all"
            >
              <Award className="h-4 w-4 text-teal-400" />
              <span>Farm Passport</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Farm Area */}
        <div className="glass-panel rounded-2xl p-4 lg:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Farm Area</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{farm.total_area_acres} <span className="text-xs text-slate-400 font-normal">Acres</span></div>
          <div className="text-[11px] text-slate-400">{fields.length} Active Field Parcels</div>
        </div>

        {/* Active Crop Cycles */}
        <div className="glass-panel rounded-2xl p-4 lg:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Crops Tracked</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Sprout className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">{cropCycles.length} <span className="text-xs text-slate-400 font-normal">Cycles</span></div>
          <div className="text-[11px] text-emerald-400">Wheat, Soybean, Sugarcane</div>
        </div>

        {/* Total Harvest Revenue */}
        <div className="glass-panel rounded-2xl p-4 lg:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Harvest Revenue</span>
            <div className="p-2 rounded-xl bg-harvest-500/10 text-harvest-400">
              <Wheat className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-harvest-400 font-mono">₹{totalHarvestRev.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-slate-400">Mandi & Mill Sales</div>
        </div>

        {/* Net Operating Profit */}
        <div className="glass-panel-glow rounded-2xl p-4 lg:p-5 border border-emerald-500/30 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-medium">Net Farm Profit</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-300 font-mono">₹{netProfit.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">Margin: {totalHarvestRev > 0 ? ((netProfit / totalHarvestRev) * 100).toFixed(1) : 0}%</div>
        </div>
      </div>

      {/* Interactive Field Map Visualizer */}
      <FieldVisualizer onSelectField={() => onNavigateTab('timeline')} />

      {/* Two Column Layout: Recent Activities Feed & AI Insights Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities Feed (2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Recent Historical Log</h3>
            </div>
            <button
              onClick={() => onNavigateTab('timeline')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>View All ({activities.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentActivities.map(act => (
              <div
                key={act.id}
                onClick={() => onNavigateTab('timeline')}
                className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 font-semibold text-xs flex-shrink-0">
                    <Sprout className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {act.description}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{act.activity_date}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{act.cropCycle?.fieldName}</span>
                      <span>•</span>
                      <span>{act.cropCycle?.cropName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  {act.cost ? (
                    <span className="text-xs font-bold text-amber-300 font-mono">
                      ₹{act.cost.toLocaleString('en-IN')}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-medium">Logged</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Spotlight Card (1 col) */}
        <div className="glass-panel-glow rounded-2xl p-5 border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Agronomic AI Insight</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Verified
              </span>
            </div>

            <h4 className="text-sm font-bold text-white leading-snug">
              Optimal Wheat Harvest & NPK Balance in Field A
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              Your Rabi 2025 Wheat yield reached <strong className="text-emerald-400">10.5 quintals/acre</strong> with an operating cost of ₹4,250/acre. Timely NPK 10:26:26 application on Dec 10 and preventative Amistar Top spray prevented yellow rust damage.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => onAskAi('How can I optimize fertilizer dosage for the upcoming season based on past yield?')}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI for Season Strategy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
