/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
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

import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigationType } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectChannelList,
  listChannelsAsync,
  setCurrentPage,
  setLimit,
} from './channelsSlice';
import { selectCurrentProject } from 'features/projects/projectsSlice';
import { Button, SearchBar, Icon, Dropdown } from 'components';
import { formatNumber } from '../../utils/format';

const LIMIT_OPTIONS = [10, 30, 50, 100];

export function ChannelList() {
  const dispatch = useAppDispatch();
  const { channels, currentPage, totalPages, totalChannels, hasPrevious, hasNext, limit, status, type: queryType } = useAppSelector(selectChannelList);
  const { project: currentProject } = useAppSelector(selectCurrentProject);
  const navigationType = useNavigationType();
  const [isLimitDropdownOpen, setIsLimitDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [query, SetQuery] = useState<string | null>(null);
  const handleChangeQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    SetQuery(e.target.value);
  }, []);

  const handlePrevBtnClicked = useCallback(() => {
    dispatch(setCurrentPage(currentPage - 1));
  }, [dispatch, currentPage]);

  const handleNextBtnClicked = useCallback(() => {
    dispatch(setCurrentPage(currentPage + 1));
  }, [dispatch, currentPage]);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (query === null || query === '') {
        dispatch(listChannelsAsync({
          channelQuery: '',
          limit,
        }));
        return;
      }

      dispatch(
        listChannelsAsync({
          channelQuery: query,
          limit,
        }),
      );

      SetQuery('');
    },
    [dispatch, query, limit],
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      dispatch(setLimit(newLimit));
      setIsLimitDropdownOpen(false);
      // Reload channels with new limit
      if (query) {
        dispatch(
          listChannelsAsync({
            channelQuery: query,
            limit: newLimit,
          }),
        );
      } else {
        dispatch(listChannelsAsync({
          channelQuery: '',
          limit: newLimit,
        }));
      }
    },
    [dispatch, query],
  );

  // Load initial channels when component mounts or current project changes
  useEffect(() => {
    if (!currentProject) return;

    // Load channels on initial mount or when project changes
    dispatch(listChannelsAsync({
      channelQuery: '',
      limit,
    }));
  }, [dispatch, currentProject, limit]);

  // Handle browser navigation (back/forward)
  useEffect(() => {
    if (navigationType !== 'POP' || !currentProject) return;

    dispatch(listChannelsAsync({
      channelQuery: '',
      limit,
    }));
  }, [dispatch, navigationType, currentProject, limit]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLimitDropdownOpen(false);
      }
    };

    if (isLimitDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLimitDropdownOpen]);

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '0' }}>
        <div style={{ flex: 1 }}>
          <SearchBar
            placeholder={`Search ${query === null ? 'Channels' : channels.length + ' channels'}`}
            autoComplete="off"
            onChange={handleChangeQuery}
            value={query ?? ''}
            onSubmit={handleSearch}
          />
        </div>
        <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
          <Button
            outline
            size="sm"
            onClick={() => setIsLimitDropdownOpen(!isLimitDropdownOpen)}
            icon={<Icon type="openSelector" />}
          >
            Limit: {limit}
          </Button>
          {isLimitDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '4px', zIndex: 100 }}>
              <Dropdown shadow="m">
                {LIMIT_OPTIONS.map((option) => (
                  <Dropdown.Item
                    key={option}
                    onClick={() => handleLimitChange(option)}
                  >
                    <Dropdown.Text highlight={option === limit}>{option}</Dropdown.Text>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          )}
        </div>
      </div>
      <div className="document_table">
        <div className="thead">
          <span className="th id">Key</span>
          <span className="th connections">Sessions</span>
        </div>
        {status === 'loading' && (
          <div className="box_skeleton">
            <p className="blind">Loading</p>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
          </div>
        )}
        {status === 'failed' && (
          <div className="placeholder_box no_bg">
            <p className="desc">
              Search failed.
              <br />
              Please try refreshing the page.
            </p>
          </div>
        )}
        {status === 'idle' && (
          <ul className="tbody_list">
            {channels.map((channel) => {
              const { key, sessionCount } = channel;
              return (
                <li key={key} className="tbody_item">
                  <div className="link">
                    <span className="td id">{key}</span>
                    <span className="td connections">{formatNumber(sessionCount)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {status === 'idle' && channels.length === 0 && (
          <div className="placeholder_box no_bg">
            <p className="desc">There are no channels.</p>
          </div>
        )}
      </div>
      {totalChannels > 0 && (
        <div className="pagination">
          <Button.Box>
            <Button onClick={handlePrevBtnClicked} disabled={!hasPrevious} outline icon={<Icon type="previous" />}>
              Prev
            </Button>
            <span style={{ padding: '0 16px', color: 'var(--gray-700)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={handleNextBtnClicked} disabled={!hasNext} outline icon={<Icon type="next" />}>
              Next
            </Button>
          </Button.Box>
        </div>
      )}
    </>
  );
}

