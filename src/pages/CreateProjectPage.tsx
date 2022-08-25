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
import { RegisterForm } from 'features/projects';

export function CreateProjectPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Create a new Project</h2>
        <Link
          to={'../'}
          className="text-gray-700 border border-solid border-gray-300 rounded font-medium text-sm px-4 py-2 text-center inline-flex items-center"
        >
          cancel
        </Link>
      </div>
      <RegisterForm />
    </div>
  );
}
