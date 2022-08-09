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

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import {
  Login,
  PrivateRoute,
  Projects,
  CreateProject,
  ProjectAPIKeys,
  Project,
  Documents,
  ProjectSettings,
} from 'routes';
import { useAppSelector } from 'app/hooks';

function App() {
  const { token } = useAppSelector((state) => state.users);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

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

  // TODO(hackerwins): If the user is already logged in, redirect to the
  // projects page.

  // TODO(hackerwins): For now, all user can access to all projects in the cluster.
  // After implementing the user-specific project role, let's open the signup here.
  // <Route path="/signup" element={<Signup />} />

  // TODO(hackerwins): Redirect to 404 page when accessing non-existent pages.
  return (
    <Router>
      <nav className="bg-white border-gray-200 py-1 px-2 sm:px-4 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
            <svg width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.8574 11.4048L18.8525 21.4507C19.2947 22.086 20.1683 22.2423 20.8036 21.8001C20.9398 21.7052 21.0581 21.5869 21.153 21.4507L28.148 11.4048C29.0327 10.1343 28.7198 8.3872 27.4495 7.5027C26.9794 7.17549 26.4205 7 25.8477 7H14.1577C12.6095 7 11.3545 8.25503 11.3545 9.80322C11.3547 10.3758 11.5302 10.9347 11.8574 11.4048Z"
                fill="#514C49"
              />
              <path
                d="M22.8637 29.5446C23.3612 29.8283 23.9338 29.9528 24.5042 29.9014L37.2991 28.7469C38.3271 28.6542 39.0851 27.7457 38.9924 26.7178C38.9876 26.6636 38.9803 26.6096 38.9706 26.556C38.5862 24.4114 37.8296 22.3507 36.7352 20.4668C35.6407 18.5829 34.2255 16.9048 32.5532 15.5085C31.761 14.8471 30.5825 14.953 29.9211 15.7455C29.8862 15.7872 29.8532 15.8305 29.8219 15.8752L22.4807 26.418C22.1535 26.888 21.978 27.4469 21.978 28.0198V27.9849C21.978 28.3055 22.0604 28.6208 22.2176 28.9002C22.3826 29.1751 22.6155 29.4029 22.8942 29.5617"
                fill="#FDC433"
              />
              <path
                d="M17.8492 28.7605C17.6844 29.097 17.4222 29.376 17.0969 29.5616L17.1365 29.539C16.6391 29.8227 16.0665 29.9472 15.4961 29.8959L2.70114 28.7414C2.64694 28.7365 2.59295 28.7293 2.53935 28.7196C1.52348 28.5375 0.847507 27.5663 1.02965 26.5505C1.41407 24.4057 2.17064 22.3451 3.26489 20.4611C4.35914 18.577 5.77455 16.8993 7.44706 15.5028C7.48877 15.4679 7.53208 15.4349 7.57681 15.4037C8.42384 14.8139 9.58841 15.0225 10.1784 15.8695L17.5196 26.4124C17.8468 26.8825 18.0223 27.4414 18.0223 28.0142V27.9685C18.0223 28.343 17.9096 28.7091 17.6991 29.019"
                fill="#FDC433"
              />
            </svg>
          </Link>
          {token && (
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
                    <button
                      type="button"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-orange-500 sm:p-0"
                    >
                      Feedback
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-orange-500 sm:p-0"
                    >
                      Support
                    </button>
                  </li>
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
                  className="inline-flex items-center justify-center ml-3 w-6 h-6 rounded-full bg-orange-400"
                  onClick={() => setIsUserDropdownOpen(true)}
                >
                  A
                </button>
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute z-10 top-12 right-0 bg-white rounded drop-shadow-lg py-1"
                  >
                    <div className="py-3 px-4 text-sm text-gray-900">
                      <div className="font-medium">Admin</div>
                      <div className="text-xs truncate">admin@naver.com</div>
                    </div>
                    <ul className="border-y border-gray-200 border-solid py-1 text-sm text-gray-700">
                      <li>
                        <button type="button" className="block w-full py-2 px-4 hover:bg-gray-100 text-left">
                          Sign out
                        </button>
                      </li>
                    </ul>
                    <div className="py-2 px-4">
                      <Link to="/" className="mx-2 text-xs text-gray-400 hover:text-gray-600">
                        Privacy policy
                      </Link>
                      <Link to="/" className="mx-2 text-xs text-gray-400 hover:text-gray-600">
                        Terms of service
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/projects" />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:projectName" element={<Project />} />
          <Route path="/projects/:projectName/apikeys" element={<ProjectAPIKeys />} />
          <Route path="/projects/:projectName/documents/*" element={<Documents />} />
          <Route path="/projects/:projectName/settings" element={<ProjectSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
