import React, { useEffect } from 'react';
import classNames from 'classnames';
import { InputTextField } from 'components';
import { useController } from 'react-hook-form';
import { SettingsFormSectionProps } from '../SettingsForm';

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

    if (target === 'maxAttachmentsPerDocument') {
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

    if (target === 'maxSubscribersPerDocument') {
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

    if (target === 'maxSizePerDocument') {
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
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'maxAttachmentsPerDocument',
                  state: null,
                  message: '',
                }));
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
                setUpdateFieldInfo((info) => ({
                  ...info,
                  target: 'maxSubscribersPerDocument',
                  state: null,
                  message: '',
                }));
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
                setUpdateFieldInfo((info) => ({ ...info, target: 'maxSizePerDocument', state: null, message: '' }));
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
      </dl>
    </div>
  );
}
