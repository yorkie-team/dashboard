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

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer, projectsReducer, documentsReducer, schemasReducer, globalErrorReducer } from 'features';
import { globalErrorHandler } from './middleware';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    documents: documentsReducer,
    schemas: schemasReducer,
    globalError: globalErrorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.error'],
      },
    }).concat(globalErrorHandler),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
