import React from 'react';

import { ProjectRegistForm } from 'features/projects';

export function CreateProject() {
  return (
    <div className="relative h-screen flex">
      <main className="ml-64 grow overflow-y-scroll">
        <div className="px-12 py-6">
          <h2 className="text-lg font-semibold">Create a new Project</h2>
          <ProjectRegistForm />
        </div>
      </main>
    </div>
  );
}
