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

import React, { useCallback, useEffect, useState } from 'react';
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
  listProjectsAsync,
} from './projectsSlice';
import { AUTH_WEBHOOK_METHODS, UpdatableProjectFields, AuthWebhookMethod } from 'api/types';
import { InputToggle, InputHelperText, InputTextField, Navigator } from 'components';
import { Button, Container, Heading, Flex, Box, Text, Grid, GridItem, Switch } from 'yorkie-ui';

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
      clientDeactivateThreshold: '',
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
  const { field: clientDeactivateThreshold, fieldState: clientDeactivateThresholdState } = useController({
    control,
    name: 'clientDeactivateThreshold',
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
      clientDeactivateThreshold: project?.clientDeactivateThreshold || '',
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
    if (
      updateFieldInfo.state !== 'success' &&
      !nameFieldState.error &&
      !webhookURLFieldState.error &&
      !clientDeactivateThresholdState.error
    ) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: null,
      }));
      return;
    }
    if (nameFieldState.error || webhookURLFieldState.error || clientDeactivateThresholdState.error) {
      setUpdateFieldInfo((info) => ({
        ...info,
        state: 'error',
        message: formErrors[updateFieldInfo.target as keyof UpdatableProjectFields]?.message || '',
      }));
    }
  }, [
    formErrors,
    updateFieldInfo.state,
    updateFieldInfo.target,
    nameFieldState.error,
    webhookURLFieldState.error,
    clientDeactivateThresholdState.error,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setUpdateFieldInfo((info) => ({ ...info, state: 'success', message: 'Success' }));
      navigate(`../projects/${project?.name}/settings`, { replace: true });
      dispatch(listProjectsAsync());
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

  const onChangeSwitch = (e: any, method: any) => {
    let newWebhookMethods = [...project?.authWebhookMethods!];
    if (e && e.target && e.target.checked) {
      newWebhookMethods = newWebhookMethods.includes(method) ? newWebhookMethods : [...newWebhookMethods, method];
    } else {
      newWebhookMethods = newWebhookMethods.filter((newMethod) => newMethod !== method);
    }
    webhookMethodField.onChange(newWebhookMethods);
    setUpdateFieldInfo((info) => ({ ...info, target: method }));
    onSubmit({ authWebhookMethods: newWebhookMethods });
  };
  return (
    <Container
      paddingBlock={{ base: '6', lg: '20' }}
      marginInline="auto"
      paddingInline={{ base: '6', lg: '0' }}
      width={{
        sm: 'breakpoint-sm',
        md: 'breakpoint-md',
        lg: 'breakpoint-lg',
        xl: 'breakpoint-xl',
      }}
    >
      <Grid gridTemplateColumns={{ base: 1, sm: 4 }} paddingBlock="10" gap="10">
        <GridItem gridColumnStart={1} gridColumnEnd={2} gridColumn={1} display="grid">
          <Navigator
            navList={[
              { name: 'General', id: 'general' },
              { name: 'Webhook', id: 'webhook' },
              { name: 'Advanced', id: 'advanced' },
            ]}
          />
        </GridItem>
        <GridItem gridColumnStart={3} gridColumnEnd={4} gridColumn={2} display="grid">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box id="general">
              <Heading as="h2" width="fit" fontSize="2xl">
                General <Box marginTop="2" borderWidth="xs" borderColor="orange.default" />
              </Heading>
              <Box marginTop="10">
                <Text>Project name</Text>
                <InputTextField
                  borderInline="none"
                  borderTop="none"
                  borderRadius="none"
                  boxShadow="none"
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
              </Box>
            </Box>
            <Box id="webhook" marginTop="28">
              <Heading as="h2" width="fit" fontSize="2xl">
                Webhook <Box marginTop="2" borderWidth="xs" borderColor="orange.default" />
              </Heading>
              <Box marginTop="10">
                <Text marginBottom="10">Auth webhook URL</Text>
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
                  borderInline="none"
                  borderTop="none"
                  borderRadius="none"
                  boxShadow="none"
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
                <Text marginBlock="10">Auth webhook methods</Text>
                <Box>
                  {AUTH_WEBHOOK_METHODS.map((method) => {
                    return (
                      <Flex key={method} gap="20" marginTop="4">
                        <Switch
                          id={method}
                          checked={webhookMethodField.value.includes(method)}
                          onChange={(e) => onChangeSwitch(e, method)}
                        >
                          {method}
                        </Switch>
                        {updateFieldInfo.target === method && updateFieldInfo.state !== null && (
                          <InputHelperText
                            state={updateFieldInfo.state}
                            message={updateFieldInfo.message}
                            onSuccessEnd={resetUpdateFieldInfo}
                          />
                        )}
                      </Flex>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box id="advanced" marginTop="28">
              <Heading as="h2" width="fit" fontSize="2xl">
                Advanced <Box marginTop="2" borderWidth="xs" borderColor="orange.default" />
              </Heading>
              <Box marginTop="10">
                <Text>Client Deactivate Threshold</Text>
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
                    setUpdateFieldInfo((info) => ({ ...info, target: 'clientDeactivateThreshold' }));
                    clientDeactivateThreshold.onChange(e.target.value);
                  }}
                  id="clientDeactivateThreshold"
                  borderInline="none"
                  borderTop="none"
                  borderRadius="none"
                  boxShadow="none"
                  fieldUtil={true}
                  fontWeight="semibold"
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
              </Box>
            </Box>
          </form>
        </GridItem>
      </Grid>
    </Container>
  );
}
