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
import { getPageTitle } from './pageTitle';

describe('getPageTitle', () => {
  it('names the top-level pages', () => {
    expect(getPageTitle('/login')).toBe('Sign in');
    expect(getPageTitle('/projects')).toBe('Projects');
    expect(getPageTitle('/projects/new')).toBe('New project');
    expect(getPageTitle('/settings')).toBe('Account settings');
  });

  it('puts the section before the project name', () => {
    expect(getPageTitle('/projects/default')).toBe('Overview · default');
    expect(getPageTitle('/projects/default/apikeys')).toBe('API Keys · default');
    expect(getPageTitle('/projects/default/documents/some-doc')).toBe('some-doc · Documents · default');
    expect(getPageTitle('/projects/default/documents/some-doc/history')).toBe('some-doc · Documents · default');
    expect(getPageTitle('/projects/default/schemas/new')).toBe('Schemas · default');
    expect(getPageTitle('/projects/default/schemas/todo')).toBe('todo · Schemas · default');
    expect(getPageTitle('/projects/default/documents/new')).toBe('new · Documents · default');
    expect(getPageTitle('/projects/default/documents/%E0%A4%A')).toBe('%E0%A4%A · Documents · default');
  });

  it('decodes project names and falls back for unknown paths', () => {
    expect(getPageTitle('/projects/my%20app/settings')).toBe('Settings · my app');
    expect(getPageTitle('/nope/nope')).toBe('Dashboard');
  });

  it('survives malformed escapes and a project named new', () => {
    expect(getPageTitle('/projects/%E0%A4%A/settings')).toBe('Settings · %E0%A4%A');
    expect(getPageTitle('/projects/new/settings')).toBe('Settings · new');
  });
});
