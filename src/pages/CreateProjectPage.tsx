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
import { RegisterForm } from 'features/projects';
import { PageTemplate } from 'pages';
import { Button } from 'components';

export function CreateProjectPage() {
  return (
    <PageTemplate className="project_create_page">
      <div className="content">
        <h2 className="blind">Create new Project</h2>
        <div className="title_box">
          <strong className="title">Create new project</strong>
          <Button as="a" href="../" className="btn_line">Cancel</Button>
        </div>
        <div className="create_project_area">
          <RegisterForm />
        </div>
      </div>
    </PageTemplate >
  );
}
