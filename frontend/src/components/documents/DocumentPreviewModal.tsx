import React from 'react';
import {
  X,
  FileText,
  Calendar,
  Building2,
  Tag,
  Download,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { FarmDocument } from '../../types/farm';
import { useFarm } from '../../context/FarmContext';

interface DocumentPreviewModalProps {
  document: FarmDocument | null;
  onClose: () => void;
  onAskAiWithDoc?: (doc: FarmDocument) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
  onAskAiWithDoc
}) => {
  const { cropCycles, fields } = useFarm();
  if (!document) return null;

  const cycle = cropCycles.find(c => c.id === document.crop_cycle_id);
  const field = fields.find(f => f.id === (document.field_id || cycle?.field_id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {document.document_type}
              </span>
              <h3 className="text-sm font-bold text-white">{document.file_name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Document Metadata Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Target Field</div>
            <div className="font-semibold text-white truncate">{field?.field_name || 'Farm General'}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Crop Cycle</div>
            <div className="font-semibold text-white truncate">{cycle?.cropName || 'Rabi Season'}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Upload Date</div>
            <div className="font-semibold text-white">{document.uploaded_at.split('T')[0]}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">Evidence Status</div>
            <div className="font-semibold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </div>
          </div>
        </div>

        {/* Image Preview & OCR Text Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3] flex items-center justify-center">
            <img
              src={document.file_url}
              alt={document.file_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Extracted Text */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-emerald-400" />
                <span>Extracted Record Content</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 max-h-48 overflow-y-auto">
                {document.extracted_text || 'No text extracted.'}
              </p>
            </div>

            {/* Tags */}
            {document.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {document.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-[11px] text-slate-500 font-mono">Doc ID: {document.id}</span>
          <div className="flex items-center gap-2">
            {onAskAiWithDoc && (
              <button
                onClick={() => {
                  onAskAiWithDoc(document);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Ask Farm AI About This Doc
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
