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

import React, { useCallback, useState, useRef } from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useOutsideClick } from 'hooks';
import { ProjectDropdown } from 'features/projects';
import { selectUsers, logoutUser } from 'features/users/usersSlice';
import { LogoMarkOnlyIcon, HamburgerIcon, CloseIcon } from 'components';

type HeaderProps = {
  className?: string;
};
export function Header({ className }: HeaderProps) {
  const { token, isValidToken, username } = useAppSelector(selectUsers);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);

  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const userDropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useOutsideClick(
    userDropdownRef,
    () => {
      if (isUserDropdownOpen) setIsUserDropdownOpen(false);
    },
    userDropdownButtonRef,
  );

  return (
    <>
      <header className={`header ${className}`}>
        <div className="header_inner">
          <div className="shortcut">
            <h1 className="logo">
              <Link to="/" className="logo_menu">
                <LogoMarkOnlyIcon />
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
                  <span className="icon icon_menu">
                    <HamburgerIcon />
                  </span>
                  <span className="icon icon_close">
                    <CloseIcon />
                  </span>
                </button>
                <ul className="util_list">
                  <li className="util_item">
                    <a href="https://yorkie.dev/docs" target="_blank" rel="noreferrer" className="util_menu">
                      Docs
                    </a>
                  </li>
                  <li className="util_item">
                    <button
                      type="button"
                      ref={userDropdownButtonRef}
                      className={`util_menu user_profile ${isUserDropdownOpen ? 'is_active' : ''}`}
                      onClick={() => setIsUserDropdownOpen((isOpen) => !isOpen)}
                    >
                      {username.slice(0, 1).toUpperCase()}
                    </button>
                    <div className="dropdown shadow_m" ref={userDropdownRef}>
                      <dl className="user_account">
                        <dt className="blind">Name</dt>
                        <dd className="user_account_text">{username}</dd>
                      </dl>
                      <ul className="dropdown_list">
                        <li className="dropdown_item">
                          <button type="button" onClick={logout} className="dropdown_menu">
                            <span className="dropdown_text highlight">Sign out</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="util_list_mo dropdown">
                <ul className="dropdown_list">
                  <li className="dropdown_item">
                    <a
                      href="https://yorkie.dev/docs"
                      target="_blank"
                      rel="noreferrer"
                      className="dropdown_menu is_active"
                    >
                      <span className="dropdown_text">Docs</span>
                    </a>
                  </li>
                </ul>
                <ul className="dropdown_list">
                  <li className="dropdown_item">
                    <button type="button" onClick={logout} className="dropdown_menu">
                      <span className="dropdown_text">Sign out</span>
                    </button>
                  </li>
                </ul>
                <dl className="user_account">
                  <dt className="blind">Name</dt>
                  <dd className="user_account_text">{username}</dd>
                </dl>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
