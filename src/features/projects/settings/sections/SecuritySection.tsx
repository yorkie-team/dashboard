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
import { AUTH_WEBHOOK_METHODS } from 'api/types';
import { SettingsFormSectionProps } from '../SettingsForm';

export function SecuritySection({
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
  const { field: allowedOrigins, fieldState: allowedOriginsState } = useController({ control, name: 'allowedOrigins' });
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
    if (target === 'allowedOrigins') {
      if (allowedOriginsState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: allowedOriginsState.error?.message?.toString() || '',
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
    allowedOriginsState.error?.message,
    authWebhookMaxRetriesState.error?.message,
    authWebhookMaxWaitIntervalState.error?.message,
    authWebhookMinWaitIntervalState.error?.message,
    authWebhookRequestTimeoutState.error?.message,
    authWebhookURLState.error?.message,
    setUpdateFieldInfo,
    updateFieldInfo.state,
    updateFieldInfo.target,
  ]);

  return (
    <div className="section setting_box webhook" id="security">
      <div className="setting_title">
        <strong className="text">Security</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Allowed Origins</dt>
        <dd className="sub_desc">
          <p className="guide">
            Set the allowed origins for the client to connect to the server. If you want to allow all origins, use the
            wildcard character *. Changes to this setting may take up to 10 minutes to take effect.{' '}
            <a
              href="https://yorkie.dev/docs/security#allowed-origins"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about how to set up and use Allowed Origins.
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
                onChange: async () => {
                  await trigger('allowedOrigins');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({ ...info, target: 'allowedOrigins', state: null, message: '' }));
                allowedOrigins.onChange(e);
              }}
              onBlur={(e) => {
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
            Enter the URL of the endpoint you want to use for authorization. This allows the server to check if a client
            is allowed to access a Document by calling this webhook URL. Changes to this setting may take up to 10
            minutes to take effect.{' '}
            <a
              href="https://yorkie.dev/docs/security#auth-webhook"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about how to set up and use the Auth Webhook.
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
                setUpdateFieldInfo((info) => ({ ...info, target: 'authWebhookURL', state: null, message: '' }));
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
        <dt className="sub_title">Auth Webhook Max Retries</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('authWebhookMaxRetries', 'error'),
              is_success: checkFieldState('authWebhookMaxRetries', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookMaxRetries', {
                required: 'Auth Webhook Max Retries is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Auth Webhook Max Retries must be a positive integer',
                },
                onChange: async () => {
                  await trigger('authWebhookMaxRetries');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({ ...info, target: 'authWebhookMaxRetries', state: null, message: '' }));
                authWebhookMaxRetries.onChange(e.target.value);
              }}
              id="authWebhookMaxRetries"
              label="Auth Webhook Max Retries"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('authWebhookMaxRetries', 'success')
                  ? 'success'
                  : checkFieldState('authWebhookMaxRetries', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'authWebhookMaxRetries' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
        <dt className="sub_title">Auth Webhook Min Wait Interval</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('authWebhookMinWaitInterval', 'error'),
              is_success: checkFieldState('authWebhookMinWaitInterval', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookMinWaitInterval', {
                required: 'Auth Webhook Min Wait Interval is required',
                pattern: {
                  value: /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?(\d+ms\s*)?$/,
                  message:
                    'Auth Webhook Min Wait Interval should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                },
                onChange: async () => {
                  await trigger('authWebhookMinWaitInterval');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'authWebhookMinWaitInterval',
                  state: null,
                  message: '',
                }));
                authWebhookMinWaitInterval.onChange(e.target.value);
              }}
              id="authWebhookMinWaitInterval"
              label="Auth Webhook Min Wait Interval"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('authWebhookMinWaitInterval', 'success')
                  ? 'success'
                  : checkFieldState('authWebhookMinWaitInterval', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'authWebhookMinWaitInterval' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
        <dt className="sub_title">Auth Webhook Max Wait Interval</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('authWebhookMaxWaitInterval', 'error'),
              is_success: checkFieldState('authWebhookMaxWaitInterval', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookMaxWaitInterval', {
                required: 'Auth Webhook Max Wait Interval is required',
                pattern: {
                  value: /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?(\d+ms\s*)?$/,
                  message:
                    'Auth Webhook Max Wait Interval should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                },
                onChange: async () => {
                  await trigger('authWebhookMaxWaitInterval');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'authWebhookMaxWaitInterval',
                  state: null,
                  message: '',
                }));
                authWebhookMaxWaitInterval.onChange(e.target.value);
              }}
              id="authWebhookMaxWaitInterval"
              label="Auth Webhook Max Wait Interval"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('authWebhookMaxWaitInterval', 'success')
                  ? 'success'
                  : checkFieldState('authWebhookMaxWaitInterval', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'authWebhookMaxWaitInterval' && updateFieldInfo.state !== null
                  ? updateFieldInfo.message
                  : undefined
              }
              onSuccessEnd={resetUpdateFieldInfo}
            />
          </div>
        </dd>
        <dt className="sub_title">Auth Webhook Request Timeout</dt>
        <dd className="sub_desc">
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState('authWebhookRequestTimeout', 'error'),
              is_success: checkFieldState('authWebhookRequestTimeout', 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookRequestTimeout', {
                required: 'Auth Webhook Request Timeout is required',
                pattern: {
                  value: /^(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?(\d+ms\s*)?$/,
                  message:
                    'Auth Webhook Request Timeout should be a signed sequence of decimal numbers, each with a unit suffix, such as "23h30m10s" or "2h45m"',
                },
                onChange: async () => {
                  await trigger('authWebhookRequestTimeout');
                },
              })}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'authWebhookRequestTimeout',
                  state: null,
                  message: '',
                }));
                authWebhookRequestTimeout.onChange(e.target.value);
              }}
              id="authWebhookRequestTimeout"
              label="Auth Webhook Request Timeout"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState('authWebhookRequestTimeout', 'success')
                  ? 'success'
                  : checkFieldState('authWebhookRequestTimeout', 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                updateFieldInfo.target === 'authWebhookRequestTimeout' && updateFieldInfo.state !== null
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
