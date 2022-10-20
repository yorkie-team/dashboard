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

import React, { useCallback, useEffect, useState, useRef } from 'react';
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
} from './projectsSlice';
import { AUTH_WEBHOOK_METHODS, UpdatableProjectFields, AuthWebhookMethod } from 'api/types';
import { Icon, InputHelperText, InputTextField } from 'components';

export type UpdateFieldInfo = {
  target: keyof UpdatableProjectFields | AuthWebhookMethod | null;
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
    },
  });

  const { field: nameField, fieldState: nameFieldState } = useController({ control, name: 'name' });
  const { field: webhookURLField, fieldState: webhookURLFieldState } = useController({
    control,
    name: 'authWebhookURL',
  });
  const { field: webhookMethodField } = useController({
    control,
    name: 'authWebhookMethods',
  });
  const checkFieldState = useCallback(
    (fieldName: keyof UpdatableProjectFields | AuthWebhookMethod, state: 'success' | 'error'): boolean => {
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
    if (updateFieldInfo.state !== 'success' && !nameFieldState.error && !webhookURLFieldState.error) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: null,
      }));
      return;
    }
    if (nameFieldState.error || webhookURLFieldState.error) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: 'error',
        message: formErrors[updateFieldInfo.target as keyof UpdatableProjectFields]?.message || '',
      }));
    }
  }, [formErrors, updateFieldInfo.state, updateFieldInfo.target, nameFieldState.error, webhookURLFieldState.error]);

  useEffect(() => {
    if (isSuccess) {
      setUpdateFieldInfo((info) => ({ ...info, state: 'success', message: 'Success' }));
      navigate(`../projects/${project?.name}/settings`);
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
      <SideNavigation />
      <div className="box_right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section setting_box" id="sectionGeneral">
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
            </dl>
          </div>
          <div className="section setting_box webhook" id="sectionWebhook">
            <div className="setting_title">
              <strong className="text">Webhook</strong>
            </div>
            <dl className="sub_info">
              <dt className="sub_title">Auth webhook URL</dt>
              <dd className="sub_desc">
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
                      webhookURLField.onChange(e.target.value);
                    }}
                    id="authWebhookURL"
                    label="authWebhookURL"
                    blindLabel={true}
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
              <dt className="sub_title">Auth webhook methods</dt>
              <dd className="sub_desc">
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
                        name={method}
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
              </dd>
            </dl>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputToggle({
  name,
  checked,
  onChange,
}: {
  name: AuthWebhookMethod;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label htmlFor={name} className="input_toggle_box">
      <input type="checkbox" id={name} value={name} className="blind" checked={checked} onChange={onChange} />
      <em className="toggle_ui">
        <span className="track"></span>
        <Icon type="check" className="ball" />
      </em>
      <span className="label">{name}</span>
    </label>
  );
}

const SideNavigation = () => {
  const [activeId, setActiveId] = useState<'sectionGeneral' | 'sectionWebhook'>('sectionGeneral');
  const contentRef = useRef<any>({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (observedContent) => {
      observedContent.forEach((content) => {
        contentRef.current[content.target.id] = content;
      });

      const visibleContents = Object.values(contentRef.current).filter((content: any) => content.isIntersecting) as any;
      setActiveId(visibleContents[0]?.target.id);
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px',
    });

    const contents = document.querySelectorAll('.section');
    contents.forEach((content) => {
      observer.observe(content);
    });

    return () => observer.disconnect();
  }, [setActiveId]);

  return (
    <nav className="navigator">
      <ul className="navigator_list">
        <li className={classNames('navigator_group', { is_active: activeId === 'sectionGeneral' })}>
          <a href="#sectionGeneral" className="navigator_item">
            General
          </a>
        </li>
        <li className={classNames('navigator_group', { is_active: activeId === 'sectionWebhook' })}>
          <a href="#sectionWebhook" className="navigator_item">
            Webhook
          </a>
        </li>
      </ul>
    </nav>
  );
};
