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
import { fromUnixTime, format } from 'date-fns';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectList, listProjectsAsync } from './projectsSlice';
import { Project } from 'api/types';
import { Icon, SearchBar } from 'components';
import { Button, Heading, Flex, Box, Link, Text, Grid, Menu } from 'yorkie-ui';

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
  const viewsType = viewType === 'card';
  if (totalProjectsCount === 0) {
    return (
      <Link
        href={'projects/new'}
        paddingBlock="10"
        width="100w"
        borderWidth="xs"
        borderRadius="xl"
        borderStyle="dashed"
        background="gray.2"
      >
        <Flex alignItems="center" flexDirection="column" justifyContent="center" width="100w" lineHeight="normal">
          <Text fontSize="lg">Get started by</Text>
          <Text fontSize="lg" color="orange.text">
            creating a new project
          </Text>
        </Flex>
      </Link>
    );
  }
  if (projects.length === 0) {
    return (
      <Box paddingBlock="10" width="100w" borderWidth="xs" borderRadius="xl" borderStyle="dashed" background="gray.2">
        <Text align="center" fontSize="xl" fontWeight="semibold" color="neutral.12">
          No matching result
        </Text>
      </Box>
    );
  }

  // TODO(hackerwins): implement information(Connections, Storage, Load) of project
  return (
    <Flex flexDirection={viewsType ? 'row' : 'column'}>
      {viewType === 'list' && (
        <Flex justifyContent="space-between" marginBottom="8">
          <span className="th title">Project title</span>
          <span className="th">Created At</span>
        </Flex>
      )}
      <Grid gridTemplateColumns={viewsType ? { base: '1', lg: '3' } : { lg: '1' }} width="100w" gap="6">
        {projects.map(({ name, createdAt }: Project) => (
          <Flex position="relative" key={name}>
            <Link
              padding={viewsType ? '10' : '4'}
              width="100w"
              display={{ base: 'block', lg: 'flex' }}
              borderRadius="xl"
              borderWidth={viewsType ? '1px' : '0'}
              alignItems="center"
              target="_blank"
              rel="noreferrer"
              href={`projects/${name}`}
            >
              <Box
                position="relative"
                zIndex="xs"
                display="flex"
                flexDirection={viewsType ? 'column' : 'row'}
                justifyContent="space-between"
                width="100w"
              >
                <Text fontWeight="semibold" fontSize="lg">
                  {name}
                </Text>
                <Box>
                  <Text
                    color="gray.a9"
                    fontSize="sm"
                    marginBottom={viewsType ? '2' : '0'}
                    marginTop={viewsType ? '10' : '0'}
                    display={viewsType ? 'block' : 'none'}
                  >
                    Created At
                  </Text>
                  <Text color="gray.a12" fontSize="sm" fontWeight="semibold">
                    {format(fromUnixTime(createdAt), 'yyyy-MM-dd')}
                  </Text>
                </Box>
              </Box>
            </Link>
          </Flex>
        ))}
      </Grid>
    </Flex>
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
  const [sortOption, setSortOption] = useState<(typeof SORT_OPTION)[keyof typeof SORT_OPTION]>(SORT_OPTION.createdAt);

  const handleProjectSort = useCallback((projects: Array<Project>, option: string) => {
    if (option === SORT_OPTION.alphabet) {
      setProjects([...projects].sort((p1, p2) => (p1.name > p2.name ? 1 : -1)));
    } else if (option === SORT_OPTION.createdAt) {
      setProjects([...projects].sort((p1, p2) => p2.createdAt - p1.createdAt));
    }
  }, []);

  const handleChangeQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <>
      <Flex display={{ base: 'block', lg: 'flex' }} marginTop="16" justifyContent="space-between">
        <Heading as="h2" fontSize="3xl">
          Project
        </Heading>
        <Flex marginTop={{ base: '6', lg: '0' }} alignItems="center">
          <Button
            variant={viewType === 'card' ? 'outline' : 'ghost'}
            size="xs"
            color="gray.a8"
            onClick={() => {
              setViewType('card');
            }}
          >
            <Icon type="viewGrid" />
          </Button>
          <Button
            size="xs"
            color="gray.a8"
            variant={viewType === 'list' ? 'outline' : 'ghost'}
            onClick={() => {
              setViewType('list');
            }}
          >
            <Icon type="viewList" />
          </Button>
          <Button as="link" href="projects/new" background="orange.dark.a10" icon={<Icon type="plus" />} marginLeft="4">
            New Project
          </Button>
        </Flex>
      </Flex>
      <Box marginBlock="10" position="relative">
        <SearchBar
          placeholder={`Search ${query === null ? 'Projects' : projects.length + ' projects'}`}
          autoComplete="off"
          onChange={handleChangeQuery}
          value={query ?? ''}
          onSubmit={handleSearch}
        />
        <Box
          position={{ base: 'relative', lg: 'absolute' }}
          right="0"
          bottom="0"
          paddingBottom="1"
          marginBlock={{ base: '4', lg: 'auto' }}
        >
          <Menu.Root>
            <Menu.Trigger>
              <Flex cursor="pointer" alignItems="center">
                <Text color="black.a7" fontSize="md" marginRight="4">
                  Sort:
                </Text>
                <Text marginRight="2" fontSize="md">
                  {sortOption}
                </Text>
                <Icon type="arrow" />
              </Flex>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  id="search"
                  onClick={() => {
                    setSortOption(SORT_OPTION.alphabet);
                    handleProjectSort(projects, SORT_OPTION.alphabet);
                  }}
                >
                  <Box visibility={sortOption === SORT_OPTION.alphabet ? 'visible' : 'hidden'}>
                    <Icon type="check" color="orange_0" />
                  </Box>
                  <Text marginLeft="2">{SORT_OPTION.alphabet}</Text>
                </Menu.Item>
                <Menu.Item
                  id="undo"
                  onClick={() => {
                    setSortOption(SORT_OPTION.createdAt);
                    handleProjectSort(projects, SORT_OPTION.createdAt);
                  }}
                >
                  <Box visibility={sortOption === SORT_OPTION.createdAt ? 'visible' : 'hidden'}>
                    <Icon type="check" color="orange_0" />
                  </Box>
                  <Text marginLeft="2">{SORT_OPTION.createdAt}</Text>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Box>
      </Box>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <ProjectCards projects={projects} totalProjectsCount={allProjects.length} viewType={viewType} />
      )}
    </>
  );
}
