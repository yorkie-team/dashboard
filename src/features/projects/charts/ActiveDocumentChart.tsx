import { ProjectStats, DATE_RANGE_OPTIONS } from 'api/types';
import { UsageChart } from './UsageChart';

interface DocumentChartProps {
  stats: ProjectStats | null;
  range: keyof typeof DATE_RANGE_OPTIONS;
}

export function ActiveDocumentChart({ stats, range }: DocumentChartProps) {
  return (
    <UsageChart
      title="Active Documents"
      details=""
      count={stats?.activeDocumentsCount || 0}
      data={stats?.activeDocuments || []}
      range={range}
      dataKey="documents"
    />
  );
}
