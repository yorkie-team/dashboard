import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

// DocumentDetail represents the snapshot of document.
export function DocumentDatail() {
  const { id } = useParams();
  const locState = useLocation().state as '' | { snapshot: string };
  const snapshot = locState ? locState.snapshot : '';

  return (
    <div className='px-5 border-l border-gray-100'>
      <h2 className='text-lg font-semibold'>{id}</h2>
      <div className='py-6'>{snapshot}</div>
    </div>
  );
}
