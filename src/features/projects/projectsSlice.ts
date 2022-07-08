import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { listProjects, getProject, updateProject, Project, UpdatableProjectFields } from 'api';

export interface ProjectsState {
  list: {
    projects: Array<Project>;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    project: Project | null;
    status: 'idle' | 'loading' | 'failed';
    updateStatus: 'idle' | 'loading' | 'failed';
  };
}

const initialState: ProjectsState = {
  list: {
    projects: [],
    status: 'idle',
  },
  detail: {
    project: null,
    status: 'idle',
    updateStatus: 'idle',
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

export const updateProjectAsync = createAsyncThunk(
  'projects/updateProject',
  async ({id, fields}:{id: string, fields: UpdatableProjectFields},{rejectWithValue}:{rejectWithValue: any}): Promise<Project> => {
    try {
      const project = await updateProject(id, fields);
      return project;
    } catch (error) {
      return rejectWithValue(error)
    }
  },
);

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
    builder.addCase(updateProjectAsync.pending, (state) => {
      state.detail.updateStatus = 'loading';
    });
    builder.addCase(updateProjectAsync.fulfilled, (state, action) => {
      state.detail.updateStatus = 'idle';
      state.detail.project = action.payload;
    });
    builder.addCase(updateProjectAsync.rejected, (state) => {
      state.detail.updateStatus = 'failed';
    });
  },
});

export const selectProjectList = (state: RootState) => state.projects.list;
export const selectProjectDetail = (state: RootState) => state.projects.detail;

export default projectsSlice.reducer;
