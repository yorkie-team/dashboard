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

import React, { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from 'api';

export function RegisterForm() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const project = await createProject(nameRef.current?.value!);
      navigate(`../projects/${project.name}`);
    },
    [navigate],
  );

  return (
    <form className="mt-10" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="prjName" className="block mb-2 text-sm font-medium text-gray-900 ">
          Project name
        </label>
        <input
          type="text"
          ref={nameRef}
          id="prjName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="float-right mt-10 text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Create Project
      </button>
    </form>
  );
}
