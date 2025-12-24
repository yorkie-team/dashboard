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
import { EVENT_WEBHOOK_EVENTS } from 'api/types';
import { SettingsFormSectionProps } from '../SettingsForm';
import { makeTarget, isFieldTarget, isEventWebhookEventTarget } from 'hooks/useProjectSettingsForm';

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

  useEffect(() => {
    if (updateFieldInfo.state === 'success') return;
    const target = updateFieldInfo.target;

    if (isFieldTarget(target, 'eventWebhookURL')) {
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

    if (isFieldTarget(target, 'eventWebhookMaxRetries')) {
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

    if (isFieldTarget(target, 'eventWebhookMinWaitInterval')) {
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

    if (isFieldTarget(target, 'eventWebhookMaxWaitInterval')) {
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

    if (isFieldTarget(target, 'eventWebhookRequestTimeout')) {
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
  }, [
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
              is_error: checkFieldState(makeTarget.field('eventWebhookURL'), 'error'),
              is_success: checkFieldState(makeTarget.field('eventWebhookURL'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookURL')}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('eventWebhookURL'),
                  state: null,
                  message: '',
                }));
                eventWebhookURLField.onChange(e.target.value);
              }}
              id="eventWebhookURL"
              label="eventWebhookURL"
              blindLabel={true}
              placeholder="http://localhost:8080/event"
              fieldUtil={true}
              state={
                checkFieldState(makeTarget.field('eventWebhookURL'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('eventWebhookURL'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'eventWebhookURL') && updateFieldInfo.state !== null
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
                    is_error: checkFieldState(makeTarget.eventWebhookEvent(event), 'error'),
                    is_success: checkFieldState(makeTarget.eventWebhookEvent(event), 'success'),
                  })}
                  key={event}
                >
                  <InputToggle
                    id={event}
                    label={event}
                    checked={webhookEventField.value.includes(event)}
                    onChange={(e) => {
                      const baseEvents = Array.isArray(webhookEventField.value) ? webhookEventField.value : [];
                      let newWebhookEvents = [...baseEvents];
                      if (e.target.checked) {
                        newWebhookEvents = newWebhookEvents.includes(event)
                          ? newWebhookEvents
                          : [...newWebhookEvents, event];
                      } else {
                        newWebhookEvents = newWebhookEvents.filter((newEvent) => newEvent !== event);
                      }
                      webhookEventField.onChange(newWebhookEvents);
                      setUpdateFieldInfo((info) => ({
                        ...info,
                        target: makeTarget.eventWebhookEvent(event),
                      }));
                      onSubmit({ eventWebhookEvents: newWebhookEvents });
                    }}
                  />
                  {isEventWebhookEventTarget(updateFieldInfo.target, event) && updateFieldInfo.state !== null && (
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
              is_error: checkFieldState(makeTarget.field('eventWebhookMaxRetries'), 'error'),
              is_success: checkFieldState(makeTarget.field('eventWebhookMaxRetries'), 'success'),
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
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('eventWebhookMaxRetries'),
                  state: null,
                  message: '',
                }));
                eventWebhookMaxRetries.onChange(e.target.value);
              }}
              id="eventWebhookMaxRetries"
              label="Event Webhook Max Retries"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('eventWebhookMaxRetries'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('eventWebhookMaxRetries'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'eventWebhookMaxRetries') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('eventWebhookMinWaitInterval'), 'error'),
              is_success: checkFieldState(makeTarget.field('eventWebhookMinWaitInterval'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookMinWaitInterval', {
                required: 'Event Webhook Min Wait Interval is required',
                validate: (value: string) => {
                  if (!value.trim()) return 'Event Webhook Min Wait Interval is required';
                  const pattern = /^(\d+h\s*)?([0-5]?[0-9]m\s*)?([0-5]?[0-9]s\s*)?(\d+ms\s*)?$/;
                  if (!pattern.test(value)) {
                    return 'Event Webhook Min Wait Interval should be a valid duration, such as "24h0m0s", "100ms", or "3s" (minutes/seconds: 0-59)';
                  }
                  if (!/(\d+h|\d+m|\d+s|\d+ms)/.test(value)) {
                    return 'Event Webhook Min Wait Interval must include at least one time unit (h, m, s, or ms)';
                  }
                  return true;
                },
                onChange: async () => {
                  await trigger('eventWebhookMinWaitInterval');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('eventWebhookMinWaitInterval'),
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
                checkFieldState(makeTarget.field('eventWebhookMinWaitInterval'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('eventWebhookMinWaitInterval'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'eventWebhookMinWaitInterval') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('eventWebhookMaxWaitInterval'), 'error'),
              is_success: checkFieldState(makeTarget.field('eventWebhookMaxWaitInterval'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookMaxWaitInterval', {
                required: 'Event Webhook Max Wait Interval is required',
                validate: (value: string) => {
                  if (!value.trim()) return 'Event Webhook Max Wait Interval is required';
                  const pattern = /^(\d+h\s*)?([0-5]?[0-9]m\s*)?([0-5]?[0-9]s\s*)?(\d+ms\s*)?$/;
                  if (!pattern.test(value)) {
                    return 'Event Webhook Max Wait Interval should be a valid duration, such as "24h0m0s", "100ms", or "3s" (minutes/seconds: 0-59)';
                  }
                  if (!/(\d+h|\d+m|\d+s|\d+ms)/.test(value)) {
                    return 'Event Webhook Max Wait Interval must include at least one time unit (h, m, s, or ms)';
                  }
                  return true;
                },
                onChange: async () => {
                  await trigger('eventWebhookMaxWaitInterval');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('eventWebhookMaxWaitInterval'),
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
                checkFieldState(makeTarget.field('eventWebhookMaxWaitInterval'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('eventWebhookMaxWaitInterval'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'eventWebhookMaxWaitInterval') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('eventWebhookRequestTimeout'), 'error'),
              is_success: checkFieldState(makeTarget.field('eventWebhookRequestTimeout'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('eventWebhookRequestTimeout', {
                required: 'Event Webhook Request Timeout is required',
                validate: (value: string) => {
                  if (!value.trim()) return 'Event Webhook Request Timeout is required';
                  const pattern = /^(\d+h\s*)?([0-5]?[0-9]m\s*)?([0-5]?[0-9]s\s*)?(\d+ms\s*)?$/;
                  if (!pattern.test(value)) {
                    return 'Event Webhook Request Timeout should be a valid duration, such as "24h0m0s", "100ms", or "3s" (minutes/seconds: 0-59)';
                  }
                  if (!/(\d+h|\d+m|\d+s|\d+ms)/.test(value)) {
                    return 'Event Webhook Request Timeout must include at least one time unit (h, m, s, or ms)';
                  }
                  return true;
                },
                onChange: async () => {
                  await trigger('eventWebhookRequestTimeout');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('eventWebhookRequestTimeout'),
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
                checkFieldState(makeTarget.field('eventWebhookRequestTimeout'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('eventWebhookRequestTimeout'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'eventWebhookRequestTimeout') && updateFieldInfo.state !== null
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
