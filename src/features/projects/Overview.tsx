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

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  selectProjectDetail,
  selectProjectSummaryMetrics,
  getProjectSummaryMetricsAsync,
  selectProjectTimeSeriesMetrics,
  getProjectTimeSeriesMetricsAsync,
} from './projectsSlice';
import { Icon, Popover, Dropdown, Chart } from 'components';
import { formatNumber } from 'utils';
import { TIME_RANGE } from 'api/types';

export function Overview() {
  const { project } = useAppSelector(selectProjectDetail);
  const summaryMetrics = useAppSelector(selectProjectSummaryMetrics);
  const timeSeriesMetrics = useAppSelector(selectProjectTimeSeriesMetrics);
  const [timePickerOpened, setTimePickerOpened] = useState(false);
  const [timePicker, setTimePicker] = useState<keyof typeof TIME_RANGE>('oneweek');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!project) return;
    dispatch(getProjectSummaryMetricsAsync([project.name, project.id]));
    dispatch(getProjectTimeSeriesMetricsAsync([project.id, timePicker]));
  }, [dispatch, project]);

  useEffect(() => {
    if (!project) return;
    dispatch(getProjectTimeSeriesMetricsAsync([project.id, timePicker]));
  }, [timePicker]);

  return (
    <>
      <div className="usage">
        <ul className="usage_list">
          <li className="usage_item link_type">
            <span className="title">Monthly Active Users</span>
            <span className="info_text">{formatNumber(summaryMetrics?.monthlyActiveUsers)}</span>
          </li>
          <li className="usage_item link_type">
            <span className="title">Total documents</span>
            <span className="info_text">{formatNumber(summaryMetrics?.documentTotalCount)}</span>
          </li>
        </ul>
      </div>
      <div className="chart_area">
        <div className="filter">
          <ul className="filter_list">
            <li className="filter_item">
              <Popover opened={timePickerOpened} onChange={setTimePickerOpened}>
                <Popover.Target>
                  <button type="button" className="btn btn_small filter_desc">
                    <span className="text">{TIME_RANGE[timePicker]}</span>
                    <Icon type="arrow" className="icon_arrow" />
                  </button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Dropdown>
                    <Dropdown.List>
                      <Dropdown.Item
                        onClick={() => {
                          setTimePicker('oneday');
                          setTimePickerOpened(false);
                        }}
                      >
                        {timePicker === 'oneday' && <Icon type="check" color="orange_0" />}
                        <Dropdown.Text>{TIME_RANGE.oneday}</Dropdown.Text>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setTimePicker('oneweek');
                          setTimePickerOpened(false);
                        }}
                      >
                        {timePicker === 'oneweek' && <Icon type="check" color="orange_0" />}
                        <Dropdown.Text>{TIME_RANGE.oneweek}</Dropdown.Text>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setTimePicker('onemonth');
                          setTimePickerOpened(false);
                        }}
                      >
                        {timePicker === 'onemonth' && <Icon type="check" color="orange_0" />}
                        <Dropdown.Text>{TIME_RANGE.onemonth}</Dropdown.Text>
                      </Dropdown.Item>
                    </Dropdown.List>
                  </Dropdown>
                </Popover.Dropdown>
              </Popover>
            </li>
          </ul>
        </div>
        <div className="chart_group">
          <div className="chart_box">
            <div className="usage">
              <ul className="usage_list">
                <li className="usage_item link_type big_type">
                  <span className="title_box">
                    <span className="title">Active Users</span>
                  </span>
                  <dl className="info">
                    <dt className="blind">Details</dt>
                    <dd className="info_text">{formatNumber(timeSeriesMetrics?.activeUsers?.at(-1)?.users) ?? 0}</dd>
                  </dl>
                </li>
              </ul>
            </div>
            <div className="chart">
              <Chart
                data={(timeSeriesMetrics?.activeUsers || []).map(({ time, users }) => {
                  const date = new Date(time);
                  return {
                    time:
                      timePicker === 'oneday'
                        ? date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
                        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    users,
                  };
                })}
                xKey="time"
                dataKey="users"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
