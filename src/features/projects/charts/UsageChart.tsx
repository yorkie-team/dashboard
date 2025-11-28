import { Chart } from 'components';
import { formatNumber } from 'utils';
import { DATE_RANGE_OPTIONS } from 'api/types';

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
          data={(() => {
            const now = new Date();
            const endDate = new Date(now.setHours(0, 0, 0, 0));
            const startDate = new Date(endDate);

            switch (range) {
              case 'oneweek':
                startDate.setDate(startDate.getDate() - 7);
                break;
              case 'fourweeks':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
              case 'threemonths':
                startDate.setMonth(startDate.getMonth() - 3);
                break;
              case 'twelvemonths':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            }

            const allDates = [];
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
              allDates.push({
                timestamp: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                [dataKey]: 0,
              });
            }

            const actualData = new Map(
              (data || []).map(({ timestamp, value }) => [
                new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                value,
              ]),
            );

            return allDates.map((point) => ({
              ...point,
              [dataKey]: actualData.get(point.timestamp) || 0,
            }));
          })()}
          xKey="timestamp"
          dataKey={dataKey}
        />
      </div>
    </div>
  );
}
