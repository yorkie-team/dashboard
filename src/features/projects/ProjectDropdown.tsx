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
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Project } from 'api/types';
import { Icon } from 'components';
import { selectProjectList, listProjectsAsync } from './projectsSlice';
import { Button, Popover, Box, Flex, Text, Menu, Link } from 'yorkie-ui';

export function ProjectDropdown({ size = 'small', icon = false }: { size?: 'small' | 'large'; icon?: boolean }) {
  const { projectName } = useParams();
  const { projects } = useAppSelector(selectProjectList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch]);

  if (!projectName) return null;

  // TODO(hackerwins): remove breadcrumb_thumb class after refactoring.
  if (size === 'small') {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <Button size="sm" height="fit" variant="subtle">
            {projectName}
          </Button>
          {icon && <Icon type="openSelector" className="title_icon" />}
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Description>
              {projects.map((project: Project) => (
                <Box width="100w" key={project.id}>
                  <Button
                    display="ruby"
                    variant="ghost"
                    wLink="100w"
                    width="100w"
                    as="link"
                    href={`/dashboard/projects/${project.name}`}
                  >
                    {project.name}
                  </Button>
                </Box>
              ))}
            </Popover.Description>
            <Menu.Separator />
            <Popover.Title paddingTop="2">
              <Link href="/dashboard/projects/new" display="flex">
                <Icon type="plus" />
                <Text fontSize="sm">Create new project</Text>
              </Link>
            </Popover.Title>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    );
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex alignItems="center">
          <Button variant="subtle" fontSize="3xl">
            {projectName}
          </Button>
          {icon && <Icon type="openSelector" className="title_icon" />}
        </Flex>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title paddingBottom="2">
            <Link href="../projects/new" display="flex">
              <Icon type="plus" />
              <Text fontSize="sm">Create new project</Text>
            </Link>
          </Popover.Title>
          <Menu.Separator />
          <Popover.Description>
            {projects.map((project: Project) => (
              <Box width="100w" key={project.id}>
                <Button
                  display="ruby"
                  variant="ghost"
                  wLink="100w"
                  width="100w"
                  as="link"
                  href={`../projects/${project.name}`}
                >
                  {project.name}
                </Button>
              </Box>
            ))}
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
