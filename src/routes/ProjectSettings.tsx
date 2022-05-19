import React from 'react';
import { Sidebar, Settings } from 'features/projects';

export function ProjectSettings() {
  return (
    <div className="relative h-screen flex">
      <aside
        className="fixed top-0 h-screen flex-none w-64 bg-gray-50"
        aria-label="Sidebar"
      >
        <Sidebar />
      </aside>
      <main className="ml-64 grow overflow-y-scroll">
        <div className="px-12 py-6">
          <h2 className="text-lg font-semibold">Settings</h2>
          <Settings />
        </div>
      </main>
    </div>
  );
}
