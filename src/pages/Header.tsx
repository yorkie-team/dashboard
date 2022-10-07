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
import { Link } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { ProjectDropdown } from 'features/projects';
import { AccountDropdown } from 'features/users';
import { selectUsers } from 'features/users/usersSlice';
import { Icon } from 'components';

type HeaderProps = {
  className?: string;
};
export function Header({ className }: HeaderProps) {
  const { token, isValidToken } = useAppSelector(selectUsers);
  return (
    <>
      <header className={`header ${className}`}>
        <div className="header_inner">
          <div className="shortcut">
            <h1 className="logo">
              <Link to="/" className="logo_menu">
                <Icon type="logoNoText" fill />
              </Link>
              <span className="blind">Yorkie</span>
            </h1>
            {token && isValidToken && <ProjectDropdown />}
          </div>
          {token && isValidToken && (
            <>
              <nav className="util_box">
                <button type="button" className="btn_menu">
                  <span className="blind">Open menu</span>
                  <Icon type="gnbMenu" className="icon_menu" />
                  <Icon type="close" className="icon_close" />
                </button>
                <ul className="util_list">
                  <li className="util_item">
                    <a href="/feedback" className="util_menu">Feedback</a>
                  </li>
                  <li className="util_item">
                    <a href="/support" className="util_menu">Support</a>
                  </li>
                  <li className="util_item">
                    <a href="https://yorkie.dev/docs" target="_blank" rel="noreferrer" className="util_menu">
                      Docs
                    </a>
                  </li>
                  <li className="util_item">
                    <AccountDropdown />
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
}
