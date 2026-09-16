/*
 * Copyright 2026 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DATE_RANGE_OPTIONS } from 'api/types';

const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

export type MetricPoint = { timestamp: number; value: number };

export type ChartPoint = { timestamp: string; [dataKey: string]: string | number };

/**
 * `toDay` returns the `yyyy-mm-dd` day the given date falls on in UTC. The
 * server buckets the series by UTC day, so the key has to be built in UTC too.
 */
function toDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * `startOfWindow` returns the first day the server includes for the given
 * range. It mirrors `FromDateRange` on the server: the day ranges step by days
 * and the month ranges step by calendar months, both counted back from today.
 */
function startOfWindow(end: Date, range: keyof typeof DATE_RANGE_OPTIONS): Date {
  const start = new Date(end);

  switch (range) {
    case 'oneweek':
      start.setUTCDate(start.getUTCDate() - 7);
      break;
    case 'fourweeks':
      start.setUTCDate(start.getUTCDate() - 28);
      break;
    case 'threemonths':
      start.setUTCMonth(start.getUTCMonth() - 3);
      break;
    case 'twelvemonths':
      start.setUTCMonth(start.getUTCMonth() - 12);
      break;
    default: {
      // A range the server knows but this switch does not would silently
      // collapse the window to a single day, so fail at compile time instead.
      const exhaustive: never = range;
      throw new Error(`unknown date range: ${exhaustive}`);
    }
  }

  return start;
}

/**
 * `buildChartData` lays the given metric points out on one bucket per day of
 * the window the server queried, filling the days without data with zero.
 * Buckets are keyed by their UTC day so that every point lands on its own
 * bucket, even when the window spans the same month and day twice.
 */
export function buildChartData(
  data: Array<MetricPoint> | undefined,
  range: keyof typeof DATE_RANGE_OPTIONS,
  dataKey: string,
  now: Date = new Date(),
): Array<ChartPoint> {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = startOfWindow(end, range);

  const values = new Map((data || []).map(({ timestamp, value }) => [toDay(new Date(timestamp * 1000)), value]));

  const points: Array<ChartPoint> = [];
  for (let time = start.getTime(); time <= end.getTime(); time += MILLIS_PER_DAY) {
    const day = toDay(new Date(time));
    points.push({ timestamp: day, [dataKey]: values.get(day) || 0 });
  }

  return points;
}

/**
 * `formatDay` formats a `yyyy-mm-dd` day as an axis tick, e.g. `Sep 16`.
 */
export function formatDay(day: string): string {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * `formatDayWithYear` formats a `yyyy-mm-dd` day for the tooltip, e.g.
 * `Sep 16, 2026`. A window may span the same month and day twice, so the
 * tooltip has to carry the year to stay unambiguous.
 */
export function formatDayWithYear(day: string): string {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
