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
import './dropdown.scss';
import './titlebar.scss';

type DropdownProps = {
  className?: string;
  dropdownLists: Array<DropdownList>;
};

type DropdownList = {
  showTitle: boolean;
  title: string;
  items: Array<DropdownItem>;
};
type DropdownItem = {
  text: string;
  type: 'danger' | 'default';
};

export function Dropdown({ className, dropdownLists }: DropdownProps) {
  return (
    <div className={`dropdown ${className}`}>
      {dropdownLists.map((dropdownList) => {
        return (
          <>
            {dropdownList.showTitle && <strong className="dropdown_title">{dropdownList.title}</strong>}
            <ul className="dropdown_list" key={dropdownList.title}>
              {dropdownList.items.map(({ text, type }) => {
                return (
                  <li className="dropdown_item" key={text}>
                    <span className={`dropdown_text ${type === 'danger' ? 'highlight' : ''}`}>{text}</span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      })}
    </div>
  );
}
