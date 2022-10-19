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

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Project } from 'api/types';
import { Popover, Dropdown, Icon, Breadcrumb } from 'components';
import { selectProjectList, listProjectsAsync } from './projectsSlice';

export function ProjectDropdown({ size = 'small' }: { size?: 'small' | 'large' }) {
  const { projectName } = useParams();
  const { projects } = useAppSelector(selectProjectList);
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch, size]);

  useEffect(() => {
    return () => {
      setOpened(false);
    };
  }, []);

  if (!projectName) return null;

  if (size === 'small') {
    return (
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Breadcrumb.Item
            onClick={() => {
              setOpened((opened) => !opened);
            }}
          >
            <Breadcrumb.Text>{projectName}</Breadcrumb.Text>
            <Icon type="openSelector" />
          </Breadcrumb.Item>
        </Popover.Target>
        <Popover.Dropdown>
          <Dropdown shadow="s">
            <Dropdown.List>
              {projects.map((project: Project) => (
                <Dropdown.Item
                  key={project.id}
                  to={`/projects/${project.name}`}
                  onClick={() => {
                    setOpened(false);
                  }}
                >
                  <Breadcrumb.Text>{project.name}</Breadcrumb.Text>
                </Dropdown.Item>
              ))}
            </Dropdown.List>
            <Dropdown.List>
              <Dropdown.Item to="/projects/new">
                <Icon type="plus" className="shortcut_thumb" />
                <Breadcrumb.Text>Create New Project</Breadcrumb.Text>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </Popover.Dropdown>
      </Popover>
    );
  }

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <button
          type="button"
          className="btn_title"
          onClick={() => {
            setOpened((opened) => !opened);
          }}
        >
          <strong className="title">{projectName}</strong>
          <Icon type="openSelector" className="title_icon" />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Dropdown shadow="s">
          <Dropdown.Title>
            <Link to="/projects/new" className="btn">
              <Icon type="plus" />
              <span className="text">Create new project</span>
            </Link>
          </Dropdown.Title>
          <Dropdown.List>
            {projects.map((project: Project) => (
              <Dropdown.Item
                key={project.id}
                to={`/projects/${project.name}`}
                onClick={() => {
                  setOpened(false);
                }}
              >
                <Breadcrumb.Text>{project.name}</Breadcrumb.Text>
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        </Dropdown>
      </Popover.Dropdown>
    </Popover>
  );
}
