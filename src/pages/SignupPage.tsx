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

import { SignupForm } from 'features/users/SignupForm';
import { PageTemplate } from './PageTemplate';

export function SignupPage() {
  return (
    <PageTemplate>
      <SignupForm />
      <div className="max-w-md mx-auto p-4">
        <hr className="pb-3" />
        <Link
          to="/login"
          className="block py-2.5 w-full text-sm text-gray-500 font-medium text-center rounded border border-solid border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
        >
          Log in
        </Link>
      </div>
    </PageTemplate>
  );
}
