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
import classNames from 'classnames';

type ShadowSize = 'xs' | 's' | 'm' | 'l';

export function Dropdown({ children, large, shadow }: {
  large?: boolean;
  shadow?: ShadowSize;
  children: ReactNode;
}) {
  const shadowClass = shadow ? `shadow_${shadow}` : '';

  return (
    <div className={classNames('dropdown', shadowClass, {
      dropdown_l: large
    })} >
      {children}
    </div>
  );
}

function List({ children }: {
  children: ReactNode;
}) {
  return (
    <ul className="dropdown_list">
      {children}
    </ul>
  );
}

function Item({ border, children }: {
  children: ReactNode;
  border?: boolean;
}) {
  return (
    <li className={classNames('dropdown_item', {
      has_border: border,
    })}>
      <span className="dropdown_menu">
        {children}
      </span>
    </li>
  );
}

function Text({ children, highlight }: {
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <span className={classNames('dropdown_text', { highlight })}>
      {children}
    </span>
  );
}

function Title({ children }: {
  children: ReactNode;
}) {
  return (
    <strong className="dropdown_title">
      {children}
    </strong>
  );
}

Dropdown.List = List;
Dropdown.Item = Item;
Dropdown.Text = Text;
Dropdown.Title = Title;
