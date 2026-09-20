import React, { useState } from 'react';
import {
  FileSpreadsheet,
  ScanLine,
  Search,
  Tag,
  Calendar,
  FileText,
  ExternalLink,
  ShieldCheck,
  Building2,
  Filter,
  Plus
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { FarmDocument } from '../../types/farm';

interface DocumentVaultProps {
  onOpenScanBill: () => void;
  onViewDocument: (doc: FarmDocument) => void;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  onOpenScanBill,
  onViewDocument
}) => {
  const { documents } = useFarm();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const docTypes = ['all', 'Invoice / Bill', 'Soil Test Report', 'Mandi Sale Slip'];

  const filteredDocs = documents.filter(d => {
    if (selectedType !== 'all' && d.document_type !== selectedType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = d.file_name.toLowerCase().includes(q);
      const matchText = d.extracted_text?.toLowerCase().includes(q);
      const matchTags = d.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchText && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-emerald-400" />
            <span>Farm Document Vault & OCR Evidence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Store and organize all digitized receipts, input purchase bills, soil test reports, and mandi vouchers
          </p>
        </div>

        <button
          onClick={onOpenScanBill}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-harvest-500 to-amber-600 hover:from-harvest-600 hover:to-amber-700 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
        >
          <ScanLine className="h-4 w-4" />
          <span>Scan New Bill with AI OCR</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search documents by vendor, product, text, or tag..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-emerald-500"
          />
        </div>

        {/* Document Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {docTypes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === t
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t === 'all' ? 'All Documents' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            onClick={() => onViewDocument(doc)}
            className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all hover:shadow-xl hover:shadow-slate-950/40 group flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with overlay badge */}
              <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  src={doc.file_url}
                  alt={doc.file_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-emerald-300">
                  {doc.document_type}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 font-mono">
                  {doc.uploaded_at.split('T')[0]}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2.5">
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {doc.file_name}
                </h4>

                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed font-mono bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                  {doc.extracted_text || 'Text preview not available.'}
                </p>

                {doc.tags && (
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Evidence</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-emerald-400 flex items-center gap-1">
                <span>Inspect</span>
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
