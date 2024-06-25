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
import { useNavigate } from 'react-router-dom';
import { SignupFields, selectUsers, signupUser, resetSignupState } from './usersSlice';
import { Button, InputTextBox } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';

export function SignupForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
    trigger,
  } = useForm<SignupFields>();
  const {
    signup: { isSuccess, status, error },
  } = useAppSelector(selectUsers);

  const onSubmit = useCallback(
    (data: SignupFields) => {
      dispatch(signupUser(data));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!error) return;
    for (const { target, message } of error) {
      setError(target, { type: 'custom', message: message }, { shouldFocus: true });
    }
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      dispatch(resetSignupState());
    }
  }, [dispatch, navigate, isSuccess]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend className="blind">Signup Form</legend>
        <InputTextBox
          label="Username"
          blindLabel={true}
          floatingLabel={true}
          placeholder="Username"
          {...register('username', {
            required: 'Username is required',
            pattern: {
              value: /^[a-zA-Z0-9\-._~]{2,30}$/,
              message:
                'Username should only contain 2 to 30 characters with alphabets, numbers, hyphen(-), period(.), underscore(_), and tilde(~)',
            },
          })}
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
          autoComplete="off"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~`!?@#$%^&*()\-_+={}[\]|\\;:'"<>,./])(?:[a-zA-Z0-9~`!?@#$%^&*()\-_+={}[\]|\\;:'"<>,./]{8,30})$/,
              message:
                'Password must contain 8 to 30 characters with at least 1 alphabet, 1 number, and 1 special character',
            },
            onChange: async () => {
              await trigger(['password', 'confirmPassword']);
            },
          })}
          state={formErrors.password ? 'error' : 'normal'}
          helperText={(formErrors.password && formErrors.password.message) || ''}
        />
        <InputTextBox
          type="password"
          label="Confirm Password"
          blindLabel={true}
          floatingLabel={true}
          placeholder="ConfirmPassword"
          autoComplete="off"
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: {
              match: (value) => watch('password') === value || 'Passwords do not match',
            },
            onChange: async () => {
              await trigger('confirmPassword');
            },
          })}
          state={formErrors.confirmPassword ? 'error' : 'normal'}
          helperText={(formErrors.confirmPassword && formErrors.confirmPassword.message) || ''}
        />
        <Button.Box fullWidth={true}>
          <Button type="submit" disabled={status === 'loading'} color="primary">
            {status !== 'loading' && 'Sign up'}
            {status === 'loading' && 'Loading...'}
          </Button>
        </Button.Box>
      </fieldset>
    </form>
  );
}
