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

import { describe, it, expect } from 'vitest';
import { FieldViolation, RPCError, RPCStatusCode } from 'api/types';
import projectsReducer, { updateProjectAsync } from './projectsSlice';

const rejectUpdate = (code: RPCStatusCode, details: Array<FieldViolation> = []) => {
  const error = new RPCError(String(code), 'rejected', details);
  const action = updateProjectAsync.rejected(
    null,
    'request-id',
    { id: 'project-id', fields: { maxSizePerDocument: 1 } },
    { error },
    { isHandledError: false },
  );
  const state = projectsReducer(undefined, action);
  return { error: state.update.error, isHandledError: action.meta.isHandledError };
};

describe('updateProjectAsync.rejected', () => {
  it('maps a server field violation onto its form field', () => {
    // The server names fields after its Go struct fields.
    const result = rejectUpdate(RPCStatusCode.INVALID_ARGUMENT, [
      { field: 'MaxSizePerDocument', description: 'too large' },
    ]);

    expect(result.error).toEqual({ target: 'maxSizePerDocument', message: 'too large' });
    expect(result.isHandledError).toBe(true);
  });

  it('leaves an invalid argument without a known field to the global error modal', () => {
    // e.g. a value the server cannot decode, which comes back without field details.
    const result = rejectUpdate(RPCStatusCode.INVALID_ARGUMENT);

    expect(result.error).toBeNull();
    expect(result.isHandledError).toBe(false);
  });

  it('maps a duplicated project name onto the name field', () => {
    const result = rejectUpdate(RPCStatusCode.ALREADY_EXISTS);

    expect(result.error).toEqual({ target: 'name', message: 'The project name is already in use.' });
    expect(result.isHandledError).toBe(true);
  });
});
