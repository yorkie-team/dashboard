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
import { Dropdown, Icon } from 'components';

export function DropdownView() {
  return (
    <>
      <Dropdown>
        <Dropdown.Title>Title</Dropdown.Title>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Dropdown.Text>Menu 1</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Dropdown.Text highlight>Menu 2</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Icon type="circle" color="gray800" />
              <Dropdown.Text>Menu 3</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Icon type="check" color="orange_0" />
              <Dropdown.Text>item 2 item 2 item 2 item 2 item 2</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
        </Dropdown.List>
        <Dropdown.Title>Title</Dropdown.Title>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Dropdown.Text>Menu 1</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Dropdown.Text highlight>Menu 2</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Icon type="circle" color="gray800" />
              <Dropdown.Text>Menu 3</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Icon type="check" color="orange_0" />
              <Dropdown.Text>item 2 item 2 item 2 item 2 item 2</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
      <Dropdown large shadow="l">
        <Dropdown.Title>Title</Dropdown.Title>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Dropdown.Text>Menu 1</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Dropdown.Text highlight>Menu 2</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Icon type="circle" color="gray800" />
              <Dropdown.Text>Menu 3</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Menu>
              <Icon type="check" color="orange_0" />
              <Dropdown.Text>item 2 item 2 item 2 item 2 item 2</Dropdown.Text>
            </Dropdown.Menu>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </>
  );
}
