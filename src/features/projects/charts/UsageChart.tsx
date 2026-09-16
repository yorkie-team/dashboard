import { Chart } from 'components';
import { formatNumber } from 'utils';
import { DATE_RANGE_OPTIONS } from 'api/types';
import { buildChartData, formatDay, formatDayWithYear } from './chartData';

interface UsageChartProps {
  title: string;
  details: string;
  count: number;
  data: Array<{ timestamp: number; value: number }>;
  range: keyof typeof DATE_RANGE_OPTIONS;
  dataKey: string;
}

export function UsageChart({ title, details, count, data, range, dataKey }: UsageChartProps) {
  return (
    <div className="chart_box">
      <div className="usage">
        <div className="usage_list">
          <div className="usage_item link_type big_type">
            <span className="title_box">
              <span className="title">{title}</span>
            </span>
            <dl className="info">
              <dt className="blind">{details}</dt>
              <dd className="info_text">{formatNumber(count) ?? 0}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="chart">
        <Chart
          data={buildChartData(data, range, dataKey)}
          xKey="timestamp"
          dataKey={dataKey}
          tickFormatter={formatDay}
          labelFormatter={formatDayWithYear}
        />
      </div>
    </div>
  );
}
