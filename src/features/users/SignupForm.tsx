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
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SignupFields, selectUsers, signupUser } from './usersSlice';

export function SignupForm() {
  const dispatch = useDispatch();
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
    signup: { isSuccess, error },
  } = useSelector(selectUsers);

  const onSubmit = useCallback(
    (data: SignupFields) => {
      dispatch(signupUser(data));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!error) return;
    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [navigate, isSuccess]);

  return (
    <form
      className="p-4 max-w-md mx-auto bg-white border-t-8 border-orange-700 mt-10 rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-medium text-3xl text-center py-4 text-gray-800 mb-10">Create an account</h1>
      <div className="relative mb-4">
        <input
          type="text"
          id="username"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border border-solid border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
          autoComplete="off"
          placeholder=" "
          autoFocus
          {...register('username', { required: 'Username is required' })}
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Username
        </label>
      </div>
      {formErrors.username && <p className="text-red-500 text-xs italic mb-6">{formErrors.username.message}</p>}

      <div className="relative mb-4">
        <input
          type="password"
          id="password"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border border-solid border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
          placeholder=" "
          autoComplete="off"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password requires at least 6 characters',
            },
            onChange: async () => {
              await trigger(['password', 'confirmPassword']);
            },
          })}
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Password
        </label>
      </div>
      {formErrors.password && <p className="text-red-500 text-xs italic mb-6">{formErrors.password.message}</p>}

      <div className="relative mb-4">
        <input
          type="password"
          id="confirmPassword"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border border-solid border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
          placeholder=" "
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
        />
        <label
          htmlFor="confirmPassword"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Confirm Password
        </label>
      </div>
      {formErrors.confirmPassword && (
        <p className="text-red-500 text-xs italic mb-6">{formErrors.confirmPassword.message}</p>
      )}

      <button
        className="w-full bg-orange-500 hover:bg-orange-400 focus:bg-orange-400 text-white font-medium py-3 px-4 mt-8 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:!bg-gray-300"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}
