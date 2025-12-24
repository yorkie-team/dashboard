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
import { makeTarget, isFieldTarget } from 'hooks/useProjectSettingsForm';

export function LimitsSection({
  register,
  trigger,
  control,
  updateFieldInfo,
  checkFieldState,
  resetUpdateFieldInfo,
  resetForm,
  setUpdateFieldInfo,
}: SettingsFormSectionProps) {
  const { field: maxAttachmentsPerDocument, fieldState: maxAttachmentsPerDocumentState } = useController({
    control,
    name: 'maxAttachmentsPerDocument',
  });
  const { field: maxSubscribersPerDocument, fieldState: maxSubscribersPerDocumentState } = useController({
    control,
    name: 'maxSubscribersPerDocument',
  });
  const { field: maxSizePerDocument, fieldState: maxSizePerDocumentState } = useController({
    control,
    name: 'maxSizePerDocument',
  });

  useEffect(() => {
    if (updateFieldInfo.state === 'success') return;
    const target = updateFieldInfo.target;

    if (isFieldTarget(target, 'maxAttachmentsPerDocument')) {
      if (maxAttachmentsPerDocumentState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: maxAttachmentsPerDocumentState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (isFieldTarget(target, 'maxSubscribersPerDocument')) {
      if (maxSubscribersPerDocumentState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: maxSubscribersPerDocumentState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
      return;
    }

    if (isFieldTarget(target, 'maxSizePerDocument')) {
      if (maxSizePerDocumentState.error?.message) {
        setUpdateFieldInfo((info) => ({
          ...info,
          state: 'error',
          message: maxSizePerDocumentState.error?.message?.toString() || '',
        }));
        return;
      }
      if (updateFieldInfo.state === 'error') setUpdateFieldInfo((info) => ({ ...info, state: null, message: '' }));
    }
  }, [
    maxAttachmentsPerDocumentState.error?.message,
    maxSizePerDocumentState.error?.message,
    maxSubscribersPerDocumentState.error?.message,
    setUpdateFieldInfo,
    updateFieldInfo.state,
    updateFieldInfo.target,
  ]);

  return (
    <div className="section setting_box" id="limits">
      <div className="setting_title">
        <strong className="text">Limits</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Max Attachments Per Document</dt>
        <dd className="sub_desc">
          <p className="guide">
            Set the maximum number of clients that can be attached to a single document simultaneously. When this limit
            is reached, new attachment requests will be rejected by the server.{' '}
            <a
              href="https://yorkie.dev/docs/js-sdk#max-attachments-per-document"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about Max Attachments Per Document.
            </a>
          </p>
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState(makeTarget.field('maxAttachmentsPerDocument'), 'error'),
              is_success: checkFieldState(makeTarget.field('maxAttachmentsPerDocument'), 'success'),
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
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('maxAttachmentsPerDocument'),
                  state: null,
                  message: '',
                }));
                maxAttachmentsPerDocument.onChange(e.target.value);
                await trigger('maxAttachmentsPerDocument');
              }}
              id="maxAttachmentsPerDocument"
              label="Max Attachments Per Document"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('maxAttachmentsPerDocument'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('maxAttachmentsPerDocument'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'maxAttachmentsPerDocument') && updateFieldInfo.state !== null
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
            Set the maximum number of clients that can be subscribed to a single document simultaneously. When this
            limit is reached, new subscription requests will be rejected by the server.{' '}
            <a
              href="https://yorkie.dev/docs/js-sdk#max-subscribers-per-document"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about Max Subscribers Per Document.
            </a>
          </p>
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState(makeTarget.field('maxSubscribersPerDocument'), 'error'),
              is_success: checkFieldState(makeTarget.field('maxSubscribersPerDocument'), 'success'),
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
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('maxSubscribersPerDocument'),
                  state: null,
                  message: '',
                }));
                maxSubscribersPerDocument.onChange(e.target.value);
                await trigger('maxSubscribersPerDocument');
              }}
              id="maxSubscribersPerDocument"
              label="Max Subscribers Per Document"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('maxSubscribersPerDocument'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('maxSubscribersPerDocument'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'maxSubscribersPerDocument') && updateFieldInfo.state !== null
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
            Set the maximum size of a document in bytes. When this limit is reached, document edit requests will be
            rejected by the server.{' '}
            <a
              href="https://yorkie.dev/docs/js-sdk#max-document-size-limit"
              className="page_link icon_link"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about Max Document Size Per Document.
            </a>
          </p>
          <div
            className={classNames('input_field_box', {
              is_error: checkFieldState(makeTarget.field('maxSizePerDocument'), 'error'),
              is_success: checkFieldState(makeTarget.field('maxSizePerDocument'), 'success'),
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
              })}
              onChange={async (e) => {
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: makeTarget.field('maxSizePerDocument'),
                  state: null,
                  message: '',
                }));
                maxSizePerDocument.onChange(e.target.value);
                await trigger('maxSizePerDocument');
              }}
              id="maxSizePerDocument"
              label="Max Size Per Document"
              blindLabel={true}
              fieldUtil={true}
              placeholder="0"
              state={
                checkFieldState(makeTarget.field('maxSizePerDocument'), 'success')
                  ? 'success'
                  : checkFieldState(makeTarget.field('maxSizePerDocument'), 'error')
                    ? 'error'
                    : undefined
              }
              helperText={
                isFieldTarget(updateFieldInfo.target, 'maxSizePerDocument') && updateFieldInfo.state !== null
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
