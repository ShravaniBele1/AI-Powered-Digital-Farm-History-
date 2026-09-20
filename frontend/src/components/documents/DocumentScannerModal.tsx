import React, { useState } from 'react';
import {
  X,
  ScanLine,
  FileCheck2,
  Sparkles,
  Upload,
  Layers,
  Calendar,
  DollarSign,
  Tag,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { OCR_SAMPLE_BILLS, OcrSampleBill } from '../../data/mockDocuments';
import { useFarm } from '../../context/FarmContext';

interface DocumentScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DocumentScannerModal: React.FC<DocumentScannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { cropCycles, activityTypes, addActivity, addDocument } = useFarm();
  const [selectedSample, setSelectedSample] = useState<OcrSampleBill>(OCR_SAMPLE_BILLS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  // Form states initialized with sample
  const [selectedCycleId, setSelectedCycleId] = useState(cropCycles[0]?.id || '');
  const [vendor, setVendor] = useState(selectedSample.suggestedActivity.supplier);
  const [amount, setAmount] = useState(selectedSample.suggestedActivity.cost);
  const [date, setDate] = useState(selectedSample.suggestedActivity.date);
  const [description, setDescription] = useState(selectedSample.suggestedActivity.description);
  const [productName, setProductName] = useState(selectedSample.suggestedActivity.productName);
  const [quantity, setQuantity] = useState(selectedSample.suggestedActivity.quantity);
  const [unit, setUnit] = useState(selectedSample.suggestedActivity.unit);

  if (!isOpen) return null;

  const handleSelectSample = (sample: OcrSampleBill) => {
    setSelectedSample(sample);
    setVendor(sample.suggestedActivity.supplier);
    setAmount(sample.suggestedActivity.cost);
    setDate(sample.suggestedActivity.date);
    setDescription(sample.suggestedActivity.description);
    setProductName(sample.suggestedActivity.productName);
    setQuantity(sample.suggestedActivity.quantity);
    setUnit(sample.suggestedActivity.unit);
    setHasScanned(false);
  };

  const handleRunOcr = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasScanned(true);
    }, 1200);
  };

  const handleImportToHistory = () => {
    const actType = activityTypes.find(t =>
      t.name.toLowerCase().includes(selectedSample.suggestedActivity.category.toLowerCase())
    ) || activityTypes[0];

    // 1. Add Activity & Input & Expense
    addActivity(
      {
        crop_cycle_id: selectedCycleId,
        activity_type_id: actType.id,
        activity_date: date,
        description,
        quantity,
        unit,
        cost: amount,
        notes: `Imported via AI OCR Scanner from ${vendor} invoice.`,
      },
      {
        input_type: selectedSample.suggestedActivity.category,
        product_name: productName,
        quantity,
        unit,
        cost: amount,
        supplier: vendor,
      },
      amount
    );

    // 2. Add to Document Vault
    addDocument({
      farm_id: '3ddb8a80-5521-4532-b261-62677c8ff4ee',
      crop_cycle_id: selectedCycleId,
      document_type: 'Invoice / Bill',
      file_name: `${productName.replace(/\s+/g, '_')}_Bill_${date}.jpg`,
      file_url: selectedSample.imageUrl,
      extracted_text: selectedSample.extractedText,
      tags: [selectedSample.category, vendor, `₹${amount}`],
      meta: {
        vendor,
        amount,
        date,
        items: [productName]
      }
    });

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel-glow rounded-3xl p-6 border border-emerald-500/40 shadow-2xl space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-harvest-500 to-amber-600 flex items-center justify-center text-white shadow-md">
              <ScanLine className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Smart AI Document & Bill Scanner</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OCR Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Scan paper receipts, fertilizer bills, or soil cards to auto-populate your farm history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sample Bill Selector Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Choose a Sample Paper Bill to Scan:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {OCR_SAMPLE_BILLS.map(sample => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedSample.id === sample.id
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="text-xs font-bold text-emerald-400">{sample.category}</div>
                <div className="text-xs font-semibold text-white truncate">{sample.name}</div>
                <div className="text-[11px] text-slate-400 mt-1">₹{sample.suggestedActivity.cost} • {sample.suggestedActivity.supplier}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main OCR Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Left Column: Image & OCR Text Extraction */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center">
              <img
                src={selectedSample.imageUrl}
                alt="Bill Scan"
                className="w-full h-full object-cover opacity-80"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <ScanLine className="h-8 w-8 text-emerald-400 animate-bounce" />
                  <span className="text-xs font-semibold text-emerald-300">Extracting fields with OCR...</span>
                </div>
              )}
            </div>

            {/* Extracted Text Box */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>Extracted OCR Raw Text:</span>
                <span className="text-emerald-400">Confidence: 98.6%</span>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                {selectedSample.extractedText}
              </pre>
            </div>

            {!hasScanned && !isAnalyzing && (
              <button
                onClick={handleRunOcr}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-harvest-500 to-amber-600 hover:from-harvest-600 hover:to-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Run AI OCR Extraction</span>
              </button>
            )}
          </div>

          {/* Right Column: Auto-Populated Structured Form */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileCheck2 className="h-4 w-4 text-emerald-400" />
                <span>Auto-Extracted Farm Record</span>
              </span>
              {hasScanned && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready to Import
                </span>
              )}
            </div>

            {/* Crop Cycle Target Selector */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Crop Cycle / Field</label>
              <select
                value={selectedCycleId}
                onChange={e => setSelectedCycleId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
              >
                {cropCycles.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.fieldName} — {c.cropName} ({c.seasonName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Total Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-bold font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Unit</label>
                <input
                  type="text"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Vendor / Supplier</label>
              <input
                type="text"
                value={vendor}
                onChange={e => setVendor(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <button
              onClick={handleImportToHistory}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all mt-3"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>1-Click Save to Digital Farm History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
