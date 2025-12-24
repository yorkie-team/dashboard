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
import { makeTarget, isFieldTarget, isAuthWebhookMethodTarget } from 'hooks/useProjectSettingsForm';

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
    if (isFieldTarget(target, 'allowedOrigins')) {
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
    if (isFieldTarget(target, 'authWebhookURL')) {
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
    if (isFieldTarget(target, 'authWebhookMaxRetries')) {
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
    if (isFieldTarget(target, 'authWebhookMinWaitInterval')) {
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
    if (isFieldTarget(target, 'authWebhookMaxWaitInterval')) {
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
    if (isFieldTarget(target, 'authWebhookRequestTimeout')) {
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
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('allowedOrigins'),
                  state: null,
                  message: '',
                }));
                allowedOrigins.onChange(e);
                await trigger('allowedOrigins');
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
                checkFieldState(makeTarget.field('allowedOrigins'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('allowedOrigins'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'allowedOrigins') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('authWebhookURL'), 'error'),
              is_success: checkFieldState(makeTarget.field('authWebhookURL'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookURL')}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('authWebhookURL'),
                  state: null,
                  message: '',
                }));
                authWebhookURLField.onChange(e.target.value);
              }}
              id="authWebhookURL"
              label="authWebhookURL"
              blindLabel={true}
              placeholder="http://localhost:8080/auth"
              fieldUtil={true}
              state={
                checkFieldState(makeTarget.field('authWebhookURL'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('authWebhookURL'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'authWebhookURL') && updateFieldInfo.state !== null
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
                    is_error: checkFieldState(makeTarget.authWebhookMethod(method), 'error'),
                    is_success: checkFieldState(makeTarget.authWebhookMethod(method), 'success'),
                  })}
                  key={method}
                >
                  <InputToggle
                    id={method}
                    label={method}
                    checked={webhookMethodField.value.includes(method)}
                    onChange={(e) => {
                      const baseMethods = Array.isArray(webhookMethodField.value) ? webhookMethodField.value : [];
                      let newWebhookMethods = [...baseMethods];
                      if (e.target.checked) {
                        newWebhookMethods = newWebhookMethods.includes(method)
                          ? newWebhookMethods
                          : [...newWebhookMethods, method];
                      } else {
                        newWebhookMethods = newWebhookMethods.filter((newMethod) => newMethod !== method);
                      }
                      webhookMethodField.onChange(newWebhookMethods);
                      setUpdateFieldInfo((info) => ({ ...info, target: makeTarget.authWebhookMethod(method) }));
                      onSubmit({ authWebhookMethods: newWebhookMethods });
                    }}
                  />
                  {isAuthWebhookMethodTarget(updateFieldInfo.target, method) && updateFieldInfo.state !== null && (
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
              is_error: checkFieldState(makeTarget.field('authWebhookMaxRetries'), 'error'),
              is_success: checkFieldState(makeTarget.field('authWebhookMaxRetries'), 'success'),
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
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('authWebhookMaxRetries'),
                  state: null,
                  message: '',
                }));
                authWebhookMaxRetries.onChange(e.target.value);
                await trigger('authWebhookMaxRetries');
              }}
              id="authWebhookMaxRetries"
              label="Auth Webhook Max Retries"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('authWebhookMaxRetries'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('authWebhookMaxRetries'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'authWebhookMaxRetries') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('authWebhookMinWaitInterval'), 'error'),
              is_success: checkFieldState(makeTarget.field('authWebhookMinWaitInterval'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookMinWaitInterval', {
                required: 'Auth Webhook Min Wait Interval is required',
                validate: (value: string) => {
                  if (!value.trim()) return 'Auth Webhook Min Wait Interval is required';
                  const pattern = /^(\d+h\s*)?([0-5]?[0-9]m\s*)?([0-5]?[0-9]s\s*)?(\d+ms\s*)?$/;
                  if (!pattern.test(value)) {
                    return 'Auth Webhook Min Wait Interval should be a valid duration, such as "24h0m0s", "100ms", or "3s" (minutes/seconds: 0-59)';
                  }
                  if (!/(\d+h|\d+m|\d+s|\d+ms)/.test(value)) {
                    return 'Auth Webhook Min Wait Interval must include at least one time unit (h, m, s, or ms)';
                  }
                  return true;
                },
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('authWebhookMinWaitInterval'),
                  state: null,
                  message: '',
                }));
                authWebhookMinWaitInterval.onChange(e.target.value);
                await trigger('authWebhookMinWaitInterval');
              }}
              id="authWebhookMinWaitInterval"
              label="Auth Webhook Min Wait Interval"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('authWebhookMinWaitInterval'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('authWebhookMinWaitInterval'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'authWebhookMinWaitInterval') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('authWebhookMaxWaitInterval'), 'error'),
              is_success: checkFieldState(makeTarget.field('authWebhookMaxWaitInterval'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookMaxWaitInterval', {
                required: 'Auth Webhook Max Wait Interval is required',
                validate: (value: string) => {
                  if (!value.trim()) return 'Auth Webhook Max Wait Interval is required';
                  const pattern = /^(\d+h\s*)?([0-5]?[0-9]m\s*)?([0-5]?[0-9]s\s*)?(\d+ms\s*)?$/;
                  if (!pattern.test(value)) {
                    return 'Auth Webhook Max Wait Interval should be a valid duration, such as "24h0m0s", "100ms", or "3s" (minutes/seconds: 0-59)';
                  }
                  if (!/(\d+h|\d+m|\d+s|\d+ms)/.test(value)) {
                    return 'Auth Webhook Max Wait Interval must include at least one time unit (h, m, s, or ms)';
                  }
                  return true;
                },
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('authWebhookMaxWaitInterval'),
                  state: null,
                  message: '',
                }));
                authWebhookMaxWaitInterval.onChange(e.target.value);
                await trigger('authWebhookMaxWaitInterval');
              }}
              id="authWebhookMaxWaitInterval"
              label="Auth Webhook Max Wait Interval"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('authWebhookMaxWaitInterval'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('authWebhookMaxWaitInterval'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'authWebhookMaxWaitInterval') && updateFieldInfo.state !== null
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
              is_error: checkFieldState(makeTarget.field('authWebhookRequestTimeout'), 'error'),
              is_success: checkFieldState(makeTarget.field('authWebhookRequestTimeout'), 'success'),
            })}
          >
            <InputTextField
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              {...register('authWebhookRequestTimeout', {
                required: 'Auth Webhook Request Timeout is required',
                validate: (value: string) => {
                  if (!value.trim()) return 'Auth Webhook Request Timeout is required';
                  const pattern = /^(\d+h\s*)?([0-5]?[0-9]m\s*)?([0-5]?[0-9]s\s*)?(\d+ms\s*)?$/;
                  if (!pattern.test(value)) {
                    return 'Auth Webhook Request Timeout should be a valid duration, such as "24h0m0s", "100ms", or "3s" (minutes/seconds: 0-59)';
                  }
                  if (!/(\d+h|\d+m|\d+s|\d+ms)/.test(value)) {
                    return 'Auth Webhook Request Timeout must include at least one time unit (h, m, s, or ms)';
                  }
                  return true;
                },
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('authWebhookRequestTimeout'),
                  state: null,
                  message: '',
                }));
                authWebhookRequestTimeout.onChange(e.target.value);
                await trigger('authWebhookRequestTimeout');
              }}
              id="authWebhookRequestTimeout"
              label="Auth Webhook Request Timeout"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('authWebhookRequestTimeout'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('authWebhookRequestTimeout'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'authWebhookRequestTimeout') && updateFieldInfo.state !== null
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
