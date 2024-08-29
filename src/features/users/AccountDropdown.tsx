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

import React, { useCallback, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers, logoutUser } from './usersSlice';
import { Popover, Dropdown } from 'components';

export function AccountDropdown() {
  const { username } = useAppSelector(selectUsers);
  const [opened, setOpened] = useState(false);

  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const PC_WIDTH = 1024;
      if (window.innerWidth < PC_WIDTH) {
        setOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <button className="util_menu user_profile">
          <span className="blind">User profile</span>
          <span className="profile">
            <span className="img_box gradient_180deg_yellow">
              <span className="name">{username.slice(0, 1).toUpperCase()}</span>
            </span>
          </span>
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Dropdown shadow="m">
          <dl className="user_account">
            <dt className="blind">Name</dt>
            <dd className="user_account_text">{username}</dd>
            <dt className="blind">Mail</dt>
            <dd className="user_account_text">
              <span className="user_account_mail">{username}@yorkie.dev</span>
            </dd>
          </dl>
          <Dropdown.List>
            <Dropdown.Item as="link" href="/settings" border>
              <Dropdown.Text>Account Settings</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>
              <Dropdown.Text highlight>Sign out</Dropdown.Text>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Popover.Dropdown>
    </Popover>
  );
}
