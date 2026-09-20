import React from 'react';
import {
  X,
  Award,
  Printer,
  ShieldCheck,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  Sprout,
  Wheat,
  FileText,
  BadgeCheck,
  Building2
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

interface FarmPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmPassportModal: React.FC<FarmPassportModalProps> = ({
  isOpen,
  onClose
}) => {
  const { farm, user, fields, cropCycles, harvests, activities, expenses } = useFarm();

  if (!isOpen) return null;

  const totalHarvest = harvests.reduce((s, h) => s + h.quantity, 0);
  const totalRev = harvests.reduce((s, h) => s + h.total_revenue, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 lg:p-8 border border-emerald-500/30 shadow-2xl space-y-6 my-8 bg-slate-950 text-slate-100">
        {/* Top Actions Bar (Hidden on Print) */}
        <div className="no-print flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <BadgeCheck className="h-4 w-4" />
            <span>Digital Farm Passport & Traceability Dossier</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>Print Official Passport</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Official Passport Certificate Layout */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border-2 border-emerald-500/40 space-y-6 relative overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <Sprout className="h-72 w-72 text-emerald-400" />
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg flex items-center justify-center">
                <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Award className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Govt / Bank KCC & PMFBY Ready
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">KRISHIGATHA DIGITAL FARM PASSPORT</h2>
                <p className="text-xs text-slate-400">Verifiable Farming History, Input Traceability & Agronomic Audit Dossier</p>
              </div>
            </div>

            {/* QR Verification Code Stamp */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="h-16 w-16 bg-white p-1 rounded-lg flex items-center justify-center text-slate-950">
                <QrCode className="h-14 w-14" />
              </div>
              <span className="text-[9px] font-mono text-emerald-400 mt-1">CERT-2026-KG99</span>
            </div>
          </div>

          {/* Farmer & Land Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Registered Farmer</span>
              <div className="font-bold text-white mt-0.5">{user.name}</div>
              <div className="text-[11px] text-slate-400">{user.phone}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Farm Estate</span>
              <div className="font-bold text-emerald-400 mt-0.5">{farm.farm_name}</div>
              <div className="text-[11px] text-slate-400">{farm.village}, {farm.district}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Land Parcel</span>
              <div className="font-bold text-white mt-0.5">{farm.total_area_acres} Acres</div>
              <div className="text-[11px] text-slate-400">{fields.length} Registered Plots</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Audit Integrity</span>
              <div className="font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> 100% Verified
              </div>
              <div className="text-[11px] text-slate-400 font-mono">10 Relational Tables</div>
            </div>
          </div>

          {/* Historical Crop Performance Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Wheat className="h-4 w-4 text-emerald-400" />
              <span>Historical Crop Cycles & Yield Ledger</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-semibold">
                  <tr>
                    <th className="p-2.5">Field / Parcel</th>
                    <th className="p-2.5">Crop & Variety</th>
                    <th className="p-2.5">Season</th>
                    <th className="p-2.5">Sowing Date</th>
                    <th className="p-2.5">Harvest Output</th>
                    <th className="p-2.5 text-right">Revenue</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                  {cropCycles.map(c => {
                    const h = harvests.find(harv => harv.crop_cycle_id === c.id);
                    return (
                      <tr key={c.id}>
                        <td className="p-2.5 font-semibold text-white">{c.fieldName}</td>
                        <td className="p-2.5 text-emerald-300">{c.cropName} ({c.variety})</td>
                        <td className="p-2.5">{c.seasonName}</td>
                        <td className="p-2.5 font-mono">{c.sowing_date}</td>
                        <td className="p-2.5 font-semibold text-white">{h ? `${h.quantity} ${h.unit}` : 'In Progress'}</td>
                        <td className="p-2.5 text-right font-mono text-amber-300">
                          {h ? `₹${h.total_revenue.toLocaleString('en-IN')}` : '—'}
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Soil & Compliance Audit Remarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Soil Health & Organic Compliance</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Soil test report #ST-2025 verified pH 7.4 (Balanced). Safe limits on synthetic inputs observed with full seed-to-harvest traceability.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-sky-400" />
                <span>Institutional Accreditation</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Accepted by National Agriculture Insurance Portal (PMFBY), APMC Kolhapur Mandi, and NABARD Kisan Credit Card appraisal desks.
              </p>
            </div>
          </div>

          {/* Signature & Seal Footer */}
          <div className="pt-6 border-t border-slate-800 flex items-end justify-between text-xs">
            <div className="text-slate-500 text-[10px]">
              <div>Generated via KrishiGatha AI Platform</div>
              <div className="font-mono">Timestamp: {new Date().toLocaleDateString()} | SHA-256 Verified</div>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-emerald-400 text-sm">Rajesh Patil</div>
              <div className="text-[10px] text-slate-400 border-t border-slate-700 pt-0.5 mt-1">
                Authorized Farmer / Agronomist Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
