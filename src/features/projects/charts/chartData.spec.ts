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

import { describe, it, expect } from 'vitest';
import { buildChartData, formatDay, formatDayWithYear } from './chartData';

// NOTE(hackerwins): The buckets are derived in UTC, so they must not move with
// the viewer's timezone. `npm test` pins the suite to America/New_York, where
// `NOW` reads as the previous calendar day; `NOW_LATE` covers the other
// direction for anyone running vitest straight from a zone ahead of UTC. Both
// instants fall on 2026-09-16 in UTC, so a local derivation breaks the
// expectations below.
const NOW = new Date('2026-09-16T02:30:00Z');
const NOW_LATE = new Date('2026-09-16T20:00:00Z');

/** `dayStart` returns the UTC day start of the given date in seconds. */
function dayStart(date: string): number {
  return Date.parse(`${date}T00:00:00Z`) / 1000;
}

describe('buildChartData', () => {
  it('covers the 8 days the server answers LAST_1W with', () => {
    const points = buildChartData([], 'oneweek', 'users', NOW);

    expect(points).toHaveLength(8);
    expect(points[0].timestamp).toBe('2026-09-09');
    expect(points[points.length - 1].timestamp).toBe('2026-09-16');
  });

  it('ends the window on the UTC day of the given instant', () => {
    const points = buildChartData([], 'oneweek', 'users', NOW_LATE);

    expect(points[0].timestamp).toBe('2026-09-09');
    expect(points[points.length - 1].timestamp).toBe('2026-09-16');
  });

  it('covers the 29 days the server answers LAST_4W with', () => {
    const points = buildChartData([], 'fourweeks', 'users', NOW);

    expect(points).toHaveLength(29);
    expect(points[0].timestamp).toBe('2026-08-19');
    expect(points[points.length - 1].timestamp).toBe('2026-09-16');
  });

  it('covers the calendar 3 months the server answers LAST_3M with', () => {
    const points = buildChartData([], 'threemonths', 'users', NOW);

    expect(points).toHaveLength(93);
    expect(points[0].timestamp).toBe('2026-06-16');
    expect(points[points.length - 1].timestamp).toBe('2026-09-16');
  });

  it('covers the calendar 12 months the server answers LAST_12M with', () => {
    const points = buildChartData([], 'twelvemonths', 'users', NOW);

    expect(points).toHaveLength(366);
    expect(points[0].timestamp).toBe('2025-09-16');
    expect(points[points.length - 1].timestamp).toBe('2026-09-16');
  });

  it('keeps the oldest day of a 12 month window apart from the newest', () => {
    const points = buildChartData(
      [
        { timestamp: dayStart('2025-09-16'), value: 7 },
        { timestamp: dayStart('2026-09-16'), value: 42 },
      ],
      'twelvemonths',
      'users',
      NOW,
    );

    expect(points[0]).toEqual({ timestamp: '2025-09-16', users: 7 });
    expect(points[points.length - 1]).toEqual({ timestamp: '2026-09-16', users: 42 });
  });

  it('places each point on its own UTC day', () => {
    const points = buildChartData(
      [
        { timestamp: dayStart('2026-09-14'), value: 3 },
        { timestamp: dayStart('2026-09-16'), value: 5 },
      ],
      'oneweek',
      'users',
      NOW,
    );

    expect(points.filter(({ users }) => users !== 0)).toEqual([
      { timestamp: '2026-09-14', users: 3 },
      { timestamp: '2026-09-16', users: 5 },
    ]);
  });

  it('fills the days without data with zero', () => {
    const points = buildChartData([{ timestamp: dayStart('2026-09-12'), value: 1 }], 'oneweek', 'users', NOW);

    expect(points.map(({ users }) => users)).toEqual([0, 0, 0, 1, 0, 0, 0, 0]);
  });

  it('ignores points outside the window', () => {
    const points = buildChartData([{ timestamp: dayStart('2026-08-01'), value: 9 }], 'oneweek', 'users', NOW);

    expect(points.every(({ users }) => users === 0)).toBe(true);
  });
});

describe('formatDay', () => {
  it('formats a day as a compact axis tick', () => {
    expect(formatDay('2026-09-16')).toBe('Sep 16');
  });
});

describe('formatDayWithYear', () => {
  it('carries the year so a repeated month and day stay apart', () => {
    expect(formatDayWithYear('2025-09-16')).toBe('Sep 16, 2025');
    expect(formatDayWithYear('2026-09-16')).toBe('Sep 16, 2026');
  });
});
