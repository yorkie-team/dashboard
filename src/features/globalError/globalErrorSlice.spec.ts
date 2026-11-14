/*
 * Copyright 2026 The Yorkie Authors. All rights reserved.
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


import { describe, expect, it } from 'vitest';
import { RPCStatusCode } from 'api/types';
import reducer, { setGlobalError } from './globalErrorSlice';

const initial = { code: null, title: null, message: null };

describe('globalErrorSlice', () => {
  it('titles a missing item and drops the server code prefix', () => {
    const state = reducer(
      initial,
      setGlobalError({ statusCode: RPCStatusCode.NOT_FOUND, errorMessage: '[not_found] todo: document not found' }),
    );
    expect(state.title).toBe('Not found');
    expect(state.message).toBe('todo: document not found');
  });

  it('keeps a not-found message that has no prefix', () => {
    const state = reducer(
      initial,
      setGlobalError({ statusCode: RPCStatusCode.NOT_FOUND, errorMessage: 'document not found' }),
    );
    expect(state.message).toBe('document not found');
  });

  it('leaves other errors as they were', () => {
    const state = reducer(initial, setGlobalError({ statusCode: null, errorMessage: '[internal] boom' }));
    expect(state.title).toBe('Error');
    expect(state.message).toBe('[internal] boom');
  });
});
