import React from 'react';
import { Sidebar, APIKeys } from 'features/projects';

export function ProjectAPIKeys() {
  return (
    <div className="relative h-screen flex">
      <aside className="fixed top-0 h-screen flex-none w-64 bg-gray-50 z-50" aria-label="Sidebar">
        <Sidebar />
      </aside>
      <main className="ml-64 grow overflow-y-scroll">
        <div className="px-12 py-6">
          <h2 className="text-lg font-semibold">API Keys</h2>
          <APIKeys />
        </div>
      </main>
    </div>
  );
}
