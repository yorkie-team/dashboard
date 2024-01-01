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

import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { RPCStatusCode } from 'api/types';
import { setGlobalError } from 'features/globalError/globalErrorSlice';
import { setIsValidToken } from 'features/users/usersSlice';

export const globalErrorHandler: Middleware = (store: MiddlewareAPI) => (next) => (action) => {
  const result = next(action);

  if (!isRejectedWithValue(action)) return result;
  // skip errors that have already been handled in reducers
  if (action.meta.isHandledError) return result;

  // handle common error
  let { code: statusCode, message: errorMessage } = action.payload.error;
  statusCode = Number(statusCode);

  if (statusCode === RPCStatusCode.UNAUTHENTICATED) {
    store.dispatch(setIsValidToken(false));
    store.dispatch(setGlobalError({ statusCode, errorMessage }));
    return result;
  }
  store.dispatch(setGlobalError({ statusCode, errorMessage }));
  return result;
};
