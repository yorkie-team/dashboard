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
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectList, listProjectsAsync } from './projectsSlice';

// ProjectLists represents the list of projects in the application.
export function ProjectLists() {
  const { projects, status } = useAppSelector(selectProjectList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch]);

  return (
    <>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <ul className="flex flex-wrap">
          {projects.map((project) => {
            const { name, publicKey, secretKey, createdAt } = project;
            return (
              <li
                key={name}
                className="mr-4 mb-4 bg-white rounded border border-solid border-gray-200 hover:bg-gray-100"
              >
                <Link to={`./${name}`} className="block p-6">
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 break-words">{name}</h5>
                  <p className="text-gray-700 text-sm">
                    Public Key: {publicKey}
                    <br />
                    Secret Key: {secretKey}
                    <br />
                    Created At: {moment.unix(createdAt).format('YYYY-MM-DD')}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
