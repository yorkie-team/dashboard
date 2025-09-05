/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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

import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  getProjectStatsAsync,
  selectProjectDetail,
  selectProjectStats,
  selectCurrentProject,
  resetProjectDetail,
} from './projectsSlice';
import { Icon, Popover, Dropdown, Chart } from 'components';
import { formatNumber } from 'utils';
import { DATE_RANGE_OPTIONS } from 'api/types';

export function Overview() {
  const { project } = useAppSelector(selectProjectDetail);
  const { project: currentProject } = useAppSelector(selectCurrentProject);
  const { stats, status } = useAppSelector(selectProjectStats);
  const [dateRangePickerOpened, setDateRangePickerOpened] = useState(false);
  const [range, setDateRange] = useState<keyof typeof DATE_RANGE_OPTIONS>('oneweek');
  const dispatch = useAppDispatch();
  const lastFetchedRange = useRef<string | null>(null);
  const lastFetchedProject = useRef<string | null>(null);

  useEffect(() => {
    // Wait for both project detail and current project to be set
    // currentProject ensures that the interceptor secret key is configured
    if (!project || !currentProject || project.name !== currentProject.name) return;

    const currentKey = `${project.name}-${range}`;
    const lastKey = `${lastFetchedProject.current}-${lastFetchedRange.current}`;

    // Only fetch if we haven't fetched this combination before and not currently loading
    if (currentKey !== lastKey && status !== 'loading') {
      lastFetchedProject.current = project.name;
      lastFetchedRange.current = range;
      dispatch(getProjectStatsAsync(range));
    }
  }, [project, currentProject, range, dispatch, status]);

  useEffect(() => {
    return () => {
      dispatch(resetProjectDetail());
    };
  }, [dispatch]);

  return (
    <>
      <div className="usage">
        <ul className="usage_list">
          <li className="usage_item link_type">
            <span className="title">Documents</span>
            <span className="info_text">{String(stats?.documentsCount || 0)}</span>
          </li>
          <li className="usage_item link_type">
            <span className="title">Clients</span>
            <span className="info_text">{String(stats?.clientsCount || 0)}</span>
          </li>
        </ul>
      </div>
      <div className="chart_area">
        <div className="filter">
          <div className="filter_list">
            <div className="filter_item">
              <Popover opened={dateRangePickerOpened} onChange={setDateRangePickerOpened}>
                <Popover.Target>
                  <button type="button" className="btn btn_small filter_desc">
                    <span className="text">{DATE_RANGE_OPTIONS[range]}</span>
                    <Icon type="arrow" className="icon_arrow" />
                  </button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Dropdown>
                    <Dropdown.List>
                      {Object.entries(DATE_RANGE_OPTIONS).map(([dateRange, label]) => (
                        <Dropdown.Item
                          key={dateRange}
                          onClick={() => {
                            setDateRange(dateRange as keyof typeof DATE_RANGE_OPTIONS);
                            setDateRangePickerOpened(false);
                          }}
                        >
                          {range === dateRange && <Icon type="check" color="orange_0" />}
                          <Dropdown.Text>{label}</Dropdown.Text>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
        <div className="chart_group">
          <div className="chart_box">
            <div className="usage">
              <div className="usage_list">
                <div className="usage_item link_type big_type">
                  <span className="title_box">
                    <span className="title">Active Users</span>
                  </span>
                  <dl className="info">
                    <dt className="blind">Details</dt>
                    <dd className="info_text">{formatNumber(stats?.activeUsersCount) ?? 0}</dd>
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
                      users: 0,
                    });
                  }

                  const actualData = new Map(
                    (stats?.activeUsers || []).map(({ timestamp, value: users }) => [
                      new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                      users,
                    ]),
                  );

                  return allDates.map((point) => ({
                    ...point,
                    users: actualData.get(point.timestamp) || 0,
                  }));
                })()}
                xKey="timestamp"
                dataKey="users"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
