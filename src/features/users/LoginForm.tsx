import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { LoginFields, selectUsers, loginUser } from './usersSlice';

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFields>();
  const { isSuccess } = useSelector(selectUsers);

  const onSubmit = (data: LoginFields) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    // TODO(hackerwins): Go to dashboard if the user is already logged in.
    if (isSuccess) {
      navigate('/');
    }
  }, [navigate, isSuccess]);

  return (
    <form
      className="p-4 max-w-md mx-auto bg-white border-t-8 border-orange-700 mt-10 rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-medium text-3xl text-center py-4 text-gray-800">Log in to Yorkie</h1>
      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="username">
        Email
      </label>
      <input className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-orange-700 focus:bg-white text-gray-700 pr-16 font-mono" type="text" autoComplete="off" autoFocus {...register('email', { required: true })} />
      {errors.email && <p className="text-red-500 text-xs italic">Email required.</p>}

      <label className="font-medium block mb-1 mt-6 text-gray-700" htmlFor="password">
        Password
      </label>
      <input className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-orange-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" type="password" autoComplete="off" {...register('password', { required: true })} />
      {errors.password && <p className="text-red-500 text-xs italic">Password required.</p>}

      <button className="w-full bg-orange-700 hover:bg-orange-900 text-white font-medium py-3 px-4 mt-10 rounded focus:outline-none focus:shadow-outline" type="submit">
        Log in
      </button>
    </form>
  );
}
