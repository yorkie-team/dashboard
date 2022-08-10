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
import { Link } from 'react-router-dom';
import { ProjectList } from 'features/projects';

export function Projects() {
  return (
    <>
      <div className="border-b border-solid border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex">
            <h2 className="text-lg font-semibold">Projects</h2>
          </div>
          <Link
            to={'./new'}
            className="inline-flex items-center justify-center text-center py-1.5 px-3 bg-blue-500 hover:bg-blue-600 rounded focus:outline-no
        ne focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-slate-50 text-sm"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0C4.27614 0 4.5 0.223858 4.5 0.5V3.5H7.5C7.77614 3.5 8 3.72386 8 4C8 4.27614 7.77614 4.5 7.5 4.5H4.5V7.5C4.5 7.77614 4.27614 8 4 8C3.72386 8 3.5 7.77614 3.5 7.5V4.5H0.5C0.223858 4.5 0 4.27614 0 4C0 3.72386 0.223858 3.5 0.5 3.5H3.5V0.5C3.5 0.223858 3.72386 0 4 0Z"
                fill="#FEFDFB"
              />
            </svg>
            <span className="ml-1">New Project</span>
          </Link>
        </div>
      </div>
      <ProjectList />
    </>
  );
}
