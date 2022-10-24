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
import './test.scss';
import { NavLink as Link, Outlet } from 'react-router-dom';

export function TestPage() {
  const views = [
    { name: 'Button', path: 'button' },
    { name: 'Popover', path: 'popover' },
    { name: 'Dropdown', path: 'dropdown' },
    { name: 'Input', path: 'input' },
    { name: 'Breadcrumb', path: 'breadcrumb' },
    { name: 'Modal', path: 'modal' },
  ];

  return (
    <div className="test">
      <nav>
        <ul>
          {views.map((view) => (
            <li key={view.path}>
              <Link to={view.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {view.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
