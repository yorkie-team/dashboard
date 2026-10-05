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
import { AUTH_WEBHOOK_METHODS, toggleAuthWebhookMethod } from './types';

describe('AUTH_WEBHOOK_METHODS', () => {
  it('leaves out the deprecated Watch aliases', () => {
    expect(AUTH_WEBHOOK_METHODS).not.toContain('WatchDocument');
    expect(AUTH_WEBHOOK_METHODS).not.toContain('WatchChannel');
    expect(AUTH_WEBHOOK_METHODS).toContain('Watch');
  });

  it('has no duplicates', () => {
    expect(new Set(AUTH_WEBHOOK_METHODS).size).toBe(AUTH_WEBHOOK_METHODS.length);
  });

  it('lists every non-deprecated server method', () => {
    expect([...AUTH_WEBHOOK_METHODS].sort()).toEqual(
      [
        'ActivateClient',
        'DeactivateClient',
        'AttachDocument',
        'DetachDocument',
        'RemoveDocument',
        'PushPull',
        'Watch',
        'CreateRevision',
        'GetRevision',
        'ListRevisions',
        'RestoreRevision',
        'AttachChannel',
        'DetachChannel',
        'RefreshChannel',
        'PeekChannel',
        'Broadcast',
      ].sort(),
    );
  });
});

describe('toggleAuthWebhookMethod', () => {
  it('adds the method once', () => {
    expect(toggleAuthWebhookMethod(['PushPull'], 'RemoveDocument', true)).toEqual(['PushPull', 'RemoveDocument']);
    expect(toggleAuthWebhookMethod(['PushPull'], 'PushPull', true)).toEqual(['PushPull']);
  });

  it('removes only the method', () => {
    expect(toggleAuthWebhookMethod(['PushPull', 'Watch'], 'Watch', false)).toEqual(['PushPull']);
  });

  it('keeps methods that have no toggle', () => {
    expect(toggleAuthWebhookMethod(['WatchDocument', 'PushPull'], 'CreateRevision', true)).toEqual([
      'WatchDocument',
      'PushPull',
      'CreateRevision',
    ]);
    expect(toggleAuthWebhookMethod(['WatchChannel', 'PushPull'], 'PushPull', false)).toEqual(['WatchChannel']);
  });
});
