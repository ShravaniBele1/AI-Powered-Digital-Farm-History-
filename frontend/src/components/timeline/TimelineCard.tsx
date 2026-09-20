import React from 'react';
import {
  Tractor,
  Sprout,
  Droplets,
  FlaskConical,
  ShieldCheck,
  Wheat,
  Scissors,
  ClipboardCheck,
  Calendar,
  IndianRupee,
  FileText,
  Trash2,
  Paperclip,
  Tag,
  Building2,
  Clock
} from 'lucide-react';
import { Activity, FarmDocument } from '../../types/farm';
import { useFarm } from '../../context/FarmContext';

interface TimelineCardProps {
  activity: Activity;
  isLast?: boolean;
  onViewDocument?: (doc: FarmDocument) => void;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  activity,
  isLast,
  onViewDocument
}) => {
  const { deleteActivity, documents } = useFarm();

  const getActivityIcon = (name?: string) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('plough') || n.includes('machin')) return <Tractor className="h-4 w-4 text-amber-400" />;
    if (n.includes('sow') || n.includes('plant')) return <Sprout className="h-4 w-4 text-emerald-400" />;
    if (n.includes('irrigat') || n.includes('water')) return <Droplets className="h-4 w-4 text-sky-400" />;
    if (n.includes('fertiliz') || n.includes('nutri')) return <FlaskConical className="h-4 w-4 text-emerald-300" />;
    if (n.includes('pesticide') || n.includes('protect')) return <ShieldCheck className="h-4 w-4 text-rose-400" />;
    if (n.includes('weed') || n.includes('prun')) return <Scissors className="h-4 w-4 text-yellow-400" />;
    if (n.includes('harvest')) return <Wheat className="h-4 w-4 text-harvest-400" />;
    return <ClipboardCheck className="h-4 w-4 text-teal-400" />;
  };

  const getActivityColor = (name?: string) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('plough')) return 'from-amber-500/20 to-amber-900/10 border-amber-500/30 text-amber-400';
    if (n.includes('sow')) return 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30 text-emerald-400';
    if (n.includes('irrigat')) return 'from-sky-500/20 to-sky-900/10 border-sky-500/30 text-sky-400';
    if (n.includes('fertiliz')) return 'from-teal-500/20 to-teal-900/10 border-teal-500/30 text-teal-300';
    if (n.includes('pesticide')) return 'from-rose-500/20 to-rose-900/10 border-rose-500/30 text-rose-400';
    if (n.includes('weed')) return 'from-yellow-500/20 to-yellow-900/10 border-yellow-500/30 text-yellow-400';
    if (n.includes('harvest')) return 'from-harvest-500/20 to-harvest-900/10 border-harvest-500/30 text-harvest-400';
    return 'from-slate-800 to-slate-900 border-slate-700 text-slate-300';
  };

  // Check attached documents
  const attachedDocs = documents.filter(
    d =>
      d.activity_id === activity.id ||
      activity.document_ids?.includes(d.id) ||
      (d.crop_cycle_id === activity.crop_cycle_id && d.meta?.date === activity.activity_date)
  );

  return (
    <div className="relative flex gap-4 group">
      {/* Timeline spine and node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`h-9 w-9 rounded-xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110 bg-slate-950 ${getActivityColor(
            activity.activityType?.name
          )}`}
        >
          {getActivityIcon(activity.activityType?.name)}
        </div>
        {!isLast && <div className="w-0.5 flex-grow bg-slate-800 my-2"></div>}
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-6">
        <div className="glass-panel rounded-2xl p-4 lg:p-5 border border-slate-800/80 hover:border-slate-700/80 transition-all hover:shadow-xl hover:shadow-slate-950/40">
          {/* Header Bar */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200">
                {activity.activityType?.name || 'Activity'}
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {activity.cropCycle?.fieldName || 'Field A'}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-300">
                {activity.cropCycle?.cropName} ({activity.cropCycle?.variety || 'Crop'})
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-[11px] px-2 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {activity.cropCycle?.seasonName}
              </span>
            </div>

            {/* Date & Cost */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                <span>{activity.activity_date}</span>
              </div>
              {activity.cost !== undefined && activity.cost > 0 && (
                <span className="text-xs font-bold text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  ₹{activity.cost.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Activity Description */}
          <p className="text-xs text-slate-200 leading-relaxed mb-3">
            {activity.description}
          </p>

          {/* Inputs & Materials Applied */}
          {activity.inputs && activity.inputs.length > 0 && (
            <div className="mb-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Tag className="h-3 w-3 text-emerald-400" />
                <span>Materials & Inputs Applied</span>
              </div>
              {activity.inputs.map(inp => (
                <div key={inp.id} className="flex flex-wrap items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white">
                    {inp.product_name} ({inp.quantity} {inp.unit})
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    {inp.supplier && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-slate-500" />
                        {inp.supplier}
                      </span>
                    )}
                    {inp.cost && <span className="text-amber-300 font-mono">₹{inp.cost.toLocaleString()}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notes & Evidence Badge */}
          {activity.notes && (
            <div className="text-[11px] text-slate-400 italic bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/50 mb-3">
              "{activity.notes}"
            </div>
          )}

          {/* Footer: Attached Documents & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
            {/* Attached documents */}
            <div className="flex items-center gap-2">
              {attachedDocs.length > 0 ? (
                attachedDocs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => onViewDocument && onViewDocument(doc)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 text-emerald-300 text-[11px] font-medium transition-colors"
                  >
                    <FileText className="h-3 w-3 text-emerald-400" />
                    <span>Evidence Bill: {doc.file_name}</span>
                  </button>
                ))
              ) : (
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ClipboardCheck className="h-3 w-3 text-slate-600" />
                  <span>Field Log Record</span>
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-600">ID: #{activity.id.slice(0, 8)}</span>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this activity record?')) {
                    deleteActivity(activity.id);
                  }
                }}
                className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete Record"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
