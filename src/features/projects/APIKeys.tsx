import React from 'react';

import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';

export function APIKeys() {
  const { project, status } = useAppSelector(selectProjectDetail);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <form className="mt-6">
          <div className="mb-6">
            <label htmlFor="public-key-icon" className="block mb-2 font-medium">Public Key</label>
            <div className="relative">
              <input type="text" id="public-key-icon" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={project?.publicKey} readOnly />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="secret-key-icon" className="block mb-2 font-medium">Secret Key</label>
            <div className="relative">
              <input type="text" id="secret-key-icon" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={project?.secretKey} readOnly />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
