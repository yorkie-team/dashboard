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

import React, { useEffect } from 'react';
import { NavLink as Link, useParams } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { getProjectAsync } from './projectsSlice';

export function Sidebar() {
  let { projectName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!projectName) {
      return;
    }

    dispatch(getProjectAsync(projectName));
  }, [dispatch, projectName]);

  const itemStyle = 'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100';
  const activeStyle = '!bg-gray-200';

  return (
    <div className="overflow-y-auto py-4 px-3">
      <div className="flex pl-2.5 mb-5">
        <h1 className="self-center text-lg font-semibold whitespace-nowrap">
          <Link to="/projects">Yorkie-House</Link>
          <br />
          <span className="block mt-2">{projectName}</span>
        </h1>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            to={`/projects/${projectName}`}
            className={({ isActive }) => (isActive ? `${itemStyle} ${activeStyle}` : itemStyle)}
            end
          >
            <svg
              className="w-6 h-6 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Overview</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/projects/${projectName}/documents`}
            className={({ isActive }) => (isActive ? `${itemStyle} ${activeStyle}` : itemStyle)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            <span className="ml-3">Documents</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/projects/${projectName}/apikeys`}
            className={({ isActive }) => (isActive ? `${itemStyle} ${activeStyle}` : itemStyle)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <span className="ml-3">API Keys</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/projects/${projectName}/settings`}
            className={({ isActive }) => (isActive ? `${itemStyle} ${activeStyle}` : itemStyle)}
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="ml-3">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
