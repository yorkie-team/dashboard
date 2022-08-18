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

import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectDetail, updateProjectAsync, ProjectUpdateFields, selectProjectUpdate } from './projectsSlice';
import { AUTH_WEBHOOK_METHODS } from 'api/types';

export function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector(selectProjectDetail);
  const { error } = useAppSelector(selectProjectUpdate);
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
    reset,
  } = useForm<ProjectUpdateFields>({
    defaultValues: {
      projectName: '',
      authWebhookURL: '',
      authWebhookMethods: [],
    },
  });

  const onSubmit = useCallback(
    async (data: ProjectUpdateFields) => {
      try {
        const result = await dispatch(
          updateProjectAsync({
            id: project?.id!,
            fields: {
              name: data.projectName,
              authWebhookURL: data.authWebhookURL,
              authWebhookMethods: data.authWebhookMethods,
            },
          }),
        ).unwrap();
        navigate(`../projects/${result.name}/settings`);
      } catch (err) {}
    },
    [dispatch, navigate, project?.id],
  );

  useEffect(() => {
    if (!error) return;
    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    reset({
      projectName: project?.name || '',
      authWebhookURL: project?.authWebhookURL || '',
      authWebhookMethods: project?.authWebhookMethods || [],
    });
  }, [reset, project]);

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="projectName" className="block mb-2 font-medium">
          Project Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="projectName"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register('projectName', { required: 'The project name is required' })}
          />
        </div>
        {formErrors.projectName && <p className="text-red-500 text-xs italic m-2">{formErrors.projectName.message}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="projectAuthWebhookUrl" className="block mb-2 font-medium">
          AuthWebhookUrl
        </label>
        <div className="relative">
          <input
            type="text"
            id="projectAuthWebhookUrl"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register('authWebhookURL')}
          />
        </div>
        {formErrors.authWebhookURL && (
          <p className="text-red-500 text-xs italic m-2">{formErrors.authWebhookURL.message}</p>
        )}
      </div>
      <div className="mb-6">
        <span className="block mb-2 font-medium">AuthWebhookMethods</span>
        {AUTH_WEBHOOK_METHODS.map((method) => {
          return (
            <li key={method} className="flex items-center mt-4">
              <input
                id={method}
                type="checkbox"
                {...register('authWebhookMethods')}
                value={method}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={method} className="ml-2 text-sm font-medium text-gray-900">
                {method}
              </label>
            </li>
          );
        })}
        {formErrors.authWebhookMethods && (
          <p className="text-red-500 text-xs italic m-2">{formErrors.authWebhookMethods.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Update Project
      </button>
    </form>
  );
}
