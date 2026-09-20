import React, { useState } from 'react';
import {
  ArrowUpDown,
  FileText,
  Trash2,
  Calendar,
  Layers,
  Sprout,
  DollarSign
} from 'lucide-react';
import { Activity, FarmDocument } from '../../types/farm';
import { useFarm } from '../../context/FarmContext';

interface DataTableViewProps {
  onViewDocument?: (doc: FarmDocument) => void;
}

export const DataTableView: React.FC<DataTableViewProps> = ({ onViewDocument }) => {
  const { filteredActivities, deleteActivity, documents } = useFarm();
  const [sortField, setSortField] = useState<'date' | 'cost' | 'field'>('date');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const sorted = [...filteredActivities].sort((a, b) => {
    if (sortField === 'date') {
      const diff = new Date(a.activity_date).getTime() - new Date(b.activity_date).getTime();
      return sortAsc ? diff : -diff;
    }
    if (sortField === 'cost') {
      const diff = (a.cost || 0) - (b.cost || 0);
      return sortAsc ? diff : -diff;
    }
    if (sortField === 'field') {
      const nameA = a.cropCycle?.fieldName || '';
      const nameB = b.cropCycle?.fieldName || '';
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
    return 0;
  });

  const handleSort = (field: 'date' | 'cost' | 'field') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('field')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Field & Crop</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4">Activity Type</th>
              <th className="py-3 px-4">Description & Notes</th>
              <th className="py-3 px-4">Materials / Inputs</th>
              <th
                onClick={() => handleSort('cost')}
                className="py-3 px-4 text-right cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Cost (INR)</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-center">Evidence</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  No matching farm activities found for selected filters.
                </td>
              </tr>
            ) : (
              sorted.map(act => {
                const attachedDoc = documents.find(
                  d => d.activity_id === act.id || act.document_ids?.includes(d.id)
                );

                return (
                  <tr
                    key={act.id}
                    className="hover:bg-slate-900/50 transition-colors group"
                  >
                    <td className="py-3 px-4 font-mono whitespace-nowrap text-slate-200">
                      {act.activity_date}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-emerald-400">
                        {act.cropCycle?.fieldName || 'Field A'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {act.cropCycle?.cropName} • {act.cropCycle?.seasonName}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 font-medium text-slate-200 text-[11px]">
                        {act.activityType?.name || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="text-slate-200 font-medium line-clamp-1">{act.description}</div>
                      {act.notes && (
                        <div className="text-[11px] text-slate-400 italic line-clamp-1">"{act.notes}"</div>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {act.inputs && act.inputs.length > 0 ? (
                        <div className="text-[11px] text-slate-300">
                          {act.inputs.map(i => `${i.product_name} (${i.quantity} ${i.unit})`).join(', ')}
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {act.cost ? (
                        <span className="font-semibold text-amber-300 font-mono">
                          ₹{act.cost.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {attachedDoc ? (
                        <button
                          onClick={() => onViewDocument && onViewDocument(attachedDoc)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] hover:bg-emerald-900"
                        >
                          <FileText className="h-3 w-3 text-emerald-400" />
                          <span>Bill</span>
                        </button>
                      ) : (
                        <span className="text-slate-600 text-[11px]">Field Log</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this record?')) {
                            deleteActivity(act.id);
                          }
                        }}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
