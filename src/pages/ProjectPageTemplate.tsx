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

import { ReactNode } from 'react';
import { ProjectTabList, ProjectDropdown } from 'features/projects';
import { PageTemplate } from './PageTemplate';

export function ProjectPageTemplate({ className, children }: { className: string; children: ReactNode }) {
  return (
    <PageTemplate className={className}>
      <div className="box_top">
        <div className="project_area">
          <div className="title_group">
            <ProjectDropdown size="large" />
          </div>
        </div>
      </div>
      <div className="box_tab">
        <ProjectTabList />
      </div>
      {children}
    </PageTemplate>
  );
}
