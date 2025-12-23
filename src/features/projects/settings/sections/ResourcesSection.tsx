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
import { SettingsFormSectionProps } from '../SettingsForm';

export function ResourcesSection({
  register,
  trigger,
  control,
  onSubmit,
  updateFieldInfo,
  checkFieldState,
  resetUpdateFieldInfo,
  resetForm,
  setUpdateFieldInfo,
}: SettingsFormSectionProps) {
  const { field: clientDeactivateThreshold, fieldState: clientDeactivateThresholdState } = useController({
    control,
    name: 'clientDeactivateThreshold',
  });
  const { field: snapshotThreshold, fieldState: snapshotThresholdState } = useController({
    control,
    name: 'snapshotThreshold',
  });
  const { field: snapshotInterval, fieldState: snapshotIntervalState } = useController({
    control,
    name: 'snapshotInterval',
  });
  const { field: autoRevisionEnabled } = useController({ control, name: 'autoRevisionEnabled' });
  const { field: removeOnDetach } = useController({ control, name: 'removeOnDetach' });

  useEffect(() => {
    if (updateFieldInfo.state === 'success') return;
    const target = updateFieldInfo.target;

    if (target === 'clientDeactivateThreshold') {
      if (clientDeactivateThresholdState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: clientDeactivateThresholdState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'snapshotThreshold') {
      if (snapshotThresholdState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: snapshotThresholdState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (target === 'snapshotInterval') {
      if (snapshotIntervalState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: snapshotIntervalState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
    }
  }, [
    clientDeactivateThresholdState.error?.message,
    setUpdateFieldInfo,
    snapshotIntervalState.error?.message,
    snapshotThresholdState.error?.message,
    updateFieldInfo.state,
    updateFieldInfo.target,
  ]);

  return (
    <div className="section setting_box" id="resources">
      <div className="setting_title">
        <strong className="text">Resources</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Client Deactivate Threshold</dt>
        <dd className="sub_desc">
          <p className="guide">
            Set the duration for automatic client deactivation on documents in this project. To improve garbage
            collection efficiency, clients inactive for this period will be automatically deactivated.{' '}
            <a
              href="https://github.com/yorkie-team/yorkie/blob/main/design/housekeeping.md"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about deactivating outdated clients and improving GC efficiency.
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
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'clientDeactivateThreshold',
                  state: null,
                  message: '',
                }));
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
            Set the threshold (in number of operations) whether the server returns snapshots to clients for documents in
            this project. If the number of operations since the last snapshot exceeds this threshold, the server will
            return the latest snapshot to the client.
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
                setUpdateFieldInfo((info) => ({ ...info, target: 'snapshotThreshold', state: null, message: '' }));
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
            Set the interval (in number of operations) at which snapshots are created in server for documents in this
            project. If the interval is set to 500, the server creates a snapshot every 500 operations.
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
                setUpdateFieldInfo((info) => ({ ...info, target: 'snapshotInterval', state: null, message: '' }));
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
        <dt className="sub_title">Auto Revision Enabled</dt>
        <dd className="sub_desc">
          <p className="guide">
            Enable automatic creation of revisions for documents in this project. When enabled, revisions will be
            automatically created at Snapshot Intervals.{' '}
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
            Set whether to remove the document when all clients are detached from the document.{' '}
            <a
              href="https://yorkie.dev/docs/js-sdk#detaching-the-document"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about detaching the document.
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
  );
}
