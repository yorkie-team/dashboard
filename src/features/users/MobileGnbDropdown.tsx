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

import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
          {!opened && <Icon type="gnbMenu" className="icon_menu" />}
          {opened && <Icon type="close" className="icon_close" />}
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <Dropdown className="util_list_mo">
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Text>Feedback</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Text>Support</Dropdown.Text>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Text>Docs</Dropdown.Text>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Text>User setting</Dropdown.Text>
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
