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

const PROJECT_SECTION_TITLES: Record<string, string> = {
  quickstart: 'Quick Start',
  apikeys: 'API Keys',
  settings: 'Settings',
  documents: 'Documents',
  channels: 'Channels',
  schemas: 'Schemas',
};

// A malformed escape in the URL must not throw while rendering the page.
function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

// Every route used to share one title, so tabs and history entries were indistinguishable.
export function getPageTitle(pathname: string): string {
  const [first, second, third, fourth] = pathname.split('/').filter(Boolean);
  if (first === 'login') return 'Sign in';
  if (first === 'signup') return 'Sign up';
  if (first === 'invite') return 'Accept invitation';
  if (first === 'settings') return 'Account settings';
  if (first === 'community') return 'Community';
  if (first === 'projects') {
    if (!second) return 'Projects';
    if (second === 'new' && !third) return 'New project';
    const project = safeDecode(second);
    const section = third ? PROJECT_SECTION_TITLES[third] || 'Overview' : 'Overview';
    // A document or schema page leads with its own name.
    // `new` is a reserved route only under schemas; a document may be keyed "new".
    const isItem = fourth && (third === 'documents' || (third === 'schemas' && fourth !== 'new'));
    const item = isItem ? safeDecode(fourth) : '';
    return `${item ? `${item} · ` : ''}${section} · ${project}`;
  }
  return 'Dashboard';
}
