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

import React, { useEffect } from 'react';
import classNames from 'classnames';
import { InputHelperText, InputTextField, InputToggle } from 'components';
import { useController } from 'react-hook-form';
import { AUTH_WEBHOOK_METHODS, EVENT_WEBHOOK_EVENTS } from 'api/types';
import { SettingsFormSectionProps } from '../SettingsForm';

export function WebhooksSection({
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
}: SettingsFormSectionProps) {
  const { field: eventWebhookURLField, fieldState: eventWebhookURLState } = useController({
    control,
    name: 'eventWebhookURL',
  });
  const { field: webhookEventField } = useController({
    control,
    name: 'eventWebhookEvents',
  });
  const { field: eventWebhookMaxRetries, fieldState: eventWebhookMaxRetriesState } = useController({
    control,
    name: 'eventWebhookMaxRetries',
  });
  const { field: eventWebhookMinWaitInterval, fieldState: eventWebhookMinWaitIntervalState } = useController({
    control,
    name: 'eventWebhookMinWaitInterval',
  });
  const { field: eventWebhookMaxWaitInterval, fieldState: eventWebhookMaxWaitIntervalState } = useController({
    control,
    name: 'eventWebhookMaxWaitInterval',
  });
  const { field: eventWebhookRequestTimeout, fieldState: eventWebhookRequestTimeoutState } = useController({
    control,
    name: 'eventWebhookRequestTimeout',
  });
  const { field: authWebhookURLField, fieldState: authWebhookURLState } = useController({
    control,
    name: 'authWebhookURL',
  });
  const { field: webhookMethodField } = useController({
    control,
    name: 'authWebhookMethods',
  });
  const { field: authWebhookMaxRetries, fieldState: authWebhookMaxRetriesState } = useController({
    control,
    name: 'authWebhookMaxRetries',
  });
  const { field: authWebhookMinWaitInterval, fieldState: authWebhookMinWaitIntervalState } = useController({
    control,
    name: 'authWebhookMinWaitInterval',
  });
  const { field: authWebhookMaxWaitInterval, fieldState: authWebhookMaxWaitIntervalState } = useController({
    control,
    name: 'authWebhookMaxWaitInterval',
  });
  const { field: authWebhookRequestTimeout, fieldState: authWebhookRequestTimeoutState } = useController({
    control,
    name: 'authWebhookRequestTimeout',
  });

  useEffect(() => {
    if (updateFieldInfo.state === 'success') return;
    const target = updateFieldInfo.target;

    if (target === 'eventWebhookURL') {
      if (eventWebhookURLState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: eventWebhookURLState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'eventWebhookMaxRetries') {
      if (eventWebhookMaxRetriesState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: eventWebhookMaxRetriesState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'eventWebhookMinWaitInterval') {
      if (eventWebhookMinWaitIntervalState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: eventWebhookMinWaitIntervalState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'eventWebhookMaxWaitInterval') {
      if (eventWebhookMaxWaitIntervalState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: eventWebhookMaxWaitIntervalState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'eventWebhookRequestTimeout') {
      if (eventWebhookRequestTimeoutState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: eventWebhookRequestTimeoutState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'authWebhookURL') {
      if (authWebhookURLState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: authWebhookURLState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'authWebhookMaxRetries') {
      if (authWebhookMaxRetriesState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: authWebhookMaxRetriesState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'authWebhookMinWaitInterval') {
      if (authWebhookMinWaitIntervalState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: authWebhookMinWaitIntervalState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'authWebhookMaxWaitInterval') {
      if (authWebhookMaxWaitIntervalState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: authWebhookMaxWaitIntervalState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'authWebhookRequestTimeout') {
      if (authWebhookRequestTimeoutState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: authWebhookRequestTimeoutState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
    }
  }, [
    authWebhookMaxRetriesState.error?.message,
    authWebhookMaxWaitIntervalState.error?.message,
    authWebhookMinWaitIntervalState.error?.message,
    authWebhookRequestTimeoutState.error?.message,
    authWebhookURLState.error?.message,
    eventWebhookMaxRetriesState.error?.message,
    eventWebhookMaxWaitIntervalState.error?.message,
    eventWebhookMinWaitIntervalState.error?.message,
    eventWebhookRequestTimeoutState.error?.message,
    eventWebhookURLState.error?.message,
    setUpdateFieldInfo,
    updateFieldInfo.state,
    updateFieldInfo.target,
  ]);

  return (
    <div className="section setting_box webhook" id="webhooks">
      <div className="setting_title">
        <strong className="text">Webhooks</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Webhook URL</dt>
        <dd className="sub_desc">
          <p className="guide">
            Enter the URL of the endpoint you want to use for event. When a document in this project is changed, server
            will send a request to this webhook URL. Changes to this setting may take up to 10 minutes to take
            effect.{' '}
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
                setUpdateFieldInfo((info) => ({ ...info, target: 'eventWebhookURL', state: null, message: '' }));
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
        <dt className="sub_title">Event Webhook Max Retries</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('eventWebhookMaxRetries', 'error'),
              is_success: checkFieldState('eventWebhookMaxRetries', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookMaxRetries', {
                required: 'Event Webhook Max Retries is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Event Webhook Max Retries must be a positive integer',
                },
                onChange: async () => {
                  await trigger('eventWebhookMaxRetries');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({ ...info, target: 'eventWebhookMaxRetries', state: null, message: '' }));
                eventWebhookMaxRetries.onChange(e.target.value);
              }}
              id="eventWebhookMaxRetries"
              label="Event Webhook Max Retries"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('eventWebhookMaxRetries', 'success')
                  ? 'success'
                  : checkFieldState('eventWebhookMaxRetries', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'eventWebhookMaxRetries' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
        <dt className="sub_title">Event Webhook Min Wait Interval</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('eventWebhookMinWaitInterval', 'error'),
              is_success: checkFieldState('eventWebhookMinWaitInterval', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookMinWaitInterval', {
                required: 'Event Webhook Min Wait Interval is required',
                pattern: {
                  value: /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?(\d+ms\s*)?$/,
                  message:
                    'Event Webhook Min Wait Interval should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                },
                onChange: async () => {
                  await trigger('eventWebhookMinWaitInterval');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'eventWebhookMinWaitInterval',
                  state: null,
                  message: '',
                }));
                eventWebhookMinWaitInterval.onChange(e.target.value);
              }}
              id="eventWebhookMinWaitInterval"
              label="Event Webhook Min Wait Interval"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('eventWebhookMinWaitInterval', 'success')
                  ? 'success'
                  : checkFieldState('eventWebhookMinWaitInterval', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'eventWebhookMinWaitInterval' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
        <dt className="sub_title">Event Webhook Max Wait Interval</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('eventWebhookMaxWaitInterval', 'error'),
              is_success: checkFieldState('eventWebhookMaxWaitInterval', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookMaxWaitInterval', {
                required: 'Event Webhook Max Wait Interval is required',
                pattern: {
                  value: /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?(\d+ms\s*)?$/,
                  message:
                    'Event Webhook Max Wait Interval should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                },
                onChange: async () => {
                  await trigger('eventWebhookMaxWaitInterval');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'eventWebhookMaxWaitInterval',
                  state: null,
                  message: '',
                }));
                eventWebhookMaxWaitInterval.onChange(e.target.value);
              }}
              id="eventWebhookMaxWaitInterval"
              label="Event Webhook Max Wait Interval"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('eventWebhookMaxWaitInterval', 'success')
                  ? 'success'
                  : checkFieldState('eventWebhookMaxWaitInterval', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'eventWebhookMaxWaitInterval' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
        <dt className="sub_title">Event Webhook Request Timeout</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('eventWebhookRequestTimeout', 'error'),
              is_success: checkFieldState('eventWebhookRequestTimeout', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookRequestTimeout', {
                required: 'Event Webhook Request Timeout is required',
                pattern: {
                  value: /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?(\d+ms\s*)?$/,
                  message:
                    'Event Webhook Request Timeout should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                },
                onChange: async () => {
                  await trigger('eventWebhookRequestTimeout');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'eventWebhookRequestTimeout',
                  state: null,
                  message: '',
                }));
                eventWebhookRequestTimeout.onChange(e.target.value);
              }}
              id="eventWebhookRequestTimeout"
              label="Event Webhook Request Timeout"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('eventWebhookRequestTimeout', 'success')
                  ? 'success'
                  : checkFieldState('eventWebhookRequestTimeout', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'eventWebhookRequestTimeout' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
      </dl>
    </div>
  );
}
