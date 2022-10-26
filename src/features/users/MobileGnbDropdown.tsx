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
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers, logoutUser } from './usersSlice';
import { Popover, Dropdown, Icon } from 'components';

export function MobileGnbDropdown() {
  const { username } = useAppSelector(selectUsers);
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);

  useEffect(() => {
    return () => {
      setOpened(false);
    };
  }, []);

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <button
          className="btn_menu"
          onClick={() => {
            setOpened((opened) => !opened);
          }}
        >
          <span className="blind">Open menu</span>
          <Icon type="gnbMenu" className={classNames('icon_menu', { is_active: !opened })} />
          <Icon type="close" className={classNames('icon_close', { is_active: opened })} />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Dropdown className="util_list_mo">
          <Dropdown.List>
            <Dropdown.Item as="link" href="/community">
              <Dropdown.Text>Feedback</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item as="a" href="https://yorkie.dev/docs">
              <Dropdown.Text>Docs</Dropdown.Text>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.List>
            <Dropdown.Item as="link" href="/settings">
              <Dropdown.Text>Settings</Dropdown.Text>
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
