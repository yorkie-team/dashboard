import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProjects, listProjectsAsync } from './projectsSlice';

// ProjectList represents the list of projects in the application.
export function ProjectList() {
  const { projects, status } = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listProjectsAsync());
  }, [dispatch]);

  return (
    <div className="relative py-6">
      <Link
        to={'./new'}
        className="absolute -top-8 right-0 flex items-center justify-center text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 disabled:!bg-gray-300 border border-gray-300 rounded-lg focus:outline-no
          ne focus-visible:ring-4 focus-visible:ring-gray-200 font-medium text-gray-900 text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Create Project
      </Link>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <ul className="flex flex-wrap">
          {projects.map((project) => {
            const { id, name, publicKey, secretKey, createdAt } = project;
            return (
              <li
                key={id}
                className="p-6 mr-4 mb-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
              >
                <Link to={`./${id}`}>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 break-words">
                    {name}
                  </h5>
                  <p className="text-gray-700 text-sm">
                    {id}
                    <br />
                    {publicKey}
                    <br />
                    {secretKey}
                    <br />
                    {moment.unix(createdAt).format('YYYY-MM-DD')}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
