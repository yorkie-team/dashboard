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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { listProjects, getProject, createProject, updateProject, Project, UpdatableProjectFields } from 'api';
import { RPCStatusCode, AuthWebhookMethod } from 'api/types';

export interface ProjectsState {
  list: {
    projects: Array<Project>;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    project: Project | null;
    status: 'idle' | 'loading' | 'failed';
  };
  create: {
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: keyof ProjectCreateFields;
      message: string;
    } | null;
  };
  update: {
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: keyof ProjectUpdateFields;
      message: string;
    } | null;
  };
}

export type ProjectCreateFields = {
  projectName: string;
};

export type ProjectUpdateFields = {
  projectName: string;
  authWebhookURL: string;
  authWebhookMethods: Array<AuthWebhookMethod>;
};

const initialState: ProjectsState = {
  list: {
    projects: [],
    status: 'idle',
  },
  detail: {
    project: null,
    status: 'idle',
  },
  create: {
    status: 'idle',
    error: null,
  },
  update: {
    status: 'idle',
    error: null,
  },
};

export const listProjectsAsync = createAsyncThunk('projects/listDocuments', async (): Promise<Array<Project>> => {
  const projects = await listProjects();
  return projects;
});

export const getProjectAsync = createAsyncThunk('projects/getProject', async (name: string): Promise<Project> => {
  const project = await getProject(name);
  return project;
});

export const createProjectAsync = createAsyncThunk<Project, ProjectCreateFields>(
  'projects/createProject',
  async ({ projectName }) => {
    const project = await createProject(projectName);
    return project;
  },
);

export const updateProjectAsync = createAsyncThunk<
  Project,
  { id: string; fields: UpdatableProjectFields },
  { rejectValue: any }
>('projects/updateProject', async ({ id, fields }, { rejectWithValue }) => {
  try {
    const project = await updateProject(id, fields);
    return project;
  } catch (error) {
    return rejectWithValue({ error });
  }
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listProjectsAsync.pending, (state) => {
      state.list.status = 'loading';
    });
    builder.addCase(listProjectsAsync.fulfilled, (state, action) => {
      state.list.status = 'idle';
      state.list.projects = action.payload;
    });
    builder.addCase(listProjectsAsync.rejected, (state) => {
      state.list.status = 'failed';
    });
    builder.addCase(getProjectAsync.pending, (state) => {
      state.detail.status = 'loading';
    });
    builder.addCase(getProjectAsync.fulfilled, (state, action) => {
      state.detail.status = 'idle';
      state.detail.project = action.payload;
    });
    builder.addCase(getProjectAsync.rejected, (state) => {
      state.detail.status = 'failed';
    });
    builder.addCase(createProjectAsync.pending, (state) => {
      state.create.status = 'loading';
      state.create.error = null;
    });
    builder.addCase(createProjectAsync.fulfilled, (state, action) => {
      state.create.status = 'idle';
      state.detail.project = action.payload;
    });
    builder.addCase(createProjectAsync.rejected, (state, action) => {
      state.create.status = 'failed';
      const errorCode = Number(action.error.code);
      if (errorCode === RPCStatusCode.ALREADY_EXISTS) {
        state.create.error = {
          target: 'projectName',
          message: 'The project name is already in use. Please try again.',
        };
      }
    });
    builder.addCase(updateProjectAsync.pending, (state) => {
      state.update.status = 'loading';
      state.update.error = null;
    });
    builder.addCase(updateProjectAsync.fulfilled, (state, action) => {
      state.update.status = 'idle';
      state.detail.project = action.payload;
    });
    builder.addCase(updateProjectAsync.rejected, (state, action) => {
      state.update.status = 'failed';

      const statusCode = Number(action.payload.error.code);
      if (statusCode === RPCStatusCode.ALREADY_EXISTS) {
        state.update.error = {
          target: 'projectName',
          message: 'The project name is already in use. Please try again.',
        };
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        const errorDetails = action.payload.error.details;
        for (const { field, description } of errorDetails) {
          if (field === 'Name') {
            state.update.error = {
              target: 'projectName',
              message: description,
            };
          } else if (field === 'AuthWebhookURL') {
            state.update.error = {
              target: 'authWebhookURL',
              message: description,
            };
          }
        }
      }
    });
  },
});

export const selectProjectList = (state: RootState) => state.projects.list;
export const selectProjectDetail = (state: RootState) => state.projects.detail;
export const selectProjectCreate = (state: RootState) => state.projects.create;
export const selectProjectUpdate = (state: RootState) => state.projects.update;

export default projectsSlice.reducer;
