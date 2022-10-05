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
import './dropdown.scss';
import './titlebar.scss';
import { Popover } from 'components';

export type MenuProps = {
  children: ReactNode;
};

export function Menu({ children }: MenuProps) {
  return <Popover>{children}</Popover>;
}

function Items({ children }: MenuProps) {
  return <ul className="dropdown_list">{children}</ul>;
}

function Item({ children }: MenuProps) {
  return <li className="dropdown_item">{children}</li>;
}

function Dropdown({ children }: MenuProps) {
  return (
    <Popover.Dropdown>
      <div className="dropdown">{children}</div>
    </Popover.Dropdown>
  );
}

function ItemText({ children }: MenuProps) {
  return <span className="dropdown_text">{children}</span>;
}

Menu.Button = Popover.Button;
Menu.Dropdown = Dropdown;
Menu.Items = Items;
Menu.Item = Item;
Menu.ItemText = ItemText;
