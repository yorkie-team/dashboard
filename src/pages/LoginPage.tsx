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
import { LoginForm } from 'features/users';
import { PageTemplate } from './PageTemplate';
import { Icon, Button } from 'components';

export function LoginPage() {
  return (
    <PageTemplate className="login_page">
      <Icon type="logo3d" className="icon_logo" fill />
      <h2 className="title">Log in to Yorkie</h2>
      <LoginForm />
      <div className="box_bottom">
        <Button.Box fullWidth={true}>
          <Button as="link" href="/signup" outline={true}>
            Sign up
          </Button>
        </Button.Box>
      </div>
    </PageTemplate>
  );
}
