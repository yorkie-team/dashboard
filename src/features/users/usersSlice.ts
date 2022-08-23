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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'api';
import { User, RPCStatusCode } from 'api/types';
import { RootState } from 'app/store';
import jwt_decode from 'jwt-decode';

export interface UsersState {
  token: string;
  username: string;
  login: {
    isSuccess: boolean;
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: keyof LoginFields;
      message: string;
    } | null;
  };
  signup: {
    isSuccess: boolean;
    status: 'idle' | 'loading' | 'failed';
  };
}

export type LoginFields = {
  username: string;
  password: string;
};

export type SignupFields = {
  username: string;
  password: string;
  passwordConfirm: string;
};

type JWTPayload = {
  username: string;
};

const initialState: UsersState = {
  token: localStorage.getItem('token') || '',
  username: '',
  login: {
    isSuccess: false,
    status: 'idle',
    error: null,
  },
  signup: {
    isSuccess: false,
    status: 'idle',
  },
};

if (initialState.token) {
  api.setToken(initialState.token);
  initialState.username = jwt_decode<JWTPayload>(initialState.token).username;
}

export const loginUser = createAsyncThunk<string, LoginFields>('users/login', async ({ username, password }) => {
  const token = await api.logIn(username, password);
  localStorage.setItem('token', token);
  return token;
});

export const signupUser = createAsyncThunk<User, SignupFields>('users/signup', async ({ username, password }) => {
  return await api.signUp(username, password);
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.token = '';
      state.username = '';
      state.login.status = 'idle';
      state.login.isSuccess = false;
      state.login.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.username = jwt_decode<JWTPayload>(action.payload).username;
      state.login.status = 'idle';
      state.login.isSuccess = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.login.status = 'loading';
      state.login.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.login.status = 'failed';
      const statusCode = Number(action.error.code);
      if (statusCode === RPCStatusCode.NOT_FOUND || statusCode === RPCStatusCode.UNAUTHENTICATED) {
        state.login.error = {
          target: 'username',
          message: 'Incorrect username or password',
        };
      }
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.signup.status = 'idle';
      state.signup.isSuccess = true;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.signup.status = 'loading';
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.signup.status = 'failed';
    });
  },
});

export const { logoutUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
