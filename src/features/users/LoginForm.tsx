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

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LoginFields, selectUsers, loginUser } from './usersSlice';
import { GrpcStatusCode } from 'api/types';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
  } = useForm<LoginFields>();
  const {
    login: { isSuccess },
  } = useAppSelector(selectUsers);

  const onSubmit = async (data: LoginFields) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error: any) {
      if (error.code === GrpcStatusCode.NOT_FOUND) {
        setError(
          'username',
          { type: 'notFound', message: 'No matching accounts have been found. Check your user name and try again' },
          { shouldFocus: true },
        );
        return;
      }
      if (error.code === GrpcStatusCode.UNAUTHENTICATED) {
        setError(
          'password',
          { type: 'unauthenticated', message: 'The password is not correct. Please try again.' },
          { shouldFocus: true },
        );
        return;
      }

      // TODO(chacha912): Handle unexpected error (e.g. network error).
      // Redirect to error page or show error modal.
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [navigate, isSuccess]);

  return (
    <form
      className="p-4 max-w-md mx-auto bg-white border-t-8 border-orange-700 mt-10 rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-medium text-3xl text-center py-4 text-gray-800 mb-10">Log in to Yorkie</h1>
      <div className="relative mb-4">
        <input
          type="text"
          id="username"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border border-solid border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
          placeholder=" "
          autoComplete="off"
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
          {...register('password', { required: 'Password is required' })}
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Password
        </label>
      </div>
      {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password.message}</p>}
      <button
        className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium py-3 px-4 mt-8 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Log in
      </button>
      <div className="mt-5 text-sm font-medium text-gray-500">
        Not registered?
        <a href="/signup" className="text-orange-600 hover:underline ml-2">
          Signup
        </a>
      </div>
    </form>
  );
}
