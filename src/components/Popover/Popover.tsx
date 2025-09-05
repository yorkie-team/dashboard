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

import { ReactNode, useRef } from 'react';
import { useUncontrolled, useOutsideClick } from 'hooks';
import { PopoverContextProvider } from './Popover.context';
import { PopoverTarget } from './PopoverTarget';
import { PopoverDropdown } from './PopoverDropdown';

export function Popover({
  opened,
  defaultOpened,
  children,
  closeOnClickOutside = true,
  onChange,
  onOpen,
  onClose,
}: {
  opened?: boolean;
  defaultOpened?: boolean;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onChange?(opened: boolean): void;
  onOpen?: () => void;
  onClose?: () => void;
}) {
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange,
  });

  const _onOpen = () => {
    onOpen && onOpen();
    setOpened(true);
  };

  const _onClose = () => {
    onClose && onClose();
    setOpened(false);
  };

  const _onToggle = () => {
    if (_opened) {
      onClose && onClose();
      setOpened(false);
    } else {
      onOpen && onOpen();
      setOpened(true);
    }
  };

  const targetRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLElement | null>(null);

  useOutsideClick(
    targetRef,
    () => {
      if (closeOnClickOutside) {
        _onClose();
      }
    },
    dropdownRef,
  );

  return (
    <PopoverContextProvider
      value={{
        opened: _opened,
        targetRef,
        dropdownRef,
        onToggle: _onToggle,
        onOpen: _onOpen,
        onClose: _onClose,
      }}
    >
      {children}
    </PopoverContextProvider>
  );
}

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = 'Popover';
