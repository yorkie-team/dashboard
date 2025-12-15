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

import { createSlice } from '@reduxjs/toolkit';
import { createAppThunk } from 'app/appThunk';
import { RootState } from 'app/store';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  Project,
  UpdatableProjectFields,
  getProjectStats,
  interceptor,
} from 'api';
import {
  RPCStatusCode,
  AuthWebhookMethod,
  EventWebhookEvent,
  RPCError,
  ProjectStats,
  DATE_RANGE_OPTIONS,
} from 'api/types';

export interface ProjectsState {
  list: {
    projects: Array<Project>;
    status: 'idle' | 'loading' | 'failed';
    isInitialized: boolean;
  };
  detail: {
    project: Project | null;
    status: 'idle' | 'loading' | 'failed';
  };
  current: {
    project: Project | null;
    status: 'idle' | 'loading' | 'failed';
  };
  create: {
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: keyof ProjectCreateFields;
      message: string;
    } | null;
    isSuccess: boolean;
  };
  update: {
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: keyof ProjectUpdateFields;
      message: string;
    } | null;
    isSuccess: boolean;
  };
  stats: {
    stats: ProjectStats | null;
    status: 'idle' | 'loading' | 'failed';
  };
}

export type ProjectCreateFields = {
  projectName: string;
};

export type ProjectUpdateFields = {
  name: string;
  authWebhookURL: string;
  authWebhookMethods: Array<AuthWebhookMethod>;
  authWebhookMaxRetries: number;
  authWebhookMinWaitInterval: string;
  authWebhookMaxWaitInterval: string;
  authWebhookRequestTimeout: string;
  eventWebhookURL: string;
  eventWebhookEvents: Array<EventWebhookEvent>;
  eventWebhookMaxRetries: number;
  eventWebhookMinWaitInterval: string;
  eventWebhookMaxWaitInterval: string;
  eventWebhookRequestTimeout: string;
  clientDeactivateThreshold: string;
  snapshotThreshold: number;
  snapshotInterval: number;
  maxSubscribersPerDocument: number;
  maxAttachmentsPerDocument: number;
  maxSizePerDocument: number;
  removeOnDetach: boolean;
  autoRevisionEnabled: boolean;
  allowedOrigins: string;
};

const initialState: ProjectsState = {
  list: {
    projects: [],
    status: 'idle',
    isInitialized: false,
  },
  detail: {
    project: null,
    status: 'idle',
  },
  current: {
    project: null,
    status: 'idle',
  },
  create: {
    status: 'idle',
    error: null,
    isSuccess: false,
  },
  update: {
    status: 'idle',
    error: null,
    isSuccess: false,
  },
  stats: {
    status: 'idle',
    stats: null,
  },
};

export const listProjectsAsync = createAppThunk<Array<Project>, void>(
  'projects/listDocuments',
  async (): Promise<Array<Project>> => {
    const projects = await listProjects();
    return projects;
  },
);

export const getProjectAsync = createAppThunk<Project, string>(
  'projects/getProject',
  async (name): Promise<Project> => {
    const project = await getProject(name);
    return project;
  },
);

export const createProjectAsync = createAppThunk<Project, ProjectCreateFields>(
  'projects/createProject',
  async ({ projectName }) => {
    const project = await createProject(projectName);
    return project;
  },
);

export const updateProjectAsync = createAppThunk<Project, { id: string; fields: UpdatableProjectFields }>(
  'projects/updateProject',
  async ({ id, fields }) => {
    const project = await updateProject(id, fields);
    return project;
  },
);

export const getProjectStatsAsync = createAppThunk<ProjectStats, keyof typeof DATE_RANGE_OPTIONS>(
  'projects/getStats',
  async (dateRange) => {
    return await getProjectStats(dateRange);
  },
);

// Set current project and configure interceptor for project-specific API calls
export const setCurrentProjectAsync = createAppThunk<Project, string>(
  'projects/setCurrentProject',
  async (projectName): Promise<Project> => {
    const project = await getProject(projectName);

    // Set the project secret key for API authentication
    interceptor.setProjectSecretKey(project.secretKey);

    return project;
  },
);

// Clear current project and reset interceptor
export const clearCurrentProject = createAppThunk<void, void>('projects/clearCurrentProject', async () => {
  interceptor.clearProjectSecretKey();
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetCreateSuccess: (state) => {
      state.create.isSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.update.isSuccess = false;
    },
    resetProjectDetail: (state) => {
      state.detail.project = null;
      state.detail.status = 'idle';
    },
    resetProjectsInitialized: (state) => {
      state.list.isInitialized = false;
      state.list.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listProjectsAsync.pending, (state) => {
      state.list.status = 'loading';
    });
    builder.addCase(listProjectsAsync.fulfilled, (state, action) => {
      state.list.status = 'idle';
      state.list.projects = action.payload;
      state.list.isInitialized = true;
    });
    builder.addCase(listProjectsAsync.rejected, (state, action) => {
      state.list.status = 'failed';

      // Don't mark as initialized if it's an authentication error
      // so it can retry after user logs in
      const error = action.payload?.error;
      if (error instanceof RPCError) {
        const statusCode = Number(error.code);
        if (statusCode === RPCStatusCode.UNAUTHENTICATED) {
          // Keep isInitialized as false for auth errors to allow retry after login
          return;
        }
      }

      state.list.isInitialized = true;
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
    builder.addCase(getProjectStatsAsync.pending, (state) => {
      state.stats.status = 'loading';
    });
    builder.addCase(getProjectStatsAsync.fulfilled, (state, action) => {
      state.stats.status = 'idle';
      state.stats.stats = action.payload;
    });
    builder.addCase(getProjectStatsAsync.rejected, (state) => {
      state.stats.status = 'failed';
    });
    builder.addCase(createProjectAsync.pending, (state) => {
      state.create.status = 'loading';
      state.create.error = null;
    });
    builder.addCase(createProjectAsync.fulfilled, (state, action) => {
      state.create.status = 'idle';
      state.create.isSuccess = true;
      state.detail.project = action.payload;
      // Add the new project to the list
      state.list.projects.unshift(action.payload);
    });
    builder.addCase(createProjectAsync.rejected, (state, action) => {
      state.create.status = 'failed';
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.ALREADY_EXISTS) {
        state.create.error = {
          target: 'projectName',
          message: 'The project name is already in use.',
        };
        action.meta.isHandledError = true;
        return;
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        for (const { field, description } of error.details!) {
          if (field === 'Name') {
            state.create.error = {
              target: 'projectName',
              message: description,
            };
          }
        }
        action.meta.isHandledError = true;
        return;
      }
    });
    builder.addCase(updateProjectAsync.pending, (state) => {
      state.update.status = 'loading';
      state.update.error = null;
    });
    builder.addCase(updateProjectAsync.fulfilled, (state, action) => {
      state.update.status = 'idle';
      state.update.isSuccess = true;
      state.detail.project = action.payload;
      // Update the project in the list
      const projectIndex = state.list.projects.findIndex((p) => p.id === action.payload.id);
      if (projectIndex !== -1) {
        state.list.projects[projectIndex] = action.payload;
      }
    });
    builder.addCase(updateProjectAsync.rejected, (state, action) => {
      state.update.status = 'failed';
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.ALREADY_EXISTS) {
        state.update.error = {
          target: 'name',
          message: 'The project name is already in use.',
        };
        action.meta.isHandledError = true;
        return;
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        for (const { field, description } of error.details!) {
          if (field === 'Name') {
            state.update.error = {
              target: 'name',
              message: description,
            };
          } else if (field === 'AuthWebhookURL') {
            state.update.error = {
              target: 'authWebhookURL',
              message: description,
            };
          } else if (field === 'AuthWebhookMethods') {
            state.update.error = {
              target: 'authWebhookMethods',
              message: description,
            };
          } else if (field === 'AuthWebhookMaxRetries') {
            state.update.error = {
              target: 'authWebhookMaxRetries',
              message: description,
            }
          } else if (field === 'AuthWebhookMinWaitInterval') {
            state.update.error = {
              target: 'authWebhookMinWaitInterval',
              message: description,
            }
          } else if (field === 'AuthWebhookMaxWaitInterval') {
            state.update.error = {
              target: 'authWebhookMaxWaitInterval',
              message: description,
            }
          } else if (field === 'AuthWebhookRequestTimeout') {
            state.update.error = {
              target: 'authWebhookRequestTimeout',
              message: description,
            }
          } else if (field === 'EventWebhookURL') {
            state.update.error = {
              target: 'eventWebhookURL',
              message: description,
            };
          } else if (field === 'EventWebhookEvents') {
            state.update.error = {
              target: 'eventWebhookEvents',
              message: description,
            };
          } else if (field === 'EventWebhookMaxRetries') {
            state.update.error = {
              target: 'eventWebhookMaxRetries',
              message: description,
            }
          } else if (field === 'EventWebhookMinWaitInterval') {
            state.update.error = {
              target: 'eventWebhookMinWaitInterval',
              message: description,
            }
          } else if (field === 'EventWebhookMaxWaitInterval') {
            state.update.error = {
              target: 'eventWebhookMaxWaitInterval',
              message: description,
            }
          } else if (field === 'EventWebhookRequestTimeout') {
            state.update.error = {
              target: 'eventWebhookRequestTimeout',
              message: description,
            }
          } else if (field === 'SnapshotThreshold') {
            state.update.error = {
              target: 'snapshotThreshold',
              message: description,
            };
          } else if (field === 'SnapshotInterval') {
            state.update.error = {
              target: 'snapshotInterval',
              message: description,
            };
          } else if (field === 'ClientDeactivateThreshold') {
            state.update.error = {
              target: 'clientDeactivateThreshold',
              message: description,
            };
          } else if (field === 'maxSubscribersPerDocument') {
            state.update.error = {
              target: 'maxSubscribersPerDocument',
              message: description,
            };
          } else if (field === 'maxAttachmentsPerDocument') {
            state.update.error = {
              target: 'maxAttachmentsPerDocument',
              message: description,
            };
          } else if (field === 'maxSizePerDocument') {
            state.update.error = {
              target: 'maxSizePerDocument',
              message: description,
            };
          } else if (field === 'removeOnDetach') {
            state.update.error = {
              target: 'removeOnDetach',
              message: description,
            };
          } else if (field === 'AllowedOrigins') {
            state.update.error = {
              target: 'allowedOrigins',
              message: description,
            };
          }
        }
        action.meta.isHandledError = true;
        return;
      }
    });
    builder.addCase(setCurrentProjectAsync.pending, (state) => {
      state.current.status = 'loading';
    });
    builder.addCase(setCurrentProjectAsync.fulfilled, (state, action) => {
      state.current.status = 'idle';
      state.current.project = action.payload;
    });
    builder.addCase(setCurrentProjectAsync.rejected, (state) => {
      state.current.status = 'failed';
    });
    builder.addCase(clearCurrentProject.fulfilled, (state) => {
      state.current.project = null;
      state.current.status = 'idle';
    });
  },
});

export const { resetCreateSuccess, resetUpdateSuccess, resetProjectDetail, resetProjectsInitialized } =
  projectsSlice.actions;

export const selectProjectList = (state: RootState) => state.projects.list;
export const selectProjectDetail = (state: RootState) => state.projects.detail;
export const selectCurrentProject = (state: RootState) => state.projects.current;
export const selectProjectCreate = (state: RootState) => state.projects.create;
export const selectProjectUpdate = (state: RootState) => state.projects.update;
export const selectProjectStats = (state: RootState) => state.projects.stats;

export default projectsSlice.reducer;
