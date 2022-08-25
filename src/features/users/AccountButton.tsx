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
import React, { useRef, useEffect, useState, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { logoutUser } from 'features/users/usersSlice';

export function AccountButton() {
  const { token, username } = useAppSelector((state) => state.users);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const handleClickOutside = useCallback(
    (e) => {
      if (!isUserDropdownOpen) return;
      if (!userDropdownRef.current?.contains(e.target)) setIsUserDropdownOpen(false);
    },
    [isUserDropdownOpen],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!token) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="hidden relative w-full items-center sm:flex sm:w-auto">
        <ul className="inline-flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 sm:flex-row sm:space-x-8 sm:mt-0 sm:text-sm sm:font-medium sm:border-0 sm:bg-white">
          <li>
            <a
              href="https://yorkie.dev/docs"
              target="_blank"
              rel="noreferrer"
              className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-orange-500 sm:p-0"
            >
              Docs
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="inline-flex items-center justify-center ml-3 w-6 h-6 rounded-full bg-orange-300 uppercase"
          onClick={() => setIsUserDropdownOpen(true)}
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
                <button
                  type="button"
                  onClick={logout}
                  className="block w-full py-2 px-4 hover:bg-gray-100 text-left"
                >
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
