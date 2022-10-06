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

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers, logoutUser } from './usersSlice';
import { Popover, Dropdown } from 'components';

export function AccountDropdown() {
  const { username } = useAppSelector(selectUsers);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <Popover>
      <Popover.Button className={`util_menu user_profile is_active`}>
        <span className="blind">User profile</span>
        <div className="profile">{username.slice(0, 1).toUpperCase()}</div>
      </Popover.Button>
      <Popover.Dropdown>
        <Dropdown shadow="m">
          <dl className="user_account">
            <dt className="blind">Name</dt>
            <dd className="user_account_text">{username}</dd>
            <dt className="blind">Mail</dt>
            <dd className="user_account_text">
              <a href={`mailto:${username}@yorkie.dev`} className="user_account_mail">
                {username}@yorkie.dev
              </a>
            </dd>
          </dl>
          <Dropdown.List>
            <Dropdown.Item border>
              <Dropdown.Menu>
                <Dropdown.Text>Settings</Dropdown.Text>
              </Dropdown.Menu>
              <Dropdown.Menu onClick={logout}>
                <Dropdown.Text highlight>Sign out</Dropdown.Text>
              </Dropdown.Menu>
            </Dropdown.Item>
          </Dropdown.List>
          <ul className="terms_list">
            <li className="terms_item">
              <a href="/policy" className="terms_menu">
                Privacy policy
              </a>
            </li>
            <li className="terms_item">
              <a href="/terms" className="terms_menu">
                Terms of service
              </a>
            </li>
          </ul>
        </Dropdown>
      </Popover.Dropdown>
    </Popover>
  );
}
