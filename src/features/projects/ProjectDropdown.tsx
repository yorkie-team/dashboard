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

import React, { useEffect, useRef, useState } from 'react';
import { NavLink as Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Project } from 'api/types';
import { selectProjectList, listProjectsAsync } from './projectsSlice';
import { useOutsideClick } from 'hooks';

type ProjectDropdownProps = {
  size?: 'small' | 'large';
};

export function ProjectDropdown({ size = 'small' }: ProjectDropdownProps) {
  const { projectName } = useParams();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { projects } = useAppSelector(selectProjectList);
  const dispatch = useAppDispatch();

  useOutsideClick(
    dropdownRef,
    () => {
      if (isDropdownOpen) setIsDropdownOpen(false);
    },
    dropdownButtonRef,
  );

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch, size]);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [projectName]);

  if (!projectName) return null;
  return (
    <div className="relative">
      <button
        type="button"
        ref={dropdownButtonRef}
        className={`inline-flex items-center justify-center ${size === 'large' ? 'text-lg font-semibold' : 'mx-3'}`}
        onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
      >
        {projectName}
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 left-0 bg-white rounded drop-shadow-lg py-1 min-w-[12rem] border border-solid border-gray-200 ${
            size === 'large' ? 'top-10' : 'top-6 '
          }`}
          style={{ width: `${size === 'large' ? '640px' : ''}` }}
        >
          <ul className={`py-1 text-sm text-gray-700 overflow-y-auto ${size === 'large' ? 'max-h-52' : 'max-h-40'}`}>
            {projects.map((project: Project) => (
              <li key={project.id}>
                <Link
                  to={`/projects/${project.name}`}
                  className={`block w-full py-2 px-4 hover:bg-gray-100 text-left ${
                    size === 'large' ? 'text-lg font-semibold' : ''
                  }`}
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-solid border-gray-200 py-1">
            <Link
              to={`/projects/new`}
              className="w-full py-2 px-4 hover:bg-gray-100 text-left text-sm flex items-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.99935 2.6665C8.36754 2.6665 8.66602 2.96498 8.66602 3.33317V7.33317H12.666C13.0342 7.33317 13.3327 7.63165 13.3327 7.99984C13.3327 8.36803 13.0342 8.6665 12.666 8.6665H8.66602V12.6665C8.66602 13.0347 8.36754 13.3332 7.99935 13.3332C7.63116 13.3332 7.33268 13.0347 7.33268 12.6665V8.6665H3.33268C2.96449 8.6665 2.66602 8.36803 2.66602 7.99984C2.66602 7.63165 2.96449 7.33317 3.33268 7.33317H7.33268V3.33317C7.33268 2.96498 7.63116 2.6665 7.99935 2.6665Z"
                  fill="#514C49"
                />
              </svg>
              Create new project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
