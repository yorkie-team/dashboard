import { ProjectList } from 'features/projects';
import React from 'react';

export function Projects() {
  return (
    <div className="px-12 py-6">
      <h2 className="text-lg font-semibold">Projects</h2>
      <ProjectList />
    </div>
  );
}
