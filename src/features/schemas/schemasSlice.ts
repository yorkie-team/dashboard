/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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
import { listSchemas, getSchema, removeSchema, Schema } from 'api';

export interface SchemasState {
  list: {
    totalCount: number | null;
    schemas: Array<Schema>;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    schema: Schema | null;
    status: 'idle' | 'loading' | 'failed';
  };
}

const initialState: SchemasState = {
  list: {
    totalCount: null,
    schemas: [],
    status: 'idle',
  },
  detail: {
    schema: null,
    status: 'idle',
  },
};

export const listSchemasAsync = createAppThunk(
  'schemas/listSchemas',
  async (params: {
    projectName: string;
  }): Promise<{
    data: Array<Schema>;
  }> => {
    const { projectName } = params;
    const schemas = await listSchemas(projectName);

    return { data: schemas };
  },
);

export const getSchemaAsync = createAppThunk(
  'schemas/getSchema',
  async (params: { projectName: string; schemaName: string; version: number }): Promise<Schema> => {
    const { projectName, schemaName, version } = params;
    return await getSchema(projectName, schemaName, version);
  },
);

export const removeSchemaAsync = createAppThunk(
  'schemas/removeSchema',
  async (params: { projectName: string; schemaName: string; version: number }): Promise<void> => {
    const { projectName, schemaName, version } = params;
    await removeSchema(projectName, schemaName, version);
  },
);

export const schemaSlice = createSlice({
  name: 'schemas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listSchemasAsync.pending, (state) => {
      state.list.status = 'loading';
    });
    builder.addCase(listSchemasAsync.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.list.status = 'idle';
      state.list.totalCount = null;
    });
    builder.addCase(listSchemasAsync.rejected, (state) => {
      state.list.status = 'failed';
    });
    builder.addCase(getSchemaAsync.pending, (state) => {
      state.detail.status = 'loading';
    });
    builder.addCase(getSchemaAsync.fulfilled, (state, action) => {
      state.detail.status = 'idle';
      state.detail.schema = action.payload;
    });
    builder.addCase(getSchemaAsync.rejected, (state) => {
      state.detail.status = 'failed';
    });
  },
});

export const selectSchemaList = (state: RootState) => state.schemas.list;
export const selectSchemaDetail = (state: RootState) => state.schemas.detail;

export default schemaSlice.reducer;
