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

import React, { ReactNode, useRef, useState } from 'react';
import { useOutsideClick } from 'hooks';
import { PopoverContextProvider } from './Popover.context';
import { PopoverButton } from './PopoverButton';
import { PopoverDropdown } from './PopoverDropdown';

export function Popover({
  children,
  closeOnClickOutside = true,
  excludedClickSelector,
  onClose,
}: {
  children: ReactNode;
  closeOnClickOutside?: boolean;
  excludedClickSelector?: string;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useOutsideClick(
    targetRef,
    () => {
      if (closeOnClickOutside) {
        setOpen(false);
        onClose && onClose();
      }
    },
    excludedClickSelector,
  );

  return (
    <PopoverContextProvider
      value={{
        open,
        targetRef,
        onToggle: () => setOpen((open) => !open),
        onOpen: () => setOpen(true),
        onClose: onClose,
      }}
    >
      {children}
    </PopoverContextProvider>
  );
}

Popover.Button = PopoverButton;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = 'Popover';
