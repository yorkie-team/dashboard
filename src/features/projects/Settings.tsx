import React, { useCallback, useState, useEffect } from 'react';
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
  const [name, SetName] = useState('');
  const [authWebhookUrl, SetAuthWebhookUrl] = useState('');
  const [selectedAuthWebhookMethods, SetSelectedAuthWebhookMethods] = useState<string[]>([]);

  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z0-9_.-]{2,30}$/g;
    if (!nameRegex.test(name)) {
      alert('Project Name can only contain letters, numbers, spaces and these characters: _.-');
      // TODO: alert about length
      return false;
    }
    return true;
  };
  const validateAuthWebhookUrl = (authWebhookUrl: string): boolean => {
    // TODO: Implement proper reg exp for WebhookUrl
    const urlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g;
    if (!urlRegex.test(authWebhookUrl)) {
      alert('AuthWebhookUrl should fit the url format.');
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateName(name)) return;
      if (authWebhookUrl !== '' && !validateAuthWebhookUrl(authWebhookUrl)) return;

      await dispatch(
        updateProjectAsync({
          id: project?.id!,
          fields: { name, authWebhookUrl, authWebhookMethods: selectedAuthWebhookMethods },
        }),
      )
        .unwrap()
        .then((result) => {
          navigate(`../projects/${result.name}/settings`);
        })
        .catch((rejectedValueOrSerializedError) => {
          alert(rejectedValueOrSerializedError.message);
        });
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
            value={authWebhookUrl}
            onChange={handleChangeAuthWebhookUrl}
          />
        </div>
      </div>
      <div className="mb-6">
        <span className="block mb-2 font-medium">AuthWebhookMethods</span>
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
