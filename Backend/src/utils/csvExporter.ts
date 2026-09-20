export interface ActivityCsvRow {
  id: string;
  activity_date: string;
  activity_type: string;
  crop_cycle_id: string;
  description: string;
  quantity: string | number;
  unit: string;
  cost: string | number;
  notes: string;
  created_at: string;
}

export function generateActivitiesCsv(rows: ActivityCsvRow[]): string {
  const headers = [
    'Activity ID',
    'Date',
    'Activity Type',
    'Crop Cycle ID',
    'Description',
    'Quantity',
    'Unit',
    'Cost (INR)',
    'Notes',
    'Created At'
  ];

  const escapeCsv = (val: string | number | null | undefined): string => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvLines = [
    headers.join(','),
    ...rows.map(r => [
      escapeCsv(r.id),
      escapeCsv(r.activity_date),
      escapeCsv(r.activity_type),
      escapeCsv(r.crop_cycle_id),
      escapeCsv(r.description),
      escapeCsv(r.quantity),
      escapeCsv(r.unit),
      escapeCsv(r.cost),
      escapeCsv(r.notes),
      escapeCsv(r.created_at)
    ].join(','))
  ];

  return csvLines.join('\r\n');
}
