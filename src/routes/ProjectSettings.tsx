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

import React from 'react';
import { Sidebar, Settings } from 'features/projects';

export function ProjectSettings() {
  return (
    <div className="relative h-screen flex">
      <aside className="fixed top-0 h-screen flex-none w-64 bg-gray-50 z-50" aria-label="Sidebar">
        <Sidebar />
      </aside>
      <main className="ml-64 grow overflow-y-scroll">
        <div className="px-12 py-6">
          <h2 className="text-lg font-semibold">Settings</h2>
          <Settings />
        </div>
      </main>
    </div>
  );
}
