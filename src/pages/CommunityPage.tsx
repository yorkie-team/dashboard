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
import { ReactComponent as CommunitySVG } from 'assets/icons/community_help.svg';
import { Button, Icon } from 'components';

export function CommunityPage() {
  return (
    <PageTemplate className="community_page">
      <div className="img_box">
        <CommunitySVG />
      </div>
      <h2 className="title">Join our community</h2>
      <p className="desc">
        If you have any questions along the way,<br className="br_mo" /> please don’t hesitate to ask us<br className="br_tablet" /> through our<br className="br_mo" /><br className="br_pc" />
        channels.<br className="br_mo_xs" /> You can sign up for our slack or<br className="br_mo" /> raise GitHub<br className="br_tablet" /> discussions.
      </p>
      <Button.Box>
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
          href="https://github.com/yorkie-team/yorkie-house/issues"
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
