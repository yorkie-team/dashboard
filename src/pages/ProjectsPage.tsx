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

import React, { useState } from 'react';
import { ProjectList } from 'features/projects';
import { ReactComponent as BannerSVG } from 'assets/images/@tmp/sample_banner_icon.svg';
import { Button, Icon } from 'components';
import { PageTemplate } from './PageTemplate';

export function ProjectsPage() {
  const [showBanner, setShowBanner] = useState(localStorage.getItem('banner') === 'N' ? false : true);
  return (
    <PageTemplate className="team_overview_page">
      {showBanner && (
        <div className="banner_box">
          <strong className="guide">Welcome to Yorkie</strong>
          <ul className="banner_list">
            <li className="banner_item">
              <a
                href={`${process.env.REACT_APP_SERVICE_URL}/docs`}
                target="_blank"
                rel="noreferrer"
                className="banner gradient_180deg_yellow"
              >
                <strong className="banner_title gray900">Check out Documentation</strong>
                <p className="banner_desc gray900">Check out how to use SDKs and API</p>
              </a>
            </li>
            <li className="banner_item">
              <a href={`${process.env.REACT_APP_SERVICE_URL}/examples`} target="_blank" rel="noreferrer" className="banner gray900_bg">
                <strong className="banner_title gray000">Browse Examples</strong>
                <p className="banner_desc gray000">See how Yorkie can help you bring your products to the next level of collaboration.</p>
                <span className="img_box">
                  <BannerSVG />
                </span>
              </a>
            </li>
          </ul>
          <Button
            icon={<Icon type="close" />}
            className="btn_close"
            onClick={() => {
              setShowBanner(false);
              localStorage.setItem('banner', 'N');
            }}
          />
        </div>
      )}
      <ProjectList />
    </PageTemplate>
  );
}
