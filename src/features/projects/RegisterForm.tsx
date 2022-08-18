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

import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RegisterFields, createProjectAsync, selectProjectCreate } from './projectsSlice';

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
  } = useForm<RegisterFields>();
  const { error } = useAppSelector(selectProjectCreate);

  const onSubmit = useCallback(
    async (data: RegisterFields) => {
      try {
        const project = await dispatch(createProjectAsync(data)).unwrap();
        navigate(`../projects/${project.name}`);
      } catch (err) {}
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    if (!error) return;
    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 ">
          Project name
        </label>
        <input
          type="text"
          id="projectName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
          autoComplete="off"
          autoFocus
          {...register('projectName', { required: 'The project name is required' })}
        />
      </div>
      {formErrors.projectName && <p className="text-red-500 text-xs italic">{formErrors.projectName.message}</p>}
      <button
        type="submit"
        className="float-right mt-10 text-white bg-orange-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Create Project
      </button>
    </form>
  );
}
