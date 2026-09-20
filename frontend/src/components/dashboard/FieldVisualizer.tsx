import React from 'react';
import {
  Layers,
  Droplets,
  Sprout,
  Activity as ActivityIcon,
  ChevronRight,
  TrendingUp,
  FlaskConical,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';

interface FieldVisualizerProps {
  onSelectField?: (fieldId: string) => void;
}

export const FieldVisualizer: React.FC<FieldVisualizerProps> = ({ onSelectField }) => {
  const { fields, cropCycles, activities, filter, setFilter } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="glass-panel rounded-2xl p-4 lg:p-6 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-400" />
            <span>Farm Parcels & Field Visualizer</span>
          </h3>
          <p className="text-xs text-slate-400">
            Interactive field layout with soil specs, irrigation systems, and active crop stages
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Active
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Completed
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Perennial
          </span>
        </div>
      </div>

      {/* Field Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(field => {
          const activeCycle = cropCycles.find(c => c.field_id === field.id && (c.status === 'Active' || c.status === 'Completed'));
          const fieldActivities = activities.filter(a => a.cropCycle?.field_id === field.id);
          const isSelected = filter.fieldId === field.id;

          return (
            <div
              key={field.id}
              onClick={() => {
                const newFieldId = isSelected ? 'all' : field.id;
                setFilter(prev => ({ ...prev, fieldId: newFieldId }));
                if (onSelectField) onSelectField(newFieldId);
              }}
              className={`relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-950/40 to-slate-900/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-md'
              }`}
            >
              {/* Top Bar with Field Name and Area */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {field.area_acres} {t('acres')}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">{field.field_name}</h4>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                  <Sprout className="h-4 w-4 text-emerald-400" />
                </div>
              </div>

              {/* Crop Cycle Info */}
              <div className="space-y-2 mb-4 bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current / Latest Crop:</span>
                  <span className="font-semibold text-white">{activeCycle?.cropName || 'Fallow'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Variety:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{activeCycle?.variety || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Cycle Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      activeCycle?.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : activeCycle?.status === 'Completed'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {activeCycle?.status || 'Idle'}
                  </span>
                </div>
              </div>

              {/* Soil & Irrigation Metadata */}
              <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <FlaskConical className="h-3 w-3 text-harvest-400" />
                  <span className="truncate" title={field.soil_type}>{field.soil_type.split(' ')[0]} Soil</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Droplets className="h-3 w-3 text-sky-400" />
                  <span className="truncate" title={field.irrigation_type}>{field.irrigation_type.split(' ')[0]}</span>
                </div>
              </div>

              {/* Bottom stats & click to filter */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <ActivityIcon className="h-3 w-3 text-emerald-400" />
                  <span>{fieldActivities.length} logs recorded</span>
                </span>
                <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {isSelected ? 'Filtered' : 'Filter View'}
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
