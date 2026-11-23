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

import { describe, it, expect, vi } from 'vitest';
import { RPCError, RPCStatusCode } from 'api/types';
import usersReducer, { deleteUser } from './usersSlice';

// The slice reads the saved theme from localStorage when it builds its
// initial state, and tests run in node, which has none.
vi.hoisted(() => {
  vi.stubGlobal('localStorage', { getItem: () => null });
});

const rejectDelete = (error: Error) => {
  const action = deleteUser.rejected(
    null,
    'request-id',
    { username: 'alice', password: 'password' },
    { error },
    { isHandledError: false },
  );
  const state = usersReducer(undefined, action);
  return { error: state.deleteAccount.error, isHandledError: action.meta.isHandledError };
};

describe('deleteUser.rejected', () => {
  it('explains why an account that owns projects cannot be deleted', () => {
    const result = rejectDelete(
      new RPCError(String(RPCStatusCode.FAILED_PRECONDITION), 'rejected', [], 'ErrOwnedProjectExists'),
    );

    expect(result.error?.message).toMatch(/owns projects/);
    expect(result.isHandledError).toBe(true);
  });

  it('asks to check the password when the server rejects it', () => {
    const result = rejectDelete(new RPCError(String(RPCStatusCode.UNAUTHENTICATED), 'rejected'));

    expect(result.error).toEqual({ message: 'Please verify your account information and try again.' });
    expect(result.isHandledError).toBe(true);
  });

  it('leaves another failed precondition to the global error modal', () => {
    const result = rejectDelete(new RPCError(String(RPCStatusCode.FAILED_PRECONDITION), 'rejected'));

    expect(result.error).toBeNull();
    expect(result.isHandledError).toBe(false);
  });
});

describe('deleteUser.pending', () => {
  it('clears the error of the previous attempt', () => {
    const failed = usersReducer(
      undefined,
      deleteUser.rejected(
        null,
        'request-id',
        { username: 'alice', password: 'password' },
        { error: new RPCError(String(RPCStatusCode.UNAUTHENTICATED), 'rejected') },
        { isHandledError: false },
      ),
    );
    const state = usersReducer(failed, deleteUser.pending('request-id', { username: 'alice', password: 'password' }));

    expect(state.deleteAccount.error).toBeNull();
  });
});
