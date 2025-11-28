import { ProjectStats, DATE_RANGE_OPTIONS } from 'api/types';
import { UsageChart } from './UsageChart';

interface PeakSessionChartProps {
  stats: ProjectStats | null;
  range: keyof typeof DATE_RANGE_OPTIONS;
}

export function PeakSessionChart({ stats, range }: PeakSessionChartProps) {
  return (
    <UsageChart
      title="Peak Sessions Per Channels"
      details=""
      count={stats?.peakSessionsPerChannelCount || 0}
      data={stats?.peakSessionsPerChannel || []}
      range={range}
      dataKey="sessions"
    />
  );
}
