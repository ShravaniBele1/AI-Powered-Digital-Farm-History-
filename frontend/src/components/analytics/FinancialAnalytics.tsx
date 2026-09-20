import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Wheat,
  Layers,
  Calendar,
  Sprout,
  ArrowUpRight,
  Droplets,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const FinancialAnalytics: React.FC = () => {
  const { expenses, harvests, cropCycles, fields } = useFarm();
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const totalRevenue = harvests.reduce((s, h) => s + h.total_revenue, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpense;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0';

  // Category Breakdown
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-400" />
          <span>Farm Financials & Agronomic Analytics</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Track return on investment (ROI), operational input costs, and yield profitability across fields
        </p>
      </div>

      {/* KPI Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Harvest Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wheat className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            <span>Mandi MSP & Mill gate sales</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Operating Expenses</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-300 font-mono">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Across seeds, fertilizers, labour & machinery
          </div>
        </div>

        {/* Net Farm Profit */}
        <div className="glass-panel-glow rounded-2xl p-5 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300">Net Farm Profit (EBIT)</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ₹{netProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>Profit Margin: {profitMargin}%</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Expense Breakdown */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="h-4 w-4 text-emerald-400" />
              <span>Expense Distribution by Category</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">₹{totalExpense.toLocaleString()}</span>
          </div>

          <div className="space-y-3 pt-2">
            {categories.map(([category, amount]) => {
              const percent = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono">₹{amount.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {percent}%
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Crop Cycle Profitability Table */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              <span>Field & Crop Cycle P&L</span>
            </h3>
            <span className="text-[11px] text-slate-400">All Completed Cycles</span>
          </div>

          <div className="space-y-3 pt-2">
            {cropCycles.map(cycle => {
              const cycleExpenses = expenses.filter(e => e.crop_cycle_id === cycle.id);
              const cycleHarvests = harvests.filter(h => h.crop_cycle_id === cycle.id);

              const expSum = cycleExpenses.reduce((s, e) => s + e.amount, 0);
              const revSum = cycleHarvests.reduce((s, h) => s + h.total_revenue, 0);
              const profit = revSum - expSum;
              const area = cycle.area_acres || 1;
              const profitPerAcre = profit / area;

              return (
                <div
                  key={cycle.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        {cycle.cropName} ({cycle.variety})
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {cycle.fieldName} • {cycle.seasonName} ({cycle.area_acres} ac)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold font-mono ${profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {profit >= 0 ? '+' : ''}₹{profit.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        ₹{Math.round(profitPerAcre).toLocaleString()}/acre
                      </div>
                    </div>
                  </div>

                  {/* Mini metrics row */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60 text-[11px]">
                    <div className="text-slate-400">
                      Cost: <span className="text-amber-300 font-mono">₹{expSum.toLocaleString()}</span>
                    </div>
                    <div className="text-slate-400 text-right">
                      Revenue: <span className="text-emerald-400 font-mono">₹{revSum.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
