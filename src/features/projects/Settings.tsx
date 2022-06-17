import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectDetail, updateProjectAsync } from './projectsSlice';

const authWebhookMethods = [
  'ActivateClient',
  'DeactivateClient',
  'AttachDocument',
  'DetachDocument',
  'PushPull',
  'WatchDocuments',
  'ListChangeSummaries',
];

export function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector(selectProjectDetail);
  
  const nameRef = useRef<HTMLInputElement | null>(null);
  const authWebhookUrlRef = useRef<HTMLInputElement | null>(null);
  const [name, SetName] = useState('');
  const [authWebhookUrl, SetAuthWebhookUrl] = useState('');
  const [selectedAuthWebhookMethods, SetSelectedAuthWebhookMethods] = useState<string[]>([]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // TODO: validate
      dispatch(
        updateProjectAsync({
          id: project?.id!,
          fields: { name, authWebhookUrl, authWebhookMethods: selectedAuthWebhookMethods },
        }),
      );
      navigate(`../projects/${name}/settings`);
    },
    [navigate, dispatch, project?.id, name, authWebhookUrl, selectedAuthWebhookMethods],
  );

  const handleChangeName = useCallback((e) => {
    SetName(e.target.value);
  }, []);

  const handleChangeAuthWebhookUrl = useCallback((e) => {
    SetAuthWebhookUrl(e.target.value);
  }, []);

  const handleChangeAuthWebhookMethods = useCallback((e) => {
    if (e.target.checked) {
      SetSelectedAuthWebhookMethods((authWebhookMethods) => [...authWebhookMethods, e.target.value]);
    } else {
      SetSelectedAuthWebhookMethods((authWebhookMethods) =>
        authWebhookMethods.filter((method) => method !== e.target.value),
      );
    }
  }, []);

  useEffect(() => {
    if (project?.name) SetName(project.name);
    if (project?.authWebhookUrl) SetAuthWebhookUrl(project.authWebhookUrl);
    if (project?.authWebhookMethods) SetSelectedAuthWebhookMethods(project.authWebhookMethods);
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
            ref={nameRef}
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
            ref={authWebhookUrlRef}
            id="projectAuthWebhookUrl"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={authWebhookUrl}
            required
            onChange={handleChangeAuthWebhookUrl}
          />
        </div>
      </div>
      <div className="mb-6">
        <span className="block mb-2 font-medium">
          AuthWebhookMethods
        </span>
        {authWebhookMethods.map((method) => {
          return (
            <li key={method} className="flex items-center mt-4">
              <input
                id={method}
                type="checkbox"
                onChange={handleChangeAuthWebhookMethods}
                value={method}
                checked={selectedAuthWebhookMethods.includes(method)}
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
