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

import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ProjectUpdateFields } from 'features/projects/projectsSlice';
import { Project, UpdatableProjectFields, AuthWebhookMethod, EventWebhookEvent } from 'api/types';

export type UpdateFieldInfo = {
  target: keyof UpdatableProjectFields | AuthWebhookMethod | EventWebhookEvent | null;
  state: 'success' | 'error' | null;
  message: string;
};

type UseProjectSettingsFormParams = {
  project: Project | null;
  onUpdate: (fields: Partial<ProjectUpdateFields>) => void;
};

type UseProjectSettingsFormResult = {
  form: UseFormReturn<ProjectUpdateFields>;
  updateFieldInfo: UpdateFieldInfo;
  setUpdateFieldInfo: React.Dispatch<React.SetStateAction<UpdateFieldInfo>>;
  checkFieldState: (fieldName: UpdateFieldInfo['target'], state: 'success' | 'error') => boolean;
  resetUpdateFieldInfo: () => void;
  resetForm: () => void;
  onSubmit: (fields: Partial<ProjectUpdateFields>) => void;
};

export function useProjectSettingsForm({
  project,
  onUpdate,
}: UseProjectSettingsFormParams): UseProjectSettingsFormResult {
  const [updateFieldInfo, setUpdateFieldInfo] = useState<UpdateFieldInfo>({
    target: null,
    state: null,
    message: '',
  });

  const form = useForm<ProjectUpdateFields>({
    defaultValues: {
      name: '',
      authWebhookURL: '',
      authWebhookMethods: [],
      authWebhookMaxRetries: 0,
      authWebhookMinWaitInterval: '',
      authWebhookMaxWaitInterval: '',
      authWebhookRequestTimeout: '',
      eventWebhookURL: '',
      eventWebhookEvents: [],
      eventWebhookMaxRetries: 0,
      eventWebhookMinWaitInterval: '',
      eventWebhookMaxWaitInterval: '',
      eventWebhookRequestTimeout: '',
      clientDeactivateThreshold: '',
      snapshotInterval: 0,
      snapshotThreshold: 0,
      maxSubscribersPerDocument: 0,
      maxAttachmentsPerDocument: 0,
      maxSizePerDocument: 0,
      removeOnDetach: false,
      autoRevisionEnabled: false,
      allowedOrigins: '',
    },
  });

  const resetForm = useCallback(() => {
    form.reset({
      name: project?.name || '',
      authWebhookURL: project?.authWebhookURL || '',
      authWebhookMethods: project?.authWebhookMethods || [],
      authWebhookMaxRetries: project?.authWebhookMaxRetries || 0,
      authWebhookMinWaitInterval: project?.authWebhookMinWaitInterval || '',
      authWebhookMaxWaitInterval: project?.authWebhookMaxWaitInterval || '',
      authWebhookRequestTimeout: project?.authWebhookRequestTimeout || '',
      eventWebhookURL: project?.eventWebhookURL || '',
      eventWebhookEvents: project?.eventWebhookEvents || [],
      eventWebhookMaxRetries: project?.eventWebhookMaxRetries || 0,
      eventWebhookMinWaitInterval: project?.eventWebhookMinWaitInterval || '',
      eventWebhookMaxWaitInterval: project?.eventWebhookMaxWaitInterval || '',
      eventWebhookRequestTimeout: project?.eventWebhookRequestTimeout || '',
      clientDeactivateThreshold: project?.clientDeactivateThreshold || '',
      maxSubscribersPerDocument: project?.maxSubscribersPerDocument || 0,
      maxAttachmentsPerDocument: project?.maxAttachmentsPerDocument || 0,
      snapshotInterval: project?.snapshotInterval || 0,
      snapshotThreshold: project?.snapshotThreshold || 0,
      maxSizePerDocument: project?.maxSizePerDocument || 0,
      removeOnDetach: project?.removeOnDetach || false,
      autoRevisionEnabled: project?.autoRevisionEnabled || false,
      allowedOrigins: Array.isArray(project?.allowedOrigins) ? project?.allowedOrigins.join(',') : '',
    });
  }, [form, project]);

  const onSubmit = useCallback(
    (fields: Partial<ProjectUpdateFields>) => {
      onUpdate(fields);
    },
    [onUpdate],
  );

  const checkFieldState = useCallback(
    (fieldName: UpdateFieldInfo['target'], state: 'success' | 'error'): boolean => {
      return updateFieldInfo.target === fieldName && updateFieldInfo.state === state;
    },
    [updateFieldInfo],
  );

  const resetUpdateFieldInfo = useCallback(() => {
    setUpdateFieldInfo({ target: null, state: null, message: '' });
  }, []);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const { errors } = form.formState;

  useEffect(() => {
    const hasError = Object.keys(errors).length > 0;
    if (!hasError && updateFieldInfo.state !== 'success') {
      setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }
    if (!updateFieldInfo.target) {
      return;
    }
    const targetError = errors[updateFieldInfo.target as keyof ProjectUpdateFields];
    if (targetError) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: 'error',
        message: targetError.message?.toString() || '',
      }));
    }
  }, [errors, updateFieldInfo.target, updateFieldInfo.state]);

  return {
    form,
    updateFieldInfo,
    setUpdateFieldInfo,
    checkFieldState,
    resetUpdateFieldInfo,
    resetForm,
    onSubmit,
  };
}
