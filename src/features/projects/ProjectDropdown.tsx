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
import { AddIcon, ArrowUpDownIcon } from 'components';

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
    <div className="shortcut_inner title_group">
      <button
        type="button"
        ref={dropdownButtonRef}
        className={`${
          size === 'large' ? 'inline-flex items-center justify-center text-lg font-semibold btn_title' : 'shortcut_item'
        }
        ${isDropdownOpen ? 'is_active' : ''}
        `}
        onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
      >
        <span className="shortcut_text">{projectName}</span>
        <span className="icon">
          <ArrowUpDownIcon />
        </span>
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown shadow_s ${
          size === 'large'
            ? 'absolute z-10 left-0 bg-white rounded drop-shadow-lg py-1 min-w-[12rem] border border-solid border-gray-200 top-10'
            : ''
        }`}
        style={{ width: `${size === 'large' ? '640px' : ''}` }}
      >
        <ul
          className={`dropdown_list ${size === 'large' ? 'py-1 text-sm text-gray-700 overflow-y-auto max-h-52' : ''}`}
        >
          {projects.map((project: Project) => (
            <li key={project.id} className="dropdown_item">
              <Link
                to={`/projects/${project.name}`}
                className={`${
                  size === 'large'
                    ? 'block w-full py-2 px-4 hover:bg-gray-100 text-left text-lg font-semibold'
                    : 'dropdown_menu'
                } ${project.name === projectName ? 'is_active' : ''}`}
              >
                <span className="shortcut_text">{project.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="dropdown_list">
          <li className="dropdown_item">
            <Link to={`/projects/new`} className="dropdown_menu">
              <span className="shortcut_thumb">
                <AddIcon />
              </span>
              <span className="shortcut_text">Create new project</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
