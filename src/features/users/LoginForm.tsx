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

import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LoginFields, selectUsers, loginUser } from './usersSlice';
import { Button, InputTextBox } from 'components';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
  } = useForm<LoginFields>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    login: { isSuccess, status, error },
  } = useAppSelector(selectUsers);

  const onSubmit = useCallback(
    (data: LoginFields) => {
      dispatch(loginUser(data));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!error) return;
    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess) {
      const { from } = (location.state as { from: string }) || { from: '/' };
      navigate(from);
    }
  }, [navigate, isSuccess, location]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend className="blind">Login Form</legend>
        <InputTextBox
          label="Username"
          blindLabel={true}
          floatingLabel={true}
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
          autoComplete="off"
          autoFocus
          state={formErrors.username ? 'error' : 'normal'}
          helperText={(formErrors.username && formErrors.username.message) || ''}
        />
        <InputTextBox
          type="password"
          label="Password"
          blindLabel={true}
          floatingLabel={true}
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          state={formErrors.password ? 'error' : 'normal'}
          helperText={(formErrors.password && formErrors.password.message) || ''}
        />
        <Button.Box fullWidth={true}>
          <Button type="submit" disabled={status === 'loading'} color="primary">
            {status !== 'loading' && 'Sign in'}
            {status === 'loading' && 'Loading...'}
          </Button>
        </Button.Box>
      </fieldset>
    </form>
  );
}
