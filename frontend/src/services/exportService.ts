import { Activity, Expense, Harvest, Field, CropCycle } from '../types/farm';

export function exportActivitiesToCsv(
  activities: Activity[],
  cropCycles: CropCycle[],
  fields: Field[]
) {
  const headers = [
    'Activity ID',
    'Date',
    'Field',
    'Crop',
    'Activity Type',
    'Description',
    'Quantity',
    'Unit',
    'Cost (INR)',
    'Notes'
  ];

  const rows = activities.map(act => {
    const cycle = cropCycles.find(c => c.id === act.crop_cycle_id);
    const field = fields.find(f => f.id === cycle?.field_id);
    
    return [
      `"${act.id}"`,
      `"${act.activity_date}"`,
      `"${field?.field_name || cycle?.fieldName || 'N/A'}"`,
      `"${cycle?.cropName || 'N/A'}"`,
      `"${act.activityType?.name || 'N/A'}"`,
      `"${act.description.replace(/"/g, '""')}"`,
      act.quantity ?? '',
      `"${act.unit ?? ''}"`,
      act.cost ?? 0,
      `"${(act.notes || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `KrishiGatha_Farm_History_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
