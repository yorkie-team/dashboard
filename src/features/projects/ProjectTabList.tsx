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

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProjectAsync, setCurrentProjectAsync, selectCurrentProject, selectProjectDetail } from './projectsSlice';
import { Icon, TabList } from 'components';

export function ProjectTabList() {
  let { projectName } = useParams();
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(selectCurrentProject);
  const projectDetail = useAppSelector(selectProjectDetail);

  useEffect(() => {
    if (!projectName) {
      return;
    }

    // Only set current project if it's different from the current one and not loading
    if (currentProject.project?.name !== projectName && currentProject.status === 'idle') {
      dispatch(setCurrentProjectAsync(projectName)).then(() => {
        // Only get project details if we don't have them and not loading
        if (projectDetail.project?.name !== projectName && projectDetail.status === 'idle') {
          dispatch(getProjectAsync(projectName));
        }
      });
    } else if (projectDetail.project?.name !== projectName && projectDetail.status === 'idle') {
      // If current project is already set, just get details if needed
      dispatch(getProjectAsync(projectName));
    }
  }, [
    dispatch,
    projectName,
    currentProject.project?.name,
    currentProject.status,
    projectDetail.project?.name,
    projectDetail.status,
  ]);

  return (
    <TabList>
      <TabList.Item to={`/projects/${projectName}`} end>
        <Icon type="chart" />
        <TabList.Text>Overview</TabList.Text>
      </TabList.Item>
      <TabList.Item to={`/projects/${projectName}/quickstart`}>
        <Icon type="lightning" />
        <TabList.Text>Quick Start</TabList.Text>
      </TabList.Item>
      <TabList.Item to={`/projects/${projectName}/documents`}>
        <Icon type="keynote" />
        <TabList.Text>Documents</TabList.Text>
      </TabList.Item>
      <TabList.Item to={`/projects/${projectName}/schemas`}>
        <Icon type="viewList" />
        <TabList.Text>Schemas</TabList.Text>
      </TabList.Item>
      <TabList.Item to={`/projects/${projectName}/apikeys`}>
        <Icon type="key" />
        <TabList.Text>API Keys</TabList.Text>
      </TabList.Item>
      <TabList.Item to={`/projects/${projectName}/settings`}>
        <Icon type="setting" />
        <TabList.Text>Settings</TabList.Text>
      </TabList.Item>
    </TabList>
  );
}
