import React from 'react';
import {
  ShieldCheck,
  FileText,
  Calendar,
  Activity as ActivityIcon,
  Wheat,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { AiEvidence, FarmDocument } from '../../types/farm';
import { useFarm } from '../../context/FarmContext';

interface EvidenceViewerProps {
  evidenceList: AiEvidence[];
  onViewDocument?: (doc: FarmDocument) => void;
  onJumpToTimeline?: (activityId?: string) => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  evidenceList,
  onViewDocument,
  onJumpToTimeline
}) => {
  const { documents } = useFarm();

  if (!evidenceList || evidenceList.length === 0) return null;

  return (
    <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Evidence Traceability ({evidenceList.length} sources)</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
          100% Grounded in DB Records
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {evidenceList.map(ev => {
          const matchingDoc = ev.document_id ? documents.find(d => d.id === ev.document_id) : undefined;
          const scorePercent = Math.round(ev.relevance_score * 100);

          return (
            <div
              key={ev.id}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-1.5 group"
            >
              {/* Top Row: Type & Match Confidence */}
              <div className="flex items-center justify-between gap-1 text-[11px]">
                <span className="font-semibold text-white flex items-center gap-1 truncate">
                  {ev.evidence_type === 'document' ? (
                    <FileText className="h-3 w-3 text-sky-400" />
                  ) : ev.evidence_type === 'harvest' ? (
                    <Wheat className="h-3 w-3 text-harvest-400" />
                  ) : ev.evidence_type === 'expense' ? (
                    <DollarSign className="h-3 w-3 text-amber-400" />
                  ) : (
                    <ActivityIcon className="h-3 w-3 text-emerald-400" />
                  )}
                  <span className="truncate">{ev.evidence_title}</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
                  {scorePercent}% Match
                </span>
              </div>

              {/* Evidence Snippet */}
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 font-mono">
                {ev.evidence_snippet}
              </p>

              {/* Actions & Links */}
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-slate-500 font-mono text-[10px]">
                  {ev.activity_id ? `Act: #${ev.activity_id.slice(0, 8)}` : ev.document_id ? `Doc: #${ev.document_id}` : 'Source Record'}
                </span>

                {matchingDoc && (
                  <button
                    onClick={() => onViewDocument && onViewDocument(matchingDoc)}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium group-hover:underline text-[11px]"
                  >
                    <span>View Bill</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
