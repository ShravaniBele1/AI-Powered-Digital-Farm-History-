import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Calendar,
  Layers,
  Sprout,
  Tag,
  DollarSign,
  Building2,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose
}) => {
  const { cropCycles, activityTypes, addActivity } = useFarm();

  const [cropCycleId, setCropCycleId] = useState(cropCycles[0]?.id || '');
  const [activityTypeId, setActivityTypeId] = useState(activityTypes[0]?.id || '');
  const [activityDate, setActivityDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState('kg');
  const [cost, setCost] = useState<number | ''>('');
  const [notes, setNotes] = useState('');

  // Optional Input fields
  const [includeInput, setIncludeInput] = useState(false);
  const [productName, setProductName] = useState('');
  const [supplier, setSupplier] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addActivity(
      {
        crop_cycle_id: cropCycleId,
        activity_type_id: activityTypeId,
        activity_date: activityDate,
        description,
        quantity: quantity !== '' ? Number(quantity) : undefined,
        unit: unit || undefined,
        cost: cost !== '' ? Number(cost) : undefined,
        notes: notes || undefined,
      },
      includeInput && productName.trim()
        ? {
            product_name: productName,
            quantity: quantity !== '' ? Number(quantity) : undefined,
            unit,
            cost: cost !== '' ? Number(cost) : undefined,
            supplier,
          }
        : undefined,
      cost !== '' ? Number(cost) : undefined
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Log Farm Operation / Activity</h3>
              <p className="text-[11px] text-slate-400">Save a new sequential event into the digital history</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Target Crop Cycle */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Crop Cycle</label>
            <select
              value={cropCycleId}
              onChange={e => setCropCycleId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
            >
              {cropCycles.map(c => (
                <option key={c.id} value={c.id}>
                  {c.fieldName} • {c.cropName} ({c.seasonName})
                </option>
              ))}
            </select>
          </div>

          {/* Activity Type & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Activity Type</label>
              <select
                value={activityTypeId}
                onChange={e => setActivityTypeId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
              >
                {activityTypes.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Activity</label>
              <input
                type="date"
                required
                value={activityDate}
                onChange={e => setActivityDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Activity Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Applied 50kg Urea top-dressing after irrigation"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
            />
          </div>

          {/* Quantity, Unit & Cost */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity</label>
              <input
                type="number"
                step="any"
                placeholder="50"
                value={quantity}
                onChange={e => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Unit</label>
              <input
                type="text"
                placeholder="kg / litre / hours"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cost (₹)</label>
              <input
                type="number"
                placeholder="1500"
                value={cost}
                onChange={e => setCost(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-bold font-mono focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Materials Checkbox Toggle */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={includeInput}
                onChange={e => setIncludeInput(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0"
              />
              <span>Attach Commercial Product / Supplier Detail</span>
            </label>
          </div>

          {includeInput && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Product Brand / Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mahabeej Certified Seed"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Supplier / Store</label>
                  <input
                    type="text"
                    placeholder="e.g. Kolhapur Kisan Store"
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Agronomic Notes / Observations</label>
            <textarea
              rows={2}
              placeholder="e.g. Soil moisture was adequate; good canopy coverage observed"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
            >
              Save Activity Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
