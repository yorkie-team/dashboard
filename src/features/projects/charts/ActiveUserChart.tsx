import { ProjectStats, DATE_RANGE_OPTIONS } from 'api/types';
import { UsageChart } from './UsageChart';

interface ActiveUserChartProps {
  stats: ProjectStats | null;
  range: keyof typeof DATE_RANGE_OPTIONS;
}

export function ActiveUserChart({ stats, range }: ActiveUserChartProps) {
  return (
    <UsageChart
      title="Active Users"
      details=""
      count={stats?.activeUsersCount || 0}
      data={stats?.activeUsers || []}
      range={range}
      dataKey="users"
    />
  );
}
