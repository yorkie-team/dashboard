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

import { cloneElement } from 'react';
import { isElement } from 'utils';
import { usePopoverContext } from './Popover.context';

export interface PopoverDropdownProps {
  children: React.ReactNode;
}

export const PopoverDropdown = ({ children, ...others }: PopoverDropdownProps) => {
  if (!isElement(children)) {
    throw new Error('PopoverDropdown must have a single child element.');
  }

  const ctx = usePopoverContext();
  if (!ctx.opened) {
    return null;
  }
  return cloneElement(children, {
    ...others,
    ref: ctx.dropdownRef,
  });
};

PopoverDropdown.displayName = 'PopoverDropdown';
