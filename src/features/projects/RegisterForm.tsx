/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  ProjectCreateFields,
  createProjectAsync,
  selectProjectCreate,
  selectProjectDetail,
  resetCreateSuccess,
} from './projectsSlice';
import { InputTextField, Button } from 'components';

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
  } = useForm<ProjectCreateFields>();
  const { isSuccess, error } = useAppSelector(selectProjectCreate);
  const { project } = useAppSelector(selectProjectDetail);

  const onSubmit = useCallback((data: ProjectCreateFields) => {
    dispatch(createProjectAsync(data));
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;
    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`../projects/${project?.name}`);
      dispatch(resetCreateSuccess());
    }
  }, [dispatch, isSuccess, navigate, project]);

  // TODO(hackerwins): Remove margin-top when other features are implemented.
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <div className="create_project">
          <div className="setting_name" style={{ marginTop: 20 }}>
            <InputTextField
              id="projectName"
              label="Project Name"
              blindLabel={true}
              placeholder="Project Name"
              {...register('projectName', { required: 'Project Name is required' })}
              autoComplete="off"
              autoFocus
              state={formErrors.projectName ? 'error' : 'normal'}
              helperText={(formErrors.projectName && formErrors.projectName.message) || ''}
              large
            />
          </div>
        </div>
        <Button.Box>
          <Button type="submit" className="orange_0">Create</Button>
        </Button.Box>
      </fieldset>
    </form>
  );
}
