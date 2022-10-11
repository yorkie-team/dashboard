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
import { useForm, useController, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useOutsideClick, useAreaBlur } from 'hooks';
import {
  selectProjectDetail,
  updateProjectAsync,
  ProjectUpdateFields,
  selectProjectUpdate,
  resetUpdateSuccess,
} from './projectsSlice';
import { AUTH_WEBHOOK_METHODS, UpdatableProjectFields, AuthWebhookMethod } from 'api/types';
import { SettingsAlertMessage } from 'features/projects';

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

  const resetUpdateFieldInfo = () => {
    setUpdateFieldInfo({ target: null, state: null, message: '' });
  };

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
    if (!nameFieldState.error && !webhookURLFieldState.error) return;
    setUpdateFieldInfo((info) => ({
      ...info,
      state: 'error',
      message: formErrors[updateFieldInfo.target as keyof UpdatableProjectFields]?.message || '',
    }));
  }, [formErrors, updateFieldInfo.target, nameFieldState.error, webhookURLFieldState.error]);

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
    <div className="mt-6 flex">
      <SideNavigation />
      <form onSubmit={handleSubmit(onSubmit)} className="ml-12">
        <section className="mb-20 section" id="sectionGeneral">
          <h2 className="font-medium text-xl mb-8">General</h2>
          <div className="mb-10">
            <h3 className="mb-4 font-medium">Project name</h3>
            <InputTextField
              name="name"
              register={register}
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              validationRules={{ required: 'The project name is required' }}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({ ...info, target: 'name' }));
                nameField.onChange(e.target.value);
              }}
            />
            {updateFieldInfo.target === 'name' && updateFieldInfo.state !== null && (
              <SettingsAlertMessage
                state={updateFieldInfo.state}
                message={updateFieldInfo.message}
                onSuccessEnd={resetUpdateFieldInfo}
              />
            )}
          </div>
        </section>
        <section className="mb-10 section" id="sectionWebhook">
          <h2 className="font-medium text-xl mb-8">Webhook</h2>
          <div className="mb-10">
            <h3 className="mb-4 font-medium">Auth webhook URL</h3>
            <InputTextField
              name="authWebhookURL"
              register={register}
              reset={() => {
                resetForm();
                resetUpdateFieldInfo();
              }}
              onChange={(e) => {
                setUpdateFieldInfo((info) => ({ ...info, target: 'authWebhookURL' }));
                webhookURLField.onChange(e.target.value);
              }}
            />
            {updateFieldInfo.target === 'authWebhookURL' && updateFieldInfo.state !== null && (
              <SettingsAlertMessage
                state={updateFieldInfo.state}
                message={updateFieldInfo.message}
                onSuccessEnd={resetUpdateFieldInfo}
              />
            )}
          </div>
          <div className="mb-10">
            <h3 className="mb-6 font-medium">Auth webhook methods</h3>
            {AUTH_WEBHOOK_METHODS.map((method) => {
              return (
                <div className="flex mb-3 items-center" key={method}>
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
                    <SettingsAlertMessage
                      state={updateFieldInfo.state}
                      message={updateFieldInfo.message}
                      onSuccessEnd={resetUpdateFieldInfo}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </form>
    </div>
  );
}

function InputToggle({ name, checked, onChange }: {
  name: AuthWebhookMethod;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="inline-block w-60">
      <label htmlFor={name} className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" id={name} value={name} className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</span>
      </label>
    </div>
  );
}

function InputTextField({ name, validationRules, register, reset, onChange }: {
  name: keyof UpdatableProjectFields;
  validationRules?: RegisterOptions;
  register: UseFormRegister<ProjectUpdateFields>;
  reset: (fieldName?: keyof UpdatableProjectFields) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const { ref, ...rest } = { ...register(name, validationRules) };

  const cancelInput = useCallback(() => {
    reset();
    setIsFieldControlButtonsOpen(false);
  }, [reset]);

  const fieldControlRef = useRef<HTMLDivElement | null>(null);
  const [isFieldControlButtonsOpen, setIsFieldControlButtonsOpen] = useState(false);
  const [firstRef, lastRef, onKeyDown] = useAreaBlur(cancelInput);

  useOutsideClick(
    firstRef,
    () => {
      if (isFieldControlButtonsOpen) setIsFieldControlButtonsOpen(false);
    },
    fieldControlRef,
  );

  return (
    <div className="flex flex-wrap items-center" onKeyDown={onKeyDown}>
      <input
        type="text"
        autoComplete="off"
        {...rest}
        ref={(e) => {
          ref(e);
          firstRef.current = e;
        }}
        className="border-0 border-b border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-gray-400 block w-96 p-2.5 mb-2"
        onFocus={() => setIsFieldControlButtonsOpen(true)}
        onChange={onChange}
      />
      {isFieldControlButtonsOpen && (
        <div ref={fieldControlRef} className="flex ml-3">
          <button
            type="button"
            onClick={cancelInput}
            className="flex items-center mr-2 px-3 py-2 border border-solid border-gray-300 hover:bg-gray-200 rounded text-xs text-gray-500 font-medium "
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.14645 3.14645C3.34171 2.95118 3.65829 2.95118 3.85355 3.14645L6 5.29289L8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645C9.04882 3.34171 9.04882 3.65829 8.85355 3.85355L6.70711 6L8.85355 8.14645C9.04882 8.34171 9.04882 8.65829 8.85355 8.85355C8.65829 9.04882 8.34171 9.04882 8.14645 8.85355L6 6.70711L3.85355 8.85355C3.65829 9.04882 3.34171 9.04882 3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645L5.29289 6L3.14645 3.85355C2.95118 3.65829 2.95118 3.34171 3.14645 3.14645Z"
                fill="#807B78"
              />
            </svg>
            Cancel
          </button>
          <button
            type="submit"
            ref={lastRef}
            className="flex items-center mr-2 px-3 py-2 border border-solid border-emerald-300 hover:bg-emerald-100 rounded text-xs text-emerald-500 font-medium "
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z"
                fill="#23C176"
              />
            </svg>
            Save
          </button>
        </div>
      )}
    </div>
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
    <nav className="flex flex-col w-44 sticky top-1 h-4/5">
      <a
        href="#sectionGeneral"
        className={`nav__items rounded px-4 py-3 mb-4 text-sm ${activeId === 'sectionGeneral' ? 'active bg-orange-200' : ''
          }`}
      >
        General
      </a>
      <a
        href="#sectionWebhook"
        className={`nav__items rounded px-4 py-3 mb-4 text-sm ${activeId === 'sectionWebhook' ? 'active bg-orange-200' : ''
          }`}
      >
        Webhook
      </a>
    </nav>
  );
};
