/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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
import { useNavigate } from 'react-router-dom';
import { Navigator } from 'components';
import { useProjectSettingsForm, UpdateFieldInfo, UpdateFieldTarget, makeTarget } from 'hooks/useProjectSettingsForm';
import { ProjectUpdateFields, selectProjectUpdate } from '../projectsSlice';
import { Project } from 'api/types';
import { GeneralSection } from './sections/GeneralSection';
import { WebhooksSection } from './sections/WebhooksSection';
import { SecuritySection } from './sections/SecuritySection';
import { LimitsSection } from './sections/LimitsSection';
import { ResourcesSection } from './sections/ResourcesSection';
import { UseFormReturn } from 'react-hook-form';

type SettingsFormProps = {
  project: Project | null;
  updateState: ReturnType<typeof selectProjectUpdate>;
  onUpdate: (fields: Partial<ProjectUpdateFields>) => void;
  onSuccessSideEffects: () => void;
};

export function SettingsForm({ project, updateState, onUpdate, onSuccessSideEffects }: SettingsFormProps) {
  const navigate = useNavigate();
  const { form, updateFieldInfo, setUpdateFieldInfo, checkFieldState, resetUpdateFieldInfo, resetForm, onSubmit } =
    useProjectSettingsForm({ project, onUpdate });
  const { isSuccess, error } = updateState;
  const { handleSubmit, register, trigger, control, setError } = form;

  const handleInvalid = useCallback(
    (formErrors: Record<string, any>) => {
      const firstKey = Object.keys(formErrors)[0];
      if (!firstKey) return;
      const firstError = formErrors[firstKey];
      setUpdateFieldInfo((info) => ({
        ...info,
        target: makeTarget.field(firstKey as keyof ProjectUpdateFields),
        state: 'error',
        message: firstError?.message?.toString() || '',
      }));
    },
    [setUpdateFieldInfo],
  );

  useEffect(() => {
    if (isSuccess) {
      setUpdateFieldInfo((info) => ({ ...info, state: 'success', message: 'Success' }));
      navigate(`../projects/${project?.name}/settings`, { replace: true });
      onSuccessSideEffects();
    }
    if (error) {
      setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
      setUpdateFieldInfo((info) => ({
        ...info,
        target: makeTarget.field(error.target),
        state: 'error',
        message: error.message,
      }));
    }
  }, [error, isSuccess, navigate, onSuccessSideEffects, project?.name, setError, setUpdateFieldInfo]);

  const commonSectionProps = {
    register,
    trigger,
    control,
    project,
    onSubmit,
    updateFieldInfo,
    checkFieldState,
    resetUpdateFieldInfo,
    resetForm,
    setUpdateFieldInfo,
  };

  return (
    <div className="setting_group">
      <Navigator
        navList={[
          { name: 'General', id: 'general' },
          { name: 'Webhooks', id: 'webhooks' },
          { name: 'Security', id: 'security' },
          { name: 'Limits', id: 'limits' },
          { name: 'Resources', id: 'resources' },
        ]}
      />
      <div className="box_right">
        <form onSubmit={handleSubmit(onSubmit, handleInvalid)}>
          <GeneralSection {...commonSectionProps} />
          <WebhooksSection {...commonSectionProps} />
          <SecuritySection {...commonSectionProps} />
          <LimitsSection {...commonSectionProps} />
          <ResourcesSection {...commonSectionProps} />
        </form>
      </div>
    </div>
  );
}

export type SettingsFormSectionProps = {
  register: UseFormReturn<ProjectUpdateFields>['register'];
  trigger: UseFormReturn<ProjectUpdateFields>['trigger'];
  control: UseFormReturn<ProjectUpdateFields>['control'];
  project: Project | null;
  onSubmit: (fields: Partial<ProjectUpdateFields>) => void;
  updateFieldInfo: UpdateFieldInfo;
  checkFieldState: (target: UpdateFieldTarget, state: 'success' | 'error') => boolean;
  resetUpdateFieldInfo: () => void;
  resetForm: () => void;
  setUpdateFieldInfo: React.Dispatch<React.SetStateAction<UpdateFieldInfo>>;
};
