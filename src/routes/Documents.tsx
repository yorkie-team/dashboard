import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DocumentList, DocumentDatail } from 'features/documents';
import { Sidebar } from 'routes';

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
            <Route path=":documentID" element={<DocumentDatail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
