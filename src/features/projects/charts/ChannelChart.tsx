import { ProjectStats, DATE_RANGE_OPTIONS } from 'api/types';
import { UsageChart } from './UsageChart';

interface ChannelChartProps {
  stats: ProjectStats | null;
  range: keyof typeof DATE_RANGE_OPTIONS;
}

export function ChannelChart({ stats, range }: ChannelChartProps) {
  return (
    <UsageChart
      title="Channels"
      details=""
      count={stats?.activeChannelsCount || 0}
      data={stats?.activeChannels || []}
      range={range}
      dataKey="channels"
    />
  );
}
