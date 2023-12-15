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

import type { Action, PayloadAction, SerializedError, MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { RPCStatusCode, APIErrorName } from 'api/types';
import { setGlobalError } from 'features/globalError/globalErrorSlice';
import { loginUser, signupUser, setIsValidToken } from 'features/users/usersSlice';
import { createProjectAsync, updateProjectAsync } from 'features/projects/projectsSlice';

type RejectedAction = PayloadAction<
  {
    code: number;
    message: string;
  },
  string,
  {
    arg: any;
    requestId: string;
    aborted: boolean;
    condition: boolean;
  },
  SerializedError
>;

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

function isHandledError(actionType: any, statusCode: RPCStatusCode): boolean {
  if (
    actionType === loginUser.rejected.type &&
    (statusCode === RPCStatusCode.NOT_FOUND || statusCode === RPCStatusCode.UNAUTHENTICATED)
  ) {
    return true;
  }

  if (
    actionType === signupUser.rejected.type &&
    (statusCode === RPCStatusCode.INTERNAL || statusCode === RPCStatusCode.INVALID_ARGUMENT)
  ) {
    return true;
  }

  if (
    actionType === createProjectAsync.rejected.type &&
    (statusCode === RPCStatusCode.ALREADY_EXISTS || statusCode === RPCStatusCode.INVALID_ARGUMENT)
  ) {
    return true;
  }

  if (
    actionType === updateProjectAsync.rejected.type &&
    (statusCode === RPCStatusCode.ALREADY_EXISTS || statusCode === RPCStatusCode.INVALID_ARGUMENT)
  ) {
    return true;
  }

  return false;
}

export const globalErrorHandler: Middleware = (store: MiddlewareAPI) => (next) => (action) => {
  next(action);
  if (!isRejectedAction(action) && !isRejectedWithValue(action)) return;

  let { code: statusCode, message: errorMessage, name: errorName } = action.error;
  if (isRejectedWithValue(action)) {
    statusCode = action.payload.error.code;
    errorMessage = action.payload.error.message;
    errorName = action.payload.error.name;
  }
  statusCode = Number(statusCode);
  const apiErrorName: APIErrorName = 'ConnectError';
  if (errorName !== apiErrorName) {
    throw action.error;
  }
  if (isHandledError(action.type, statusCode)) return;
  if (statusCode === RPCStatusCode.UNAUTHENTICATED) {
    store.dispatch(setIsValidToken(false));
    return;
  }
  store.dispatch(setGlobalError({ statusCode, errorMessage }));
};
