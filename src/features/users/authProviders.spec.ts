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
import { fallbackAuthProviders, isEnabled, providerDisplayName } from './authProviders';

describe('isEnabled', () => {
  it('treats false, 0 and empty as disabled', () => {
    expect(isEnabled(undefined)).toBe(false);
    expect(isEnabled('')).toBe(false);
    expect(isEnabled(' ')).toBe(false);
    expect(isEnabled('false')).toBe(false);
    expect(isEnabled('FALSE')).toBe(false);
    expect(isEnabled('0')).toBe(false);
  });

  it('treats any other value as enabled', () => {
    expect(isEnabled('true')).toBe(true);
    expect(isEnabled('1')).toBe(true);
    expect(isEnabled('yes')).toBe(true);
  });
});

describe('fallbackAuthProviders', () => {
  it('offers GitHub only when the build enables it', () => {
    expect(fallbackAuthProviders('true')).toEqual({
      passwordLogin: true,
      providers: [{ name: 'github', displayName: 'GitHub', loginPath: '/auth/github/login' }],
    });
    expect(fallbackAuthProviders('false')).toEqual({ passwordLogin: true, providers: [] });
    expect(fallbackAuthProviders(undefined)).toEqual({ passwordLogin: true, providers: [] });
  });
});

describe('providerDisplayName', () => {
  const providers = [
    { name: 'github', displayName: 'GitHub', loginPath: '/auth/github/login' },
    { name: 'github', displayName: 'Company GitHub', loginPath: '/auth/external/github/login' },
    { name: 'corp', displayName: 'Corp SSO', loginPath: '/auth/external/corp/login' },
  ];

  it('returns null for local users', () => {
    expect(providerDisplayName('', providers)).toBeNull();
  });

  it('matches by login path, not by name', () => {
    expect(providerDisplayName('github', providers)).toBe('GitHub');
    expect(providerDisplayName('external:github', providers)).toBe('Company GitHub');
    expect(providerDisplayName('external:corp', providers)).toBe('Corp SSO');
  });

  it('falls back when the server does not list the provider', () => {
    expect(providerDisplayName('github', [])).toBe('GitHub');
    expect(providerDisplayName('external:gone', providers)).toBe('gone');
  });
});
