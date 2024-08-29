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
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers, logoutUser } from './usersSlice';
import { Popover, Dropdown, Icon } from 'components';

export function MobileGnbDropdown() {
  const { username } = useAppSelector(selectUsers);
  const [opened, setOpened] = useState(false);

  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const PC_WIDTH = 1024;
      if (window.innerWidth >= PC_WIDTH) {
        setOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <button className="btn_menu">
          <span className="blind">Open menu</span>
          <Icon type="gnbMenu" className={classNames('icon_menu', { is_active: !opened })} />
          <Icon type="close" className={classNames('icon_close', { is_active: opened })} />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Dropdown className="util_list_mo">
          <Dropdown.List>
            <Dropdown.Item as="link" href="/projects">
              <Dropdown.Text>Dashboard</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item as="a" href={`${import.meta.env.VITE_SERVICE_URL}/docs`}>
              <Dropdown.Text>Documentation</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item as="link" href="/community">
              <Dropdown.Text>Community</Dropdown.Text>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.List>
            <Dropdown.Item as="link" href="/settings">
              <Dropdown.Text>User Settings</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>
              <Dropdown.Text highlight>Sign out</Dropdown.Text>
            </Dropdown.Item>
          </Dropdown.List>
          <dl className="user_account">
            <dt className="blind">Name</dt>
            <dd className="user_account_text">{username}</dd>
            <dt className="blind">Mail</dt>
            <dd className="user_account_text">
              <span className="user_account_mail">{username}@yorkie.dev</span>
            </dd>
          </dl>
        </Dropdown>
      </Popover.Dropdown>
    </Popover>
  );
}
