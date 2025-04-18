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

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { RPCStatusCode } from 'api/types';

export interface GlobalErrorState {
  code: number | null;
  title: string | null;
  message: string | null;
}

const initialState: GlobalErrorState = {
  code: null,
  title: null,
  message: null,
};

export const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<{ statusCode: number | null; errorMessage: string }>) => {
      const { statusCode, errorMessage } = action.payload;
      state.code = statusCode;
      switch (statusCode) {
        case RPCStatusCode.DEADLINE_EXCEEDED:
          state.title = 'Request timed out';
          state.message = 'This request takes too long to process.';
          break;
        case RPCStatusCode.UNAUTHENTICATED:
          state.title = 'Authentication failed';
          state.message = 'You do not have permission to access or your session has timed out. Please sign in.';
          break;
        default:
          state.title = 'Error';
          state.message = errorMessage;
          break;
      }
    },
    resetGlobalError: (state) => {
      state.code = null;
      state.title = null;
      state.message = null;
    },
  },
});

export const { setGlobalError, resetGlobalError } = globalErrorSlice.actions;

export const selectGlobalError = (state: RootState) => state.globalError;

export default globalErrorSlice.reducer;
