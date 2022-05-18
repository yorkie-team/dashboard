import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from 'features/projects';
import { DocumentList, DocumentDatail } from 'features/documents';

export function Documents() {
  return (
    <div className="relative h-screen flex">
      <aside
        className="fixed top-0 h-screen flex-none w-64 bg-gray-50"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
      <main className="ml-64 grow overflow-y-scroll">
        <div className="flex px-12 py-6">
          <div className="px-5">
            <h2 className="text-lg font-semibold">Documents</h2>
            <DocumentList />
          </div>
          <Routes>
            <Route path=":documentKey" element={<DocumentDatail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
