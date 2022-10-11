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

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectList, listProjectsAsync } from './projectsSlice';
import { Project } from 'api/types';

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
  return (
    <ul className="flex flex-wrap">
      {projects.map(({ name, publicKey, createdAt }: Project) => (
        <li key={name} className="mr-4 mb-4 bg-white rounded border border-solid border-gray-200 hover:bg-gray-100">
          <Link to={`./${name}`} className="block p-6">
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 break-words">{name}</h5>
            <div className="flex gap-8">
              <div className="flex flex-col w-28">
                <span className="text-gray-400 text-xs mb-1">Public Key</span>
                <span className="truncate text-sm">{publicKey}</span>
              </div>
              <div className="flex flex-col w-28">
                <span className="text-gray-400 text-xs mb-1">Created At</span>
                <span className="truncate text-sm">{moment.unix(createdAt).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ProjectList represents the list of projects in the application.
export function ProjectList() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const { projects: allProjects, status } = useAppSelector(selectProjectList);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const handleChangeQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setProjects(allProjects.filter((project) => project.name.includes(query)));
    },
    [query, allProjects],
  );

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch]);

  useEffect(() => {
    setProjects(allProjects);
  }, [allProjects]);

  return (
    <>
      <form className="border-b border-solid border-gray-200 mb-6" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            className="text-gray-900 text-sm p-2.5 pl-10 w-full"
            value={query}
            onChange={handleChangeQuery}
            placeholder="Search projects"
          />
          <button type="submit" className="absolute top-0 left-0 flex items-center justify-center w-8 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.3335 2.66659C4.75617 2.66659 2.66683 4.75592 2.66683 7.33325C2.66683 9.91058 4.75617 11.9999 7.3335 11.9999C8.59079 11.9999 9.73196 11.5027 10.5711 10.6942C10.5886 10.6714 10.6079 10.6494 10.6288 10.6285C10.6497 10.6076 10.6716 10.5884 10.6944 10.5708C11.5029 9.73172 12.0002 8.59055 12.0002 7.33325C12.0002 4.75592 9.91083 2.66659 7.3335 2.66659ZM12.0214 11.0784C12.8425 10.0519 13.3335 8.74993 13.3335 7.33325C13.3335 4.01954 10.6472 1.33325 7.3335 1.33325C4.01979 1.33325 1.3335 4.01954 1.3335 7.33325C1.3335 10.647 4.01979 13.3333 7.3335 13.3333C8.75017 13.3333 10.0522 12.8423 11.0786 12.0212L13.5288 14.4713C13.7891 14.7317 14.2112 14.7317 14.4716 14.4713C14.7319 14.211 14.7319 13.7889 14.4716 13.5285L12.0214 11.0784Z"
                fill="#514C49"
              />
            </svg>
          </button>
        </div>
      </form>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && <ProjectCards projects={projects} totalProjectsCount={allProjects.length} />}
    </>
  );
}
