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

import React, { ReactNode } from 'react';
import { NavLink as Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Container, Heading, Flex, Box, Text, Grid, Menu } from 'yorkie-ui';

function Item({ children, end, to }: { children: ReactNode; end?: boolean; to: string }) {
  return (
    <li className="tab_item">
      <Link to={to} className={({ isActive }) => classNames({ is_active: isActive }, 'tab_menu')} end={end}>
        {children}
      </Link>
    </li>
  );
}

function Texts({ children }: { children: ReactNode }) {
  return <Text fontSize="sm">{children}</Text>;
}

export function TabList({ children }: { children: ReactNode }) {
  return <ul className="tab_list">{children}</ul>;
}

TabList.Item = Item;
TabList.Text = Texts;
