import React from 'react';

import { useAppSelector } from 'app/hooks';
import { selectProjectDetail } from './projectsSlice';

export function ProjectOverview() {
  const { project, status } = useAppSelector(selectProjectDetail);

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (<div>{project?.name}</div>)}
    </div>
    
  );
}
