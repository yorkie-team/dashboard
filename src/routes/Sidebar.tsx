import React from 'react';
import { NavLink as Link, useMatch, useResolvedPath } from 'react-router-dom';

export function Sidebar() {
  const itemStyle =
    'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100';
  const activeStyle = '!bg-gray-200';
  const isMatchProjectUrl = useMatch({
    path: useResolvedPath('create-project').pathname,
    end: true,
  });

  return (
    <div className="overflow-y-auto py-4 px-3">
      <div className="flex pl-2.5 mb-5">
        <h1 className="self-center text-lg font-semibold whitespace-nowrap">
          Yorkie-House
        </h1>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            to="/projects"
            className={({ isActive }) =>
              isActive || isMatchProjectUrl
                ? `${itemStyle} ${activeStyle}`
                : itemStyle
            }
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            <span className="ml-3">Projects</span>
          </Link>
        </li>
        <li>
          <Link
            to="/documents"
            className={({ isActive }) =>
              isActive ? `${itemStyle} ${activeStyle}` : itemStyle
            }
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
            <span className="ml-3">Documents</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${itemStyle} ${activeStyle}` : itemStyle
            }
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="ml-3">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
