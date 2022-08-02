import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { SignupFields, selectUsers, signupUser } from './usersSlice';

export function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, watch, formState: { errors }, handleSubmit } = useForm<SignupFields>();
  const { signup: { isSuccess } } = useSelector(selectUsers);

  const onSubmit = (data: SignupFields) => {
    dispatch(signupUser(data));
  };

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
      <h1 className="font-medium text-3xl text-center py-4 text-gray-800">Create an account</h1>
      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="username">
        Username
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-orange-700 focus:bg-white text-gray-700 pr-16 font-mono" type="text" autoComplete="off" autoFocus
        {...register('username', { required: true })}
      />
      {errors.username && <p className="text-red-500 text-xs italic">Username required.</p>}

      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">
        Password
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-orange-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" type="password" autoComplete="off"
        {...register('password', { required: true })}
      />
      {errors.password && <p className="text-red-500 text-xs italic">Password required.</p>}

      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password-confirm">
        Password Confirm
      </label>
      <input
        className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-orange-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" type="password" autoComplete="off"
        {...register('passwordConfirm', {
          validate: (val: string) => {
            if (!val) {
              return 'Password confirm required.';
            }
            if (watch('password') !== val) {
              return 'Passwords do not match.';
            }
          }
        })}
      />
      {errors.passwordConfirm && <p className="text-red-500 text-xs italic">{errors.passwordConfirm.message}</p>}

      <button className="w-full bg-orange-700 hover:bg-orange-900 text-white font-medium py-3 px-4 mt-10 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign up
      </button>
    </form>

  );
}