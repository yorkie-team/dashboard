import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DocumentList, DocumentDatail } from 'features/documents';

export function Documents() {
  return (
    <div className='flex px-12 py-6'>
      <div className='px-5'>
        <h2 className='text-lg font-semibold'>Documents</h2>
        <DocumentList />
      </div>
      <Routes>
        <Route path=':id' element={<DocumentDatail />} />
      </Routes>
    </div>
  );
}
