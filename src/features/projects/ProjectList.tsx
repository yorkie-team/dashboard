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

import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectList, listProjectsAsync } from './projectsSlice';
import { Project } from 'api/types';
import { Button, Icon, Popover, Dropdown, SearchBar } from 'components';

// TODO(chacha912): Extract to Cards component
function ProjectCards({
  projects,
  totalProjectsCount,
  viewType,
}: {
  projects: Array<Project>;
  totalProjectsCount: number;
  viewType: 'list' | 'card';
}) {
  if (totalProjectsCount === 0) {
    return (
      <Link to={'/projects/new'} className="placeholder_box">
        <p className="desc">
          Get started by
          <br />
          <span className="blue_dark">creating a new project</span>
        </p>
      </Link>
    );
  }
  if (projects.length === 0) {
    return (
      <div className="placeholder_box">
        <p className="desc">No matching result</p>
      </div>
    );
  }

  // TODO(hackerwins): implement information(Connections, Storage, Load) of project
  return (
    <>
      <div className={classNames('project_table', { is_active: viewType === 'list' })}>
        <div className="thead">
          <span className="th title">Project title</span>
          <span className="th">Created At</span>
        </div>
        <ul className="tbody_list">
          {projects.map(({ name, createdAt }: Project) => (
            <li key={name} className="tbody_item">
              <Link to={`./${name}`} className="link">
                <span className="td title">{name}</span>
                <span className="td">{moment.unix(createdAt).format('YYYY-MM-DD')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={classNames('card', { is_active: viewType === 'card' })}>
        <ul className="card_list">
          {projects.map(({ name, createdAt }: Project) => (
            <li key={name} className="card_item shadow_xs">
              <Link to={`./${name}`} className="link">
                <div className="title">
                  <strong className="title_text">{name}</strong>
                </div>
                <dl className="info_list">
                  <dt className="info_title">Created At</dt>
                  <dd className="info_desc">{moment.unix(createdAt).format('YYYY-MM-DD')}</dd>
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const SORT_OPTION = {
  alphabet: 'Alphabetical',
  createdAt: 'Date created',
};
// ProjectList represents the list of projects in the application.
export function ProjectList() {
  const dispatch = useAppDispatch();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const { projects: allProjects, status } = useAppSelector(selectProjectList);
  const [query, setQuery] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'list' | 'card'>('card');
  const [sortOpened, setSortOpened] = useState(false);
  const [sortOption, setSortOption] = useState<typeof SORT_OPTION[keyof typeof SORT_OPTION]>(SORT_OPTION.createdAt);

  const handleProjectSort = useCallback((projects, option) => {
    if (option === SORT_OPTION.alphabet) {
      setProjects([...projects].sort((p1, p2) => (p1.name > p2.name ? 1 : -1)));
    } else if (option === SORT_OPTION.createdAt) {
      setProjects([...projects].sort((p1, p2) => p2.createdAt - p1.createdAt));
    }
  }, []);

  const handleChangeQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const results = allProjects.filter((project) => project.name.includes(query ?? ''));
      handleProjectSort(results, sortOption);
      setQuery('');
    },
    [query, allProjects, handleProjectSort, sortOption],
  );

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    handleProjectSort(allProjects, SORT_OPTION.createdAt);
  }, [handleProjectSort, allProjects]);

  useEffect(() => {
    return () => {
      setSortOpened(false);
    };
  }, []);

  return (
    <>
      <div className="project_area">
        <div className="title_group">
          <strong className="title">Projects</strong>
          <Button.Box>
            <Button
              color="toggle"
              isActive={viewType === 'card'}
              blindText
              icon={<Icon type="viewGrid" />}
              onClick={() => {
                setViewType('card');
              }}
            >
              grid layout
            </Button>
            <Button
              color="toggle"
              isActive={viewType === 'list'}
              blindText
              icon={<Icon type="viewList" />}
              onClick={() => {
                setViewType('list');
              }}
            >
              list layout
            </Button>
            <Button as="link" href="/projects/new" className="btn_plus" icon={<Icon type="plus" />}>
              New Project
            </Button>
          </Button.Box>
        </div>
        <div className="search_area">
          <SearchBar
            placeholder={`Search ${query === null ? 'Projects' : projects.length + ' projects'}`}
            autoComplete="off"
            onChange={handleChangeQuery}
            value={query ?? ''}
            onSubmit={handleSearch}
          />
          <div className="filter">
            <ul className="filter_list">
              <li className="filter_item">
                <Popover opened={sortOpened} onChange={setSortOpened}>
                  <Popover.Target>
                    <button type="button" className="btn btn_small filter_desc">
                      <span className="filter_title">Sort:</span>
                      <span className="text">{sortOption}</span>
                      <Icon type="arrow" className="icon_arrow" />
                    </button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Dropdown>
                      <Dropdown.List>
                        <Dropdown.Item
                          onClick={() => {
                            setSortOption(SORT_OPTION.alphabet);
                            handleProjectSort(projects, SORT_OPTION.alphabet);
                            setSortOpened(false);
                          }}
                        >
                          {sortOption === SORT_OPTION.alphabet && <Icon type="check" color="orange_0" />}
                          <Dropdown.Text>{SORT_OPTION.alphabet}</Dropdown.Text>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setSortOption(SORT_OPTION.createdAt);
                            handleProjectSort(projects, SORT_OPTION.createdAt);
                            setSortOpened(false);
                          }}
                        >
                          {sortOption === SORT_OPTION.createdAt && <Icon type="check" color="orange_0" />}
                          <Dropdown.Text>{SORT_OPTION.createdAt}</Dropdown.Text>
                        </Dropdown.Item>
                      </Dropdown.List>
                    </Dropdown>
                  </Popover.Dropdown>
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <ProjectCards projects={projects} totalProjectsCount={allProjects.length} viewType={viewType} />
      )}
    </>
  );
}
