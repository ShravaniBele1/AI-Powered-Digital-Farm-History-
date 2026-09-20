import React from 'react';
import {
  Search,
  Filter,
  Layers,
  Sprout,
  Calendar,
  Tag,
  X,
  Download,
  Plus
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { exportActivitiesToCsv } from '../../services/exportService';

interface FilterBarProps {
  viewMode: 'timeline' | 'table';
  setViewMode: (mode: 'timeline' | 'table') => void;
  onOpenAddActivity: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  setViewMode,
  onOpenAddActivity
}) => {
  const {
    fields,
    crops,
    seasons,
    activityTypes,
    activities,
    cropCycles,
    filter,
    setFilter,
    filteredActivities
  } = useFarm();
  const { t } = useLanguage();

  const hasActiveFilters =
    filter.fieldId !== 'all' ||
    filter.cropId !== 'all' ||
    filter.seasonId !== 'all' ||
    filter.activityTypeId !== 'all' ||
    filter.searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setFilter({
      fieldId: 'all',
      cropId: 'all',
      seasonId: 'all',
      activityTypeId: 'all',
      searchQuery: '',
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
      {/* Top row: Search input & View Switcher & Export */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={e => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder={t('search_records')}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs text-white placeholder-slate-500 transition-all"
          />
          {filter.searchQuery && (
            <button
              onClick={() => setFilter(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2">
          {/* Timeline / Table Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Data Table
            </button>
          </div>

          {/* Export CSV */}
          <button
            onClick={() => exportActivitiesToCsv(filteredActivities, cropCycles, fields)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            title="Download CSV report"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">{t('export_csv')}</span>
          </button>

          {/* Add Activity Button */}
          <button
            onClick={onOpenAddActivity}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Record</span>
          </button>
        </div>
      </div>

      {/* Filter Selectors Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/60">
        {/* Field Filter */}
        <div className="relative">
          <select
            value={filter.fieldId}
            onChange={e => setFilter(prev => ({ ...prev, fieldId: e.target.value }))}
            className="w-full appearance-none px-3 py-1.5 pr-8 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">{t('all_fields')}</option>
            {fields.map(f => (
              <option key={f.id} value={f.id}>
                {f.field_name} ({f.area_acres} ac)
              </option>
            ))}
          </select>
          <Layers className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>

        {/* Crop Filter */}
        <div className="relative">
          <select
            value={filter.cropId}
            onChange={e => setFilter(prev => ({ ...prev, cropId: e.target.value }))}
            className="w-full appearance-none px-3 py-1.5 pr-8 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">{t('all_crops')}</option>
            {crops.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>
          <Sprout className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>

        {/* Season Filter */}
        <div className="relative">
          <select
            value={filter.seasonId}
            onChange={e => setFilter(prev => ({ ...prev, seasonId: e.target.value }))}
            className="w-full appearance-none px-3 py-1.5 pr-8 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">{t('all_seasons')}</option>
            {seasons.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.year})
              </option>
            ))}
          </select>
          <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>

        {/* Activity Type Filter */}
        <div className="relative">
          <select
            value={filter.activityTypeId}
            onChange={e => setFilter(prev => ({ ...prev, activityTypeId: e.target.value }))}
            className="w-full appearance-none px-3 py-1.5 pr-8 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">{t('all_activities')}</option>
            {activityTypes.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <Tag className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium">
            Showing <strong className="text-white">{filteredActivities.length}</strong> of {activities.length} records
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-[11px] text-harvest-400 hover:text-harvest-300 font-medium ml-2"
            >
              <X className="h-3 w-3" /> Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
