import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectDetail, updateProjectAsync } from './projectsSlice';
import { AUTH_WEBHOOK_METHODS, AuthWebhookMethod, validateUpdatableProjectFields } from 'api/types';
import * as errorDetails from 'grpc-web-error-details';

export function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector(selectProjectDetail);
  const [name, SetName] = useState('');
  const [authWebhookURL, SetAuthWebhookURL] = useState('');
  const [authWebhookMethods, SetAuthWebhookMethods] = useState<Array<AuthWebhookMethod>>([]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const updatableFields = { name, authWebhookURL, authWebhookMethods };
      if (!validateUpdatableProjectFields(updatableFields)) {
        // return;
      }
      await dispatch(
        updateProjectAsync({
          id: project?.id!,
          fields: updatableFields,
        }),
      )
        .unwrap()
        .then((result) => {
          navigate(`../projects/${result.name}/settings`);
        })
        .catch((rejectedValueOrSerializedError) => {
          const [status, details] = errorDetails.statusFromError(rejectedValueOrSerializedError);
          if (status && details) {
            for (const d of details) {
              if (d instanceof errorDetails.BadRequest) {
                // use appropriate methods on details for further information
                for (const v of d.getFieldViolationsList()) {
                  console.log(`Violation at field ${v.getField()}: ${v.getDescription()}`);
                  alert(`Violation at field ${v.getField()}: ${v.getDescription()}`);
                }
              }
            }
          }

          alert(rejectedValueOrSerializedError.message);
        });
    },
    [navigate, dispatch, project?.id, name, authWebhookURL, authWebhookMethods],
  );

  const handleChangeName = useCallback((e) => {
    SetName(e.target.value);
  }, []);

  const handleChangeAuthWebhookUrl = useCallback((e) => {
    SetAuthWebhookURL(e.target.value);
  }, []);

  const handleChangeAuthWebhookMethods = useCallback((e) => {
    if (e.target.checked) {
      SetAuthWebhookMethods((authWebhookMethods) => [...authWebhookMethods, e.target.value]);
    } else {
      SetAuthWebhookMethods((authWebhookMethods) => authWebhookMethods.filter((method) => method !== e.target.value));
    }
  }, []);

  useEffect(() => {
    if (project?.name) SetName(project.name);
    if (project?.authWebhookURL) SetAuthWebhookURL(project.authWebhookURL);
    if (project?.authWebhookMethods) SetAuthWebhookMethods(project.authWebhookMethods);
  }, [project]);

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="projectName" className="block mb-2 font-medium">
          Project Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="projectName"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={name}
            required
            onChange={handleChangeName}
          />
        </div>
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
            value={authWebhookURL}
            onChange={handleChangeAuthWebhookUrl}
          />
        </div>
      </div>
      <div className="mb-6">
        <span className="block mb-2 font-medium">AuthWebhookMethods</span>
        {AUTH_WEBHOOK_METHODS.map((method) => {
          return (
            <li key={method} className="flex items-center mt-4">
              <input
                id={method}
                type="checkbox"
                onChange={handleChangeAuthWebhookMethods}
                value={method}
                checked={authWebhookMethods.includes(method)}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={method} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {method}
              </label>
            </li>
          );
        })}
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
