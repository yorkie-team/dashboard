import { ProjectStats, DATE_RANGE_OPTIONS } from 'api/types';
import { UsageChart } from './UsageChart';

interface ClientChartProps {
  stats: ProjectStats | null;
  range: keyof typeof DATE_RANGE_OPTIONS;
}

export function ActiveClientChart({ stats, range }: ClientChartProps) {
  return (
    <UsageChart
      title="Active Clients"
      details=""
      count={stats?.activeClientsCount || 0}
      data={stats?.activeClients || []}
      range={range}
      dataKey="clients"
    />
  );
}
