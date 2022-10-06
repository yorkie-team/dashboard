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

import React, { useEffect } from 'react';
import { NavLink as Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Project } from 'api/types';
import { Popover, Dropdown, Icon } from 'components';
import { selectProjectList, listProjectsAsync } from './projectsSlice';

type ProjectDropdownProps = {
  size?: 'small' | 'large';
};

export function ProjectDropdown({ size = 'small' }: ProjectDropdownProps) {
  const { projectName } = useParams();
  const { projects } = useAppSelector(selectProjectList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch, size]);

  if (!projectName) return null;

  return (
    <>
      <Popover>
        <Popover.Button className={`util_menu user_profile is_active`}>
          <span className="shortcut_text">{projectName}</span>
          <Icon type="openSelector" />
        </Popover.Button>
        <Popover.Dropdown>
          <Dropdown shadow="s">
            <Dropdown.List>
              {projects.map((project: Project) => (
                <Dropdown.Item key={project.id}>
                  <Dropdown.Menu>
                    <span className="shortcut_text">{project.name}</span>
                  </Dropdown.Menu>
                </Dropdown.Item>
              ))}
            </Dropdown.List>
            <Dropdown.List>
              <Dropdown.Item>
                <Dropdown.Menu>
                  <Link to="/projects/new" className="shortcut_text">
                    <Icon type="plus" className="shortcut_thumb" />
                    <span className="shortcut_text">Create new project</span>
                  </Link>
                </Dropdown.Menu>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </Popover.Dropdown>
      </Popover>
    </>
  );
}
