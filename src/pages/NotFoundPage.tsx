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
import { PageTemplate } from './PageTemplate';
import { ReactComponent as NotFoundSVG } from 'assets/icons/error_404.svg';
import { Button, Icon } from 'components';

export function NotFoundPage() {
  return (
    <PageTemplate className="error_page" contentClassName="error_404">
      <div className="img_box">
        <NotFoundSVG />
      </div>
      <h2 className="title">
        Oops! Wait a minute... <br />
        Yorkie ate your request
      </h2>
      <p className="desc">
        The page you are looking for might be<br className="br_mo" /> removed or is temporarily unavailable.
      </p>
      <Button.Box>
        <Button icon={<Icon type="backHome" />} href="/" className="orange_0" as="link">
          Back to Home
        </Button>
        <Button
          icon={<Icon type="slack" />}
          href="https://communityinviter.com/apps/dev-yorkie/yorkie"
          className="gray50"
          as="a"
          outline
          target="_blank"
          rel="noreferrer"
        >
          Slack
        </Button>
        <Button
          icon={<Icon type="github" />}
          href="https://github.com/yorkie-team/dashboard/issues"
          className="gray50"
          as="a"
          outline
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Button>
      </Button.Box>
    </PageTemplate>
  );
}
