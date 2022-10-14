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

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectList, listProjectsAsync } from './projectsSlice';
import { Project } from 'api/types';
import { Button, Icon, InputTextField } from 'components';

// TODO(chacha912): Extract to Cards component
function ProjectCards({ projects, totalProjectsCount }: {
  projects: Array<Project>;
  totalProjectsCount: number;
}) {
  if (totalProjectsCount === 0) {
    return (
      <Link
        to={'/projects/new'}
        className="flex flex-col items-center justify-center w-full h-44 bg-gray-50 text-lg leading-7 font-medium border-dashed border-2 border-gray-300 rounded"
      >
        Get started by
        <span className="text-sky-500">creating a new project</span>
      </Link>
    );
  }
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-44 bg-gray-50 text-lg leading-7 font-medium">
        No matching result
      </div>
    );
  }

  // TODO(hackerwins): implement information(Connections, Storage, Load) of project
  return (
    <div className="card">
      <ul className="card_list">
        {projects.map(({ name, publicKey, createdAt }: Project) => (
          <li key={name} className="card_item shadow_xs is_large">
            <Link to={`./${name}`} className="link">
              <div className="title">
                <span className="title_thumbnail emoji">
                  <img src="../assets/images/@tmp/sample_project.png" alt="" />
                </span>
                <strong className="title_text">{name}</strong>
              </div>
              <dl className="info_list">
                <dt className="info_title">Connections</dt>
                <dd className="info_desc">4,645 peak</dd>
                <dt className="info_title">Storage</dt>
                <dd className="info_desc">8.2 GB</dd>
                <dt className="info_title">Load</dt>
                <dd className="info_desc">45% peak</dd>
              </dl>
            </Link>
            <Button icon={<Icon type="star" />} className="btn_favorite_full" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ProjectList represents the list of projects in the application.
export function ProjectList() {
  const dispatch = useAppDispatch();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const { projects: allProjects, status } = useAppSelector(selectProjectList);
  const [query, setQuery] = useState('');

  const handleChangeQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setProjects(allProjects.filter((project) => project.name.includes(query)));
  }, [query, allProjects]);

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    setProjects(allProjects);
  }, [allProjects]);

  // TODO(hackerwins): Add Search Icon
  // NOTE(hackerwins): Remove style(marginTop) after implementing team feature.
  return (
    <>
      <div className="project_area">
        <form className="border-b border-solid border-gray-200 mb-6" onSubmit={handleSearch}>
          <div className="title_group">
            <strong className="title">Projects</strong>
            <Button.Box>
              <Button color="toggle" isActive blindText icon={<Icon type="viewGrid" />}>grid layout</Button>
              <Button color="toggle" blindText icon={<Icon type="viewList" />}>list layout</Button>
              <Button as="link" href="./new" className="btn btn_plus" icon={<Icon type="plus" />}>New Project</Button>
            </Button.Box>
          </div>
          <div className="search">
            <InputTextField
              id="input10"
              placeholder="Search Projects"
              autoComplete="off"
              label=""
              blindLabel
              onChange={handleChangeQuery}
            />
          </div>
        </form>
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && <ProjectCards projects={projects} totalProjectsCount={allProjects.length} />}
    </>
  );
}
