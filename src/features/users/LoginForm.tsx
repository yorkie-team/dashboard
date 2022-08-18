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
    const { from } = (location.state as { from: string }) || { from: '/' };
    if (isSuccess) {
      navigate(from);
    }
  }, [navigate, isSuccess, location]);

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
        disabled={status === 'loading'}
      >
        {status !== 'loading' && 'Log in'}
        {status === 'loading' && (
          <>
            <svg
              role="status"
              className="inline mr-2 w-4 h-4 text-gray-200 fill-blue-600 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
            </svg>
            Loading...
          </>
        )}
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
