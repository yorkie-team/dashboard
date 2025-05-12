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
import { Schema, createSchema, listSchemas, getSchema, removeSchema } from 'api';
import { RPCStatusCode, RPCError } from 'api/types';

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
  create: {
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: keyof SchemaCreateFields;
      message: string;
    } | null;
    isSuccess: boolean;
  };
}

export type Rule = {
  path: string;
  type: 'string' | 'object' | 'array';
};

export type SchemaCreateFields = {
  projectName: string;
  name: string;
  version: number;
  body: string;
  ruleset: Array<Rule>;
};

const initialState: SchemasState = {
  create: {
    status: 'idle',
    error: null,
    isSuccess: false,
  },
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

export const createSchemaAsync = createAppThunk<Schema, SchemaCreateFields>(
  'schemas/createSchema',
  async (params: SchemaCreateFields): Promise<Schema> => {
    const { projectName, name, version, body, ruleset } = params;
    const schema = await createSchema(projectName, name, version, body, ruleset);
    return schema;
  },
);

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
  async (params: { projectName: string; schemaName: string; schemaVersion: number }): Promise<Schema> => {
    const { projectName, schemaName, schemaVersion } = params;
    return await getSchema(projectName, schemaName, schemaVersion);
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
  reducers: {
    resetCreateSuccess: (state) => {
      state.create.isSuccess = false;
      state.create.error = null;
    },
    resetDetailSuccess: (state) => {
      state.detail.schema = null;
      state.detail.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSchemaAsync.pending, (state) => {
      state.create.status = 'loading';
      state.create.error = null;
    });
    builder.addCase(createSchemaAsync.fulfilled, (state, action) => {
      state.create.status = 'idle';
      state.create.isSuccess = true;
    });
    builder.addCase(createSchemaAsync.rejected, (state, action) => {
      state.create.status = 'failed';
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.ALREADY_EXISTS) {
        state.create.error = {
          target: 'name',
          message: 'The schema name is already in use.',
        };
        action.meta.isHandledError = true;
        return;
      }
    });
    builder.addCase(listSchemasAsync.pending, (state) => {
      state.list.status = 'loading';
    });
    builder.addCase(listSchemasAsync.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.list.schemas = data;
      state.list.status = 'idle';
      state.list.totalCount = data.length;
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

export const { resetCreateSuccess, resetDetailSuccess } = schemaSlice.actions;

export const selectSchemaList = (state: RootState) => state.schemas.list;
export const selectSchemaDetail = (state: RootState) => state.schemas.detail;
export const selectSchemaCreate = (state: RootState) => state.schemas.create;

export default schemaSlice.reducer;
