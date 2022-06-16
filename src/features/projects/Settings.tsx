import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectProjectDetail, updateProjectAsync } from './projectsSlice';

export function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const authWebhookUrlRef = useRef<HTMLInputElement | null>(null);
  const { project } = useAppSelector(selectProjectDetail);
  const [name, SetName] = useState('');
  const [authWebhookUrl, SetAuthWebhookUrl] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const name = nameRef.current?.value!;
      const authWebhookUrl = authWebhookUrlRef.current?.value!;

      dispatch(updateProjectAsync({ id: project?.id!, fields: { name, authWebhookUrl } }));
      navigate(`../projects/${name}/settings`);
    },
    [navigate, dispatch, project?.id],
  );

  const handleChangeName = useCallback((e) => {
    SetName(e.target.value);
  }, []);

  const handleChangeAuthWebhookUrl = useCallback((e) => {
    SetAuthWebhookUrl(e.target.value);
  }, []);

  useEffect(() => {
    if (project?.name) SetName(project.name);
    if (project?.authWebhookUrl) SetAuthWebhookUrl(project.authWebhookUrl);
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
        <br></br>
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
      <button
        type="submit"
        className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Update Project
      </button>
    </form>
  );
}
