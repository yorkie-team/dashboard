import { ProjectStats, DATE_RANGE_OPTIONS } from 'api/types';
import { UsageChart } from './UsageChart';

interface SessionChartProps {
  stats: ProjectStats | null;
  range: keyof typeof DATE_RANGE_OPTIONS;
}

export function SessionChart({ stats, range }: SessionChartProps) {
  return (
    <UsageChart
      title="Sessions"
      details=""
      count={stats?.sessionsCount || 0}
      data={stats?.sessions || []}
      range={range}
      dataKey="sessions"
    />
  );
}
