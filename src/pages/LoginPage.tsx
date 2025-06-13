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
import { LoginForm } from 'features/users';
import { PageTemplate } from './PageTemplate';
import { Icon, Button } from 'components';

export function LoginPage() {
  const githubAuthEnabled = Boolean(import.meta.env.VITE_GITHUB_AUTH_ENABLED);
  const [withUsername, setWithUsername] = useState(!githubAuthEnabled);

  return (
    <PageTemplate className="login_page">
      <Icon type="logo3d" className="icon_logo" fill />
      <h2 className="title">Sign in to Yorkie</h2>
      {!withUsername && githubAuthEnabled && (
        <div className="box_signin">
          <Button
            as="link"
            href={`${import.meta.env.VITE_API_ADDR}/auth/github/login`}
            icon={<Icon type="github" className="large" />}
            className="gray800"
            outline
          >
            Sign in with GitHub
          </Button>
          <Button onClick={() => setWithUsername(true)} outline>
            Sign in with Username
          </Button>
        </div>
      )}

      {withUsername && (
        <>
          <LoginForm />
          {githubAuthEnabled && (
            <Button.Box fullWidth style={{ marginTop: '1rem' }}>
              <Button
                icon={<Icon type="arrowBack" />}
                onClick={() => setWithUsername(false)}
                outline
                className="signin_other"
              >
                Other sign in options
              </Button>
            </Button.Box>
          )}
        </>
      )}
      <div className="box_bottom">
        <Button.Box fullWidth>
          <Button as="link" href="/signup" outline>
            Sign up
          </Button>
        </Button.Box>
      </div>
    </PageTemplate>
  );
}
