import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { listProjects, ProjectSummary } from '../../api';

export interface ProjectsState {
  projects: Array<ProjectSummary>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
};

export const listProjectsAsync = createAsyncThunk(
  'projects/listDocuments',
  async (): Promise<Array<ProjectSummary>> => {
    const projects = await listProjects();
    return projects;
  },
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listProjectsAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(listProjectsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.projects = action.payload;
    });
    builder.addCase(listProjectsAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectProjects = (state: RootState) => state.projects;

export default projectsSlice.reducer;
