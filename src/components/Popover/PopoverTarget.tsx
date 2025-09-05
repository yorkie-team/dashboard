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

export interface PopoverTargetProps {
  children: React.ReactNode;
}

export const PopoverTarget = ({ children, ...others }: PopoverTargetProps) => {
  if (!isElement(children)) {
    throw new Error('PopoverTarget must have a single child element.');
  }

  const ctx = usePopoverContext();
  return cloneElement(children, {
    ...others,
    onClick: () => {
      ctx.onToggle();
    },
    ref: ctx.targetRef,
  });
};

PopoverTarget.displayName = 'PopoverTarget';
