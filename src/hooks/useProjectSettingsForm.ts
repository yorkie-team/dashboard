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

export type UpdateFieldTarget =
  | { kind: 'field'; name: keyof ProjectUpdateFields }
  | { kind: 'authWebhookMethod'; value: AuthWebhookMethod }
  | { kind: 'eventWebhookEvent'; value: EventWebhookEvent };

export type UpdateFieldInfo = {
  target: UpdateFieldTarget | null;
  state: 'success' | 'error' | null;
  message: string;
};

export const makeTarget = {
  field: (name: keyof ProjectUpdateFields): UpdateFieldTarget => ({ kind: 'field', name }),
  authWebhookMethod: (value: AuthWebhookMethod): UpdateFieldTarget => ({ kind: 'authWebhookMethod', value }),
  eventWebhookEvent: (value: EventWebhookEvent): UpdateFieldTarget => ({ kind: 'eventWebhookEvent', value }),
} as const;

export function isFieldTarget(
  target: UpdateFieldTarget | null,
  fieldName?: keyof ProjectUpdateFields,
): target is { kind: 'field'; name: keyof ProjectUpdateFields } {
  if (!target || target.kind !== 'field') return false;
  return fieldName === undefined || target.name === fieldName;
}

export function isAuthWebhookMethodTarget(
  target: UpdateFieldTarget | null,
  method?: AuthWebhookMethod,
): target is { kind: 'authWebhookMethod'; value: AuthWebhookMethod } {
  if (!target || target.kind !== 'authWebhookMethod') return false;
  return method === undefined || target.value === method;
}

export function isEventWebhookEventTarget(
  target: UpdateFieldTarget | null,
  event?: EventWebhookEvent,
): target is { kind: 'eventWebhookEvent'; value: EventWebhookEvent } {
  if (!target || target.kind !== 'eventWebhookEvent') return false;
  return event === undefined || target.value === event;
}

type UseProjectSettingsFormParams = {
  project: Project | null;
  onUpdate: (fields: Partial<ProjectUpdateFields>) => void;
};

type UseProjectSettingsFormResult = {
  form: UseFormReturn<ProjectUpdateFields>;
  updateFieldInfo: UpdateFieldInfo;
  setUpdateFieldInfo: React.Dispatch<React.SetStateAction<UpdateFieldInfo>>;
  checkFieldState: (target: UpdateFieldTarget, state: 'success' | 'error') => boolean;
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
    (target: UpdateFieldTarget, state: 'success' | 'error'): boolean => {
      const current = updateFieldInfo.target;
      if (!current) return false;
      if (current.kind !== target.kind) return false;

      let same = false;
      if (target.kind === 'field' && current.kind === 'field') {
        same = current.name === target.name;
      } else if (target.kind === 'authWebhookMethod' && current.kind === 'authWebhookMethod') {
        same = current.value === target.value;
      } else if (target.kind === 'eventWebhookEvent' && current.kind === 'eventWebhookEvent') {
        same = current.value === target.value;
      }

      return same && updateFieldInfo.state === state;
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

    const target = updateFieldInfo.target;
    if (!target || target.kind !== 'field') return;

    const targetError = errors[target.name];
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
