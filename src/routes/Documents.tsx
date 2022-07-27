import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from 'features/projects';
import { DocumentList, DocumentDetail } from 'features/documents';

export function Documents() {
  return (
    <div className="relative h-screen flex">
      <aside className="fixed top-0 h-screen flex-none w-64 bg-gray-50 z-50" aria-label="Sidebar">
        <Sidebar />
      </aside>
      <main className="ml-64 grow">
        <div className="flex h-full w-full">
          <div className="h-full w-full px-6 py-6" style={{ maxWidth: '34rem' }}>
            <h2 className="text-lg font-semibold">Documents</h2>
            <DocumentList />
          </div>
          <Routes>
            <Route path=":documentKey" element={<DocumentDetail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
