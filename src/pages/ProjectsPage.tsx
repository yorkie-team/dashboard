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
import { Link } from 'react-router-dom';
import { ProjectList } from 'features/projects';
import { Button, Icon } from 'components';
import { PageTemplate } from './PageTemplate';

export function ProjectsPage() {
  return (
    <PageTemplate className="team_overview_page">
      <div className="banner_box" style={{ marginTop: 0 }}>
        <strong className="guide">Welcome to Yorkie</strong>
        <ul className="banner_list">
          <li className="banner_item ">
            <Link to="/demo" className="banner gradient_180deg_yellow">
              <strong className="banner_title gray900">View demo project</strong>
              <p className="banner_desc gray900">Check out our demo projects and be inspired!</p>
            </Link>
          </li>
          <li className="banner_item ">
            <Link to="/examples" className="banner gray900_bg">
              <strong className="banner_title gray000">Browse Yorkie examples</strong>
              <p className="banner_desc gray000">Browse all examples</p>
              <span className="img_box">
                <img src="../assets/images/@tmp/sample_banner_icon.png" alt="" />
              </span>
            </Link>
          </li>
        </ul>
        <Button icon={<Icon type="close" />} className="btn_close" />
      </div>
      <ProjectList />
    </PageTemplate>
  );
}
