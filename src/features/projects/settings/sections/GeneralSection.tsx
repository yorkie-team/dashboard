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
import { InputTextField } from 'components';
import { useController } from 'react-hook-form';
import { SettingsFormSectionProps } from '../SettingsForm';

export function GeneralSection({
  register,
  trigger,
  control,
  updateFieldInfo,
  checkFieldState,
  resetUpdateFieldInfo,
  resetForm,
  setUpdateFieldInfo,
}: SettingsFormSectionProps) {
  const { field: nameField, fieldState: nameFieldState } = useController({ control, name: 'name' });

  useEffect(() => {
    if (updateFieldInfo.target !== 'name' || updateFieldInfo.state === 'success') return;
    if (nameFieldState.error?.message) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: 'error',
        message: nameFieldState.error?.message?.toString() || '',
      }));
      return;
    }
    if (updateFieldInfo.state === 'error') {
      setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
    }
  }, [nameFieldState.error?.message, setUpdateFieldInfo, updateFieldInfo.state, updateFieldInfo.target]);

  return (
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
                setUpdateFieldInfo((info) => ({ ...info, target: 'name', state: null, message: '' }));
                nameField.onChange(e.target.value);
              }}
              id="name"
              label="Project name"
              blindLabel={true}
              fieldUtil={true}
              state={
                checkFieldState('name', 'success') ? 'success' : checkFieldState('name', 'error') ? 'error' : undefined
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
      </dl>
    </div>
  );
}
