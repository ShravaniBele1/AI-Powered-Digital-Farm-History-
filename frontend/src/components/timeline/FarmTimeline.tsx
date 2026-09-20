import React, { useState } from 'react';
import {
  CalendarDays,
  Sparkles,
  Plus,
  Layers,
  Sprout,
  ArrowRight,
  Inbox
} from 'lucide-react';
import { FilterBar } from './FilterBar';
import { TimelineCard } from './TimelineCard';
import { DataTableView } from './DataTableView';
import { useFarm } from '../../context/FarmContext';
import { FarmDocument } from '../../types/farm';

interface FarmTimelineProps {
  onOpenAddActivity: () => void;
  onViewDocument?: (doc: FarmDocument) => void;
  onAskAi?: (prompt: string) => void;
}

export const FarmTimeline: React.FC<FarmTimelineProps> = ({
  onOpenAddActivity,
  onViewDocument,
  onAskAi
}) => {
  const { filteredActivities, cropCycles, filter } = useFarm();
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');

  // Group activities by month-year for timeline stream
  const groupedByMonth: Record<string, typeof filteredActivities> = {};
  filteredActivities.forEach(act => {
    const d = new Date(act.activity_date);
    const key = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!groupedByMonth[key]) {
      groupedByMonth[key] = [];
    }
    groupedByMonth[key].push(act);
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-emerald-400" />
            <span>Chronological Farm History</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete sequential log of farm operations, seedings, sprays, irrigations, and harvests
          </p>
        </div>

        {/* AI Quick Query Prompt */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAi && onAskAi('Summarize all farming activities for Field A in Rabi 2025')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>AI Summarize Current Timeline</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAddActivity={onOpenAddActivity}
      />

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <DataTableView onViewDocument={onViewDocument} />
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedByMonth).length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Inbox className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-white">No Farm Records Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No activities matched your current filter criteria. Try clearing filters or logging a new farm operation.
              </p>
              <button
                onClick={onOpenAddActivity}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all mt-2"
              >
                <Plus className="h-4 w-4" />
                <span>Log First Activity</span>
              </button>
            </div>
          ) : (
            Object.entries(groupedByMonth).map(([monthYear, acts]) => (
              <div key={monthYear} className="space-y-3">
                {/* Month Separator Pill */}
                <div className="sticky top-16 z-20 flex items-center gap-3 py-1">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-900/95 text-emerald-400 border border-emerald-500/30 shadow-md backdrop-blur-md">
                    {monthYear}
                  </span>
                  <div className="h-px flex-1 bg-slate-800/80"></div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {acts.length} {acts.length === 1 ? 'event' : 'events'}
                  </span>
                </div>

                {/* Event Cards */}
                <div className="space-y-0 pl-2">
                  {acts.map((act, index) => (
                    <TimelineCard
                      key={act.id}
                      activity={act}
                      isLast={index === acts.length - 1}
                      onViewDocument={onViewDocument}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
