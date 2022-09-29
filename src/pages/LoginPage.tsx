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

import React, { useEffect } from 'react';
import './login.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { LoginForm } from 'features/users/LoginForm';
import { PageTemplate } from './PageTemplate';
import { Logo3DMarkOnlyIcon, Button, ButtonBox } from 'components';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (token && !location.state) {
      navigate('/projects');
    }
  }, [token, navigate, location]);

  return (
    <PageTemplate className="login_page">
      <span className="icon_logo">
        <Logo3DMarkOnlyIcon />
      </span>
      <h2 className="title">Log in to Yorkie</h2>
      <LoginForm />
      <div className="box_bottom">
        <ButtonBox fullWidth={true}>
          <Button as="link" href="/signup" outline={true}>
            Sign up
          </Button>
        </ButtonBox>
      </div>
    </PageTemplate>
  );
}
