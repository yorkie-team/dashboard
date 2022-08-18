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
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { logoutUser } from './features/users/usersSlice';
import { ErrorModal } from 'features/globalError/ErrorModal';

function App() {
  const { token } = useAppSelector((state) => state.users);
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

  // TODO(hackerwins): If the user is already logged in, redirect to the
  // projects page.

  // TODO(hackerwins): For now, all user can access to all projects in the cluster.
  // After implementing the user-specific project role, let's open the signup here.
  // <Route path="/signup" element={<Signup />} />
  // TODO(chacha912): Extract Nav and Footer as separate React components.
  // TODO(hackerwins): Redirect to 404 page when accessing non-existent pages.
  return (
    <Router>
      <nav className="bg-white border-gray-200 py-1 px-2 sm:px-4 rounded">
        <div className="flex flex-wrap justify-between items-center mx-auto">
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
                  className="inline-flex items-center justify-center ml-3 w-6 h-6 rounded-full bg-orange-300"
                  onClick={() => setIsUserDropdownOpen(true)}
                >
                  A
                </button>
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute z-10 top-12 right-0 bg-white rounded drop-shadow-lg py-1 min-w-[12rem]"
                  >
                    <div className="py-3 px-4 text-sm text-gray-900">
                      <div className="font-medium">Admin</div>
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
          )}
        </div>
      </nav>
      <div className="flex-1 py-16 max-w-5xl mx-auto px-2 sm:px-4 w-full">
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
      </div>
      <footer className="flex justify-center items-center h-12 border-t border-solid border-gray-200">
        <svg width="60" height="16" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.1172 4.21149L24.8819 9.13403V11.8145H26.2041V9.12388L28.9688 4.21149H27.5865L25.7534 7.59071L25.533 8.03746L25.3126 7.59071L23.4995 4.21149H22.1172Z"
            fill="#514C49"
          />
          <path
            d="M31.8816 5.97632C30.2688 5.97632 29.0768 7.18458 29.0768 8.97158C29.0768 10.7586 30.2688 11.9668 31.8816 11.9668C33.4743 11.9668 34.6863 10.7586 34.6863 8.97158C34.6863 7.18458 33.4743 5.97632 31.8816 5.97632ZM31.8816 10.8703C31.0402 10.8703 30.359 10.0986 30.359 8.97158C30.359 7.84455 31.0402 7.07289 31.8816 7.07289C32.723 7.07289 33.4042 7.84455 33.4042 8.97158C33.4042 10.0986 32.723 10.8703 31.8816 10.8703Z"
            fill="#514C49"
          />
          <path
            d="M39.5434 5.98648C38.8923 5.98648 38.2412 6.15908 37.7704 6.60583V6.12862H36.4882V11.8145H37.7704V9.46909C37.7704 8.91066 37.8105 8.55529 37.8606 8.34207C38.0309 7.60087 38.702 7.0932 39.5434 7.13381V5.98648Z"
            fill="#514C49"
          />
          <path
            d="M44.9337 11.8145H46.4764L43.9521 8.79897L46.2259 6.12862H44.6833L42.6799 8.56544V4.24567H41.3977V11.8145H42.6799V9.07311L44.9337 11.8145Z"
            fill="#514C49"
          />
          <path
            d="M49.0453 6.12862H47.7632V11.8145H49.0453V6.12862ZM47.7031 5.49911H49.1054V4.07764H47.7031V5.49911Z"
            fill="#514C49"
          />
          <path
            d="M55.1602 9.82446C54.8397 10.4337 54.2387 10.8703 53.5575 10.8703C52.7862 10.8703 52.2152 10.2306 52.105 9.45894H56.1719V8.83958C56.1719 7.17443 55.04 5.97632 53.4673 5.97632C51.9648 5.97632 50.7628 7.18458 50.7628 8.97158C50.7628 10.7586 51.8947 11.9668 53.5575 11.9668C54.5993 11.9668 55.5309 11.4084 56.0918 10.5454L55.1602 9.82446ZM52.095 8.38268C52.2553 7.57041 52.7862 7.07289 53.4673 7.07289C54.1986 7.07289 54.6994 7.62117 54.8497 8.38268H52.095Z"
            fill="#514C49"
          />
          <path
            d="M8.62881 5.17633L11.3986 9.19881C11.5737 9.45318 11.9196 9.51579 12.1711 9.3387C12.2251 9.30071 12.2719 9.25335 12.3095 9.19881L15.0792 5.17633C15.4295 4.66759 15.3056 3.96805 14.8026 3.61388C14.6165 3.48287 14.3952 3.4126 14.1684 3.4126H9.53964C8.92663 3.4126 8.42969 3.91513 8.42969 4.53504C8.42977 4.76432 8.49925 4.98811 8.62881 5.17633Z"
            fill="#514C49"
          />
          <path
            d="M12.9835 12.4401C13.1805 12.5537 13.4072 12.6035 13.6331 12.583L18.6993 12.1207C19.1063 12.0836 19.4065 11.7198 19.3698 11.3082C19.3679 11.2865 19.365 11.2649 19.3611 11.2434C19.2089 10.3847 18.9094 9.55956 18.476 8.80524C18.0427 8.05093 17.4823 7.37898 16.8201 6.8199C16.5064 6.55504 16.0398 6.59747 15.7779 6.91477C15.7641 6.93147 15.751 6.94882 15.7387 6.96673L12.8319 11.1882C12.7023 11.3764 12.6328 11.6002 12.6328 11.8295V11.8156C12.6328 11.9439 12.6654 12.0702 12.7277 12.1821C12.793 12.2921 12.8852 12.3834 12.9956 12.4469"
            fill="#C2BDBA"
          />
          <path
            d="M10.9997 12.126C10.9344 12.2608 10.8307 12.3725 10.7018 12.4468L10.7175 12.4378C10.5206 12.5514 10.2938 12.6012 10.068 12.5806L5.00171 12.1184C4.98025 12.1164 4.95887 12.1135 4.93765 12.1097C4.5354 12.0367 4.26774 11.6479 4.33986 11.2411C4.49208 10.3823 4.79165 9.55725 5.22493 8.80285C5.65821 8.04845 6.21865 7.37667 6.88089 6.8175C6.89741 6.80355 6.91456 6.79032 6.93227 6.77781C7.26766 6.54167 7.72878 6.62517 7.96237 6.96433L10.8692 11.1858C10.9987 11.3741 11.0682 11.5979 11.0682 11.8272V11.8089C11.0682 11.9589 11.0236 12.1055 10.9403 12.2295"
            fill="#C2BDBA"
          />
        </svg>
      </footer>
      <ErrorModal />
    </Router>
  );
}

export default App;
