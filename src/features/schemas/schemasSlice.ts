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
import { Schema, createSchema, listSchemas, getSchemas, removeSchema } from 'api';
import { RPCStatusCode, RPCError } from 'api/types';
import { Rule } from '@yorkie-js/schema';

export interface SchemasState {
  list: {
    totalCount: number | null;
    schemas: Array<Schema>;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    schemas: Array<Schema>;
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

export type SchemaCreateFields = {
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
    schemas: [],
    status: 'idle',
  },
};

export const createSchemaAsync = createAppThunk<Schema, SchemaCreateFields>(
  'schemas/createSchema',
  async (params: SchemaCreateFields): Promise<Schema> => {
    const { name, version, body, ruleset } = params;
    const schema = await createSchema(name, version, body, ruleset);
    return schema;
  },
);

export const listSchemasAsync = createAppThunk<
  {
    data: Array<Schema>;
  },
  void
>(
  'schemas/listSchemas',
  async (): Promise<{
    data: Array<Schema>;
  }> => {
    const schemas = await listSchemas();
    return { data: schemas };
  },
);

export const getSchemasAsync = createAppThunk(
  'schemas/getSchemas',
  async (params: {
    schemaName: string;
  }): Promise<{
    data: Array<Schema>;
  }> => {
    const { schemaName } = params;
    const schemas = await getSchemas(schemaName);
    return { data: schemas };
  },
);

export const removeSchemaAsync = createAppThunk(
  'schemas/removeSchema',
  async (params: { schemaName: string; version: number }): Promise<void> => {
    const { schemaName, version } = params;
    await removeSchema(schemaName, version);
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
      state.detail.schemas = [];
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
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        for (const { field, description } of error.details!) {
          if (field === 'Name') {
            state.create.error = {
              target: 'name',
              message: description,
            };
          }
        }
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
    builder.addCase(getSchemasAsync.pending, (state) => {
      state.detail.status = 'loading';
    });
    builder.addCase(getSchemasAsync.fulfilled, (state, action) => {
      state.detail.status = 'idle';
      state.detail.schemas = action.payload.data;
    });
    builder.addCase(getSchemasAsync.rejected, (state) => {
      state.detail.status = 'failed';
    });
  },
});

export const { resetCreateSuccess, resetDetailSuccess } = schemaSlice.actions;

export const selectSchemaList = (state: RootState) => state.schemas.list;
export const selectSchemaDetail = (state: RootState) => state.schemas.detail;
export const selectSchemaCreate = (state: RootState) => state.schemas.create;

export default schemaSlice.reducer;
