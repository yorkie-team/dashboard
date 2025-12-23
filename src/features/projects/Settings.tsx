import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  listProjectsAsync,
  ProjectUpdateFields,
  resetUpdateSuccess,
  selectProjectDetail,
  selectProjectUpdate,
  updateProjectAsync,
} from './projectsSlice';
import { SettingsForm } from './settings/SettingsForm';

export function Settings() {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector(selectProjectDetail);
  const updateState = useAppSelector(selectProjectUpdate);

  const handleUpdate = useCallback(
    (fields: Partial<ProjectUpdateFields>) => {
      if (!project?.id) return;
      dispatch(
        updateProjectAsync({
          id: project.id,
          fields,
        }),
      );
    },
    [dispatch, project?.id],
  );

  const handleSuccessSideEffects = useCallback(() => {
    dispatch(listProjectsAsync());
    dispatch(resetUpdateSuccess());
  }, [dispatch]);

  return (
    <SettingsForm
      project={project}
      updateState={updateState}
      onUpdate={handleUpdate}
      onSuccessSideEffects={handleSuccessSideEffects}
    />
  );
}
