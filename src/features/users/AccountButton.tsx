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
import React, { useRef, useState } from 'react';

import { useAppSelector } from 'app/hooks';
import { selectUsers } from 'features/users/usersSlice';
import { useOutsideClick } from 'hooks';

export function AccountButton() {
  const { username } = useAppSelector(selectUsers);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const userDropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useOutsideClick(
    userDropdownRef,
    () => {
      if (isUserDropdownOpen) setIsUserDropdownOpen(false);
    },
    userDropdownButtonRef,
  );

  return (
    <>
      <div className="hidden relative w-full items-center sm:flex sm:w-auto">
        <button
          type="button"
          ref={userDropdownButtonRef}
          className="inline-flex items-center justify-center ml-3 w-6 h-6 rounded-full bg-orange-300 uppercase"
          onClick={() => setIsUserDropdownOpen((isOpen) => !isOpen)}
        >
          {username.slice(0, 1)}
        </button>
        {isUserDropdownOpen && (
          <div
            ref={userDropdownRef}
            className="absolute z-10 top-12 right-0 bg-white rounded drop-shadow-lg py-1 min-w-[12rem]"
          >
            <div className="py-3 px-4 text-sm text-gray-900">
              <div className="font-medium">{username}</div>
            </div>
            <ul className="border-t border-solid border-gray-200 py-1 text-sm text-gray-700">
              <li>
                <button type="button" className="block w-full py-2 px-4 hover:bg-gray-100 text-left">
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
