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

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useController } from 'react-hook-form';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectProjectDetail,
  updateProjectAsync,
  ProjectUpdateFields,
  selectProjectUpdate,
  resetUpdateSuccess,
  listProjectsAsync,
} from './projectsSlice';
import {
  AUTH_WEBHOOK_METHODS,
  EVENT_WEBHOOK_EVENTS,
  UpdatableProjectFields,
  AuthWebhookMethod,
  EventWebhookEvent,
} from 'api/types';
import { InputToggle, InputHelperText, InputTextField, Navigator } from 'components';
import { MembersList } from 'features/members';

export type UpdateFieldInfo = {
  target: keyof UpdatableProjectFields | AuthWebhookMethod | EventWebhookEvent | null;
  state: 'success' | 'error' | null;
  message: string;
};
export function Settings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector(selectProjectDetail);
  const { isSuccess, error } = useAppSelector(selectProjectUpdate);
  const [updateFieldInfo, setUpdateFieldInfo] = useState<UpdateFieldInfo>({ target: null, state: null, message: '' });
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
    reset,
    trigger,
    control,
  } = useForm<ProjectUpdateFields>({
    defaultValues: {
      name: '',
      authWebhookURL: '',
      authWebhookMethods: [],
      eventWebhookURL: '',
      eventWebhookEvents: [],
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

  const { field: nameField, fieldState: nameFieldState } = useController({ control, name: 'name' });
  const { field: authWebhookURLField, fieldState: authWebhookURLFieldState } = useController({
    control,
    name: 'authWebhookURL',
  });
  const { field: webhookMethodField } = useController({
    control,
    name: 'authWebhookMethods',
  });
  const { field: eventWebhookURLField, fieldState: eventWebhookURLFieldState } = useController({
    control,
    name: 'eventWebhookURL',
  });
  const { field: webhookEventField } = useController({
    control,
    name: 'eventWebhookEvents',
  });
  const { field: clientDeactivateThreshold, fieldState: clientDeactivateThresholdState } = useController({
    control,
    name: 'clientDeactivateThreshold',
  });
  const { field: maxSubscribersPerDocument, fieldState: maxSubscribersPerDocumentState } = useController({
    control,
    name: 'maxSubscribersPerDocument',
  });
  const { field: maxAttachmentsPerDocument, fieldState: maxAttachmentsPerDocumentState } = useController({
    control,
    name: 'maxAttachmentsPerDocument',
  });
  const { field: snapshotThreshold, fieldState: snapshotThresholdState } = useController({
    control,
    name: 'snapshotThreshold',
  });
  const { field: snapshotInterval, fieldState: snapshotIntervalState } = useController({
    control,
    name: 'snapshotInterval',
  });
  const { field: maxSizePerDocument, fieldState: maxSizePerDocumentState } = useController({
    control,
    name: 'maxSizePerDocument',
  });
  const { field: removeOnDetach, fieldState: removeOnDetachState } = useController({
    control,
    name: 'removeOnDetach',
  });
  const { field: autoRevisionEnabled, fieldState: autoRevisionEnabledState } = useController({
    control,
    name: 'autoRevisionEnabled',
  });
  const { field: allowedOrigins, fieldState: allowedOriginsState } = useController({
    control,
    name: 'allowedOrigins',
  });
  const checkFieldState = useCallback(
    (
      fieldName: keyof UpdatableProjectFields | AuthWebhookMethod | EventWebhookEvent,
      state: 'success' | 'error',
    ): boolean => {
      return updateFieldInfo.target === fieldName && updateFieldInfo.state === state;
    },
    [updateFieldInfo],
  );
  const resetUpdateFieldInfo = useCallback(() => {
    setUpdateFieldInfo({ target: null, state: null, message: '' });
  }, []);

  const resetForm = useCallback(() => {
    reset({
      name: project?.name || '',
      authWebhookURL: project?.authWebhookURL || '',
      authWebhookMethods: project?.authWebhookMethods || [],
      eventWebhookURL: project?.eventWebhookURL || '',
      eventWebhookEvents: project?.eventWebhookEvents || [],
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
  }, [reset, project]);

  const onSubmit = useCallback(
    (fields: Partial<ProjectUpdateFields>) => {
      const updateFields: Partial<ProjectUpdateFields> = {};
      Object.entries(fields).forEach((field) => {
        const [key, value] = field as [keyof UpdatableProjectFields, any];
        updateFields[key] = value;
      });

      dispatch(
        updateProjectAsync({
          id: project?.id!,
          fields: updateFields,
        }),
      );
    },
    [dispatch, project?.id],
  );

  useEffect(() => {
    if (
      updateFieldInfo.state !== 'success' &&
      !nameFieldState.error &&
      !authWebhookURLFieldState.error &&
      !eventWebhookURLFieldState.error &&
      !clientDeactivateThresholdState.error &&
      !maxSubscribersPerDocumentState.error &&
      !maxAttachmentsPerDocumentState.error &&
      !maxSizePerDocumentState.error &&
      !snapshotIntervalState.error &&
      !snapshotThresholdState.error &&
      !removeOnDetachState.error &&
      !autoRevisionEnabledState.error &&
      !allowedOriginsState.error
    ) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: null,
      }));
      return;
    }
    if (
      nameFieldState.error ||
      authWebhookURLFieldState.error ||
      eventWebhookURLFieldState.error ||
      clientDeactivateThresholdState.error ||
      maxSubscribersPerDocumentState.error ||
      maxAttachmentsPerDocumentState.error ||
      maxSizePerDocumentState.error ||
      snapshotIntervalState.error ||
      snapshotThresholdState.error ||
      removeOnDetachState.error ||
      autoRevisionEnabledState.error ||
      allowedOriginsState.error
    ) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: 'error',
        message: formErrors[updateFieldInfo.target as keyof UpdatableProjectFields]?.message || '',
      }));
    }
  }, [
    formErrors,
    updateFieldInfo.state,
    updateFieldInfo.target,
    nameFieldState.error,
    authWebhookURLFieldState.error,
    eventWebhookURLFieldState.error,
    clientDeactivateThresholdState.error,
    maxSubscribersPerDocumentState.error,
    maxAttachmentsPerDocumentState.error,
    maxSizePerDocumentState.error,
    removeOnDetachState.error,
    autoRevisionEnabledState.error,
    allowedOriginsState.error,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setUpdateFieldInfo((info) => ({ ...info, state: 'success', message: 'Success' }));
      navigate(`../projects/${project?.name}/settings`, { replace: true });
      dispatch(listProjectsAsync());
      dispatch(resetUpdateSuccess());
    }
    if (error) {
      setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
      setUpdateFieldInfo((info) => ({
        ...info,
        state: 'error',
        message: error.message,
      }));
    }
  }, [dispatch, navigate, project, isSuccess, error, setError]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className="setting_group">
      <Navigator
        navList={[
          { name: 'General', id: 'general' },
          { name: 'Webhooks', id: 'webhooks' },
          { name: 'Security', id: 'security' },
          { name: 'Resources', id: 'resources' },
        ]}
      />
      <div className="box_right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section setting_box" id="general">
            <div className="setting_title">
              <strong className="text">General</strong>
            </div>
            <dl className="sub_info">
              <dt className="sub_title">Project name</dt>
              <dd className="sub_desc">
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('name', 'error'),
                    is_success: checkFieldState('name', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('name', {
                      required: 'The project name is required',
                      pattern: {
                        value: /^[a-zA-Z0-9\-._~]{2,30}$/,
                        message:
                          'Project name should only contain 2 to 30 characters with alphabets, numbers, hyphen(-), period(.), underscore(_), and tilde(~)',
                      },
                      onChange: async () => {
                        await trigger('name');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'name' }));
                      nameField.onChange(e.target.value);
                    }}
                    id="name"
                    label="Project name"
                    blindLabel={true}
                    fieldUtil={true}
                    state={
                      checkFieldState('name', 'success')
                        ? 'success'
                        : checkFieldState('name', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'name' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Members</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Manage project members and their roles. Members can collaborate on documents and access project
                  resources based on their assigned roles.
                </p>
                <MembersList />
              </dd>
            </dl>
          </div>
          <div className="section setting_box webhook" id="webhooks">
            <div className="setting_title">
              <strong className="text">Webhooks</strong>
            </div>
            <dl className="sub_info">
              <dt className="sub_title">Webhook URL</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Set the webhook URL for event notifications. When enabled events occur (e.g., document content
                  changes), Yorkie sends a POST request to this endpoint with event details. Use this for integrations,
                  notifications, or syncing with external systems. Changes may take up to 10 minutes to take effect.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/event-webhook"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Event Webhook.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('eventWebhookURL', 'error'),
                    is_success: checkFieldState('eventWebhookURL', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('eventWebhookURL')}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'eventWebhookURL' }));
                      eventWebhookURLField.onChange(e.target.value);
                    }}
                    id="eventWebhookURL"
                    label="eventWebhookURL"
                    blindLabel={true}
                    placeholder="http://localhost:8080/event"
                    fieldUtil={true}
                    state={
                      checkFieldState('eventWebhookURL', 'success')
                        ? 'success'
                        : checkFieldState('eventWebhookURL', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'eventWebhookURL' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Webhook Events</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Select which events require webhook event. Only the selected events will be checked for event.
                </p>
                <div className="webhook_events">
                  {EVENT_WEBHOOK_EVENTS.map((event) => {
                    return (
                      <div
                        className={classNames('input_group', {
                          is_error: checkFieldState(event, 'error'),
                          is_success: checkFieldState(event, 'success'),
                        })}
                        key={event}
                      >
                        <InputToggle
                          id={event}
                          label={event}
                          checked={webhookEventField.value.includes(event)}
                          onChange={(e) => {
                            let newWebhookEvents = [...project?.eventWebhookEvents!];
                            if (e.target.checked) {
                              newWebhookEvents = newWebhookEvents.includes(event)
                                ? newWebhookEvents
                                : [...newWebhookEvents, event];
                            } else {
                              newWebhookEvents = newWebhookEvents.filter((newEvent) => newEvent !== event);
                            }
                            webhookEventField.onChange(newWebhookEvents);
                            setUpdateFieldInfo((info) => ({ ...info, target: event }));
                            onSubmit({ eventWebhookEvents: newWebhookEvents });
                          }}
                        />
                        {updateFieldInfo.target === event && updateFieldInfo.state !== null && (
                          <InputHelperText
                            state={updateFieldInfo.state}
                            message={updateFieldInfo.message}
                            onSuccessEnd={resetUpdateFieldInfo}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </dd>
            </dl>
          </div>
          <div className="section setting_box webhook" id="security">
            <div className="setting_title">
              <strong className="text">Security</strong>
            </div>
            <dl className="sub_info">
              <dt className="sub_title">Allowed Origins</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Configure CORS (Cross-Origin Resource Sharing) by specifying which origins can connect to the Yorkie
                  server. Use the wildcard character * to allow all origins, or specify individual origins separated by
                  commas. Changes to this setting may take up to 10 minutes to take effect.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/security#allowed-origins"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Allowed Origins.
                  </a>
                </p>
                <div className="input_field_box">
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('allowedOrigins', {
                      validate: (value: string) => {
                        if (!value) return true;
                        const origins = value.split(',').map((origin) => origin.trim());
                        const validOriginPattern = /^(\*|https?:\/\/[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]+)$/;
                        return (
                          origins.every((origin) => validOriginPattern.test(origin)) ||
                          'Invalid origin format. Use valid URLs or * separated by commas'
                        );
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'allowedOrigins' }));
                      allowedOrigins.onChange(e);
                    }}
                    onBlur={(e) => {
                      // Normalize input by removing whitespace around commas
                      const normalizedValue = e.target.value
                        .split(',')
                        .map((origin) => origin.trim())
                        .filter((origin) => origin)
                        .join(',');
                      e.target.value = normalizedValue;
                      allowedOrigins.onBlur();
                    }}
                    id="allowedOrigins"
                    label="allowedOrigins"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder="*, http://localhost:3000"
                    state={
                      checkFieldState('allowedOrigins', 'success')
                        ? 'success'
                        : checkFieldState('allowedOrigins', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'allowedOrigins' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Auth Webhook URL</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Set the webhook URL for client authorization. When configured, Yorkie validates each client request by
                  calling this endpoint with the client&apos;s token and requested action. Your server can then allow or
                  deny access based on your custom authorization logic. Changes may take up to 10 minutes to take
                  effect.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/security#auth-webhook"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Auth Webhook.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('authWebhookURL', 'error'),
                    is_success: checkFieldState('authWebhookURL', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('authWebhookURL')}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'authWebhookURL' }));
                      authWebhookURLField.onChange(e.target.value);
                    }}
                    id="authWebhookURL"
                    label="authWebhookURL"
                    blindLabel={true}
                    placeholder="http://localhost:8080/auth"
                    fieldUtil={true}
                    state={
                      checkFieldState('authWebhookURL', 'success')
                        ? 'success'
                        : checkFieldState('authWebhookURL', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'authWebhookURL' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Auth Webhook Methods</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Select which methods require webhook authorization. Only the selected methods will be checked for
                  authorization.
                </p>
                <div className="webhook_methods">
                  {AUTH_WEBHOOK_METHODS.map((method) => {
                    return (
                      <div
                        className={classNames('input_group', {
                          is_error: checkFieldState(method, 'error'),
                          is_success: checkFieldState(method, 'success'),
                        })}
                        key={method}
                      >
                        <InputToggle
                          id={method}
                          label={method}
                          checked={webhookMethodField.value.includes(method)}
                          onChange={(e) => {
                            let newWebhookMethods = [...project?.authWebhookMethods!];
                            if (e.target.checked) {
                              newWebhookMethods = newWebhookMethods.includes(method)
                                ? newWebhookMethods
                                : [...newWebhookMethods, method];
                            } else {
                              newWebhookMethods = newWebhookMethods.filter((newMethod) => newMethod !== method);
                            }
                            webhookMethodField.onChange(newWebhookMethods);
                            setUpdateFieldInfo((info) => ({ ...info, target: method }));
                            onSubmit({ authWebhookMethods: newWebhookMethods });
                          }}
                        />
                        {updateFieldInfo.target === method && updateFieldInfo.state !== null && (
                          <InputHelperText
                            state={updateFieldInfo.state}
                            message={updateFieldInfo.message}
                            onSuccessEnd={resetUpdateFieldInfo}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </dd>
            </dl>
          </div>
          <div className="section setting_box" id="resources">
            <div className="setting_title">
              <strong className="text">Resources</strong>
            </div>
            <dl className="sub_info">
              <dt className="sub_title">Client Deactivate Threshold</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Set the duration after which inactive clients are automatically deactivated. This improves garbage
                  collection efficiency by cleaning up stale client connections. Format: &quot;24h0m0s&quot; for 24
                  hours, &quot;1h30m&quot; for 1 hour 30 minutes.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#clientdeactivatethreshold"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Client Deactivate Threshold.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('clientDeactivateThreshold', 'error'),
                    is_success: checkFieldState('clientDeactivateThreshold', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('clientDeactivateThreshold', {
                      required: 'Client Deactivate Threshold is required',
                      pattern: {
                        value: /^(\d{1,2}h\s?)?(\d{1,2}m\s?)?(\d{1,2}s)?$/,
                        message:
                          'Client Deactivate Threshold should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                      },
                      onChange: async () => {
                        await trigger('clientDeactivateThreshold');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'clientDeactivateThreshold' }));
                      clientDeactivateThreshold.onChange(e.target.value);
                    }}
                    id="clientDeactivateThreshold"
                    label="clientDeactivateThreshold"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder={'24h00m00s'}
                    state={
                      checkFieldState('clientDeactivateThreshold', 'success')
                        ? 'success'
                        : checkFieldState('clientDeactivateThreshold', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'clientDeactivateThreshold' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Snapshot Threshold</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Set the number of changes that triggers snapshot delivery instead of individual changes. When a client
                  needs to sync more changes than this threshold, the server sends a complete document snapshot for
                  better performance. Default: 500.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#snapshotthreshold"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Snapshot Threshold.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('snapshotThreshold', 'error'),
                    is_success: checkFieldState('snapshotThreshold', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('snapshotThreshold', {
                      required: 'Snapshot Threshold is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Snapshot Threshold must be a positive integer',
                      },
                      onChange: async () => {
                        await trigger('snapshotThreshold');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'snapshotThreshold' }));
                      snapshotThreshold.onChange(e.target.value);
                    }}
                    id="snapshotThreshold"
                    label="Snapshot Threshold"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder="0"
                    state={
                      checkFieldState('snapshotThreshold', 'success')
                        ? 'success'
                        : checkFieldState('snapshotThreshold', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'snapshotThreshold' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Snapshot Interval</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Set the interval (in number of changes) at which the server creates and stores document snapshots.
                  Lower values create snapshots more frequently, using more storage but improving sync performance for
                  reconnecting clients. Default: 500.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#snapshotinterval"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Snapshot Interval.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('snapshotInterval', 'error'),
                    is_success: checkFieldState('snapshotInterval', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('snapshotInterval', {
                      required: 'Snapshot Interval is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Snapshot Interval must be a positive integer',
                      },
                      onChange: async () => {
                        await trigger('snapshotInterval');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'snapshotInterval' }));
                      snapshotInterval.onChange(e.target.value);
                    }}
                    id="snapshotInterval"
                    label="Snapshot Interval"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder="0"
                    state={
                      checkFieldState('snapshotInterval', 'success')
                        ? 'success'
                        : checkFieldState('snapshotInterval', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'snapshotInterval' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>

              <dt className="sub_title">Max Attachments Per Document</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Limit the number of clients that can attach to a single document simultaneously. When exceeded, new
                  attachment requests are rejected and must be manually retried. Set to 0 for unlimited. Use this to
                  control resource usage in high-traffic scenarios.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#maxattachmentsperdocument"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Max Attachments Per Document.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('maxAttachmentsPerDocument', 'error'),
                    is_success: checkFieldState('maxAttachmentsPerDocument', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('maxAttachmentsPerDocument', {
                      required: 'Max Attachments Per Document is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Max Attachments Per Document must be a positive integer',
                      },
                      onChange: async () => {
                        await trigger('maxAttachmentsPerDocument');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'maxAttachmentsPerDocument' }));
                      maxAttachmentsPerDocument.onChange(e.target.value);
                    }}
                    id="maxAttachmentsPerDocument"
                    label="Max Attachments Per Document"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder="0"
                    state={
                      checkFieldState('maxAttachmentsPerDocument', 'success')
                        ? 'success'
                        : checkFieldState('maxAttachmentsPerDocument', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'maxAttachmentsPerDocument' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>

              <dt className="sub_title">Max Subscribers Per Document</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Limit the number of clients that can subscribe (watch for changes) to a single document simultaneously.
                  When exceeded, the SDK auto-retries subscription once per second. Set to 0 for unlimited. Use this to
                  prevent resource exhaustion from too many concurrent watchers.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#maxsubscribersperdocument"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Max Subscribers Per Document.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('maxSubscribersPerDocument', 'error'),
                    is_success: checkFieldState('maxSubscribersPerDocument', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('maxSubscribersPerDocument', {
                      required: 'Max Subscribers Per Document is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Max Subscribers Per Document must be a positive integer',
                      },
                      onChange: async () => {
                        await trigger('maxSubscribersPerDocument');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'maxSubscribersPerDocument' }));
                      maxSubscribersPerDocument.onChange(e.target.value);
                    }}
                    id="maxSubscribersPerDocument"
                    label="Max Subscribers Per Document"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder="0"
                    state={
                      checkFieldState('maxSubscribersPerDocument', 'success')
                        ? 'success'
                        : checkFieldState('maxSubscribersPerDocument', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'maxSubscribersPerDocument' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Max Size Per Document</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Set the maximum document size in bytes. Document size includes both content and CRDT metadata for
                  synchronization, so the actual size may exceed visible content. Local updates exceeding this limit are
                  rejected; remote updates are always applied to ensure consistency. Default: 10 MiB.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#maxsizeperdocument"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Max Size Per Document.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('maxSizePerDocument', 'error'),
                    is_success: checkFieldState('maxSizePerDocument', 'success'),
                  })}
                >
                  <InputTextField
                    reset={() => {
                      resetForm();
                      resetUpdateFieldInfo();
                    }}
                    {...register('maxSizePerDocument', {
                      required: 'Max Size Per Document is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Max Size Per Document must be a positive integer',
                      },
                      onChange: async () => {
                        await trigger('maxSizePerDocument');
                      },
                    })}
                    onChange={(e) => {
                      setUpdateFieldInfo((info) => ({ ...info, target: 'maxSizePerDocument' }));
                      maxSizePerDocument.onChange(e.target.value);
                    }}
                    id="maxSizePerDocument"
                    label="Max Size Per Document"
                    blindLabel={true}
                    fieldUtil={true}
                    placeholder="0"
                    state={
                      checkFieldState('maxSizePerDocument', 'success')
                        ? 'success'
                        : checkFieldState('maxSizePerDocument', 'error')
                          ? 'error'
                          : undefined
                    }
                    helperText={
                      updateFieldInfo.target === 'maxSizePerDocument' && updateFieldInfo.state !== null
                        ? updateFieldInfo.message
                        : undefined
                    }
                    onSuccessEnd={resetUpdateFieldInfo}
                  />
                </div>
              </dd>
              <dt className="sub_title">Auto Revision Enabled</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Enable automatic revision creation during snapshot creation. Revisions allow you to browse document
                  history and restore previous versions. When enabled, a revision is saved each time a snapshot is
                  created (based on Snapshot Interval). Default: enabled.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#autorevisionenabled"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Auto Revision.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('autoRevisionEnabled', 'error'),
                    is_success: checkFieldState('autoRevisionEnabled', 'success'),
                  })}
                >
                  <InputToggle
                    id="autoRevisionEnabled"
                    label=""
                    checked={autoRevisionEnabled.value}
                    onChange={(e) => {
                      autoRevisionEnabled.onChange(e.target.checked);
                      setUpdateFieldInfo((info) => ({ ...info, target: 'autoRevisionEnabled' }));
                      onSubmit({ autoRevisionEnabled: e.target.checked });
                    }}
                  />
                  {updateFieldInfo.target === 'autoRevisionEnabled' && updateFieldInfo.state !== null && (
                    <InputHelperText
                      state={updateFieldInfo.state}
                      message={updateFieldInfo.message}
                      onSuccessEnd={resetUpdateFieldInfo}
                    />
                  )}
                </div>
              </dd>
              <dt className="sub_title">Remove On Detach</dt>
              <dd className="sub_desc">
                <p className="guide">
                  Automatically delete documents when the last client detaches. Useful for temporary collaboration
                  sessions where you don&apos;t need to persist documents after editing ends. Warning: Once enabled,
                  documents are permanently deleted when all clients detach and cannot be recovered.{' '}
                  <a
                    href="https://yorkie.dev/docs/advanced/resources#removeondetach"
                    className="page_link icon_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more about Remove On Detach.
                  </a>
                </p>
                <div
                  className={classNames('input_field_box', {
                    is_error: checkFieldState('removeOnDetach', 'error'),
                    is_success: checkFieldState('removeOnDetach', 'success'),
                  })}
                >
                  <InputToggle
                    id="removeOnDetach"
                    label=""
                    checked={removeOnDetach.value}
                    onChange={(e) => {
                      removeOnDetach.onChange(e.target.checked);
                      setUpdateFieldInfo((info) => ({ ...info, target: 'removeOnDetach' }));
                      onSubmit({ removeOnDetach: e.target.checked });
                    }}
                  />
                  {updateFieldInfo.target === 'removeOnDetach' && updateFieldInfo.state !== null && (
                    <InputHelperText
                      state={updateFieldInfo.state}
                      message={updateFieldInfo.message}
                      onSuccessEnd={resetUpdateFieldInfo}
                    />
                  )}
                </div>
              </dd>
            </dl>
          </div>
        </form>
      </div>
    </div>
  );
}
