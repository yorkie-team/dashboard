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
  isValidToken: boolean;
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
    error: Array<ErrorDetails> | null;
  };
}

type ErrorDetails = {
  target: keyof SignupFields;
  message: string;
};

export type LoginFields = {
  username: string;
  password: string;
};

export type SignupFields = {
  username: string;
  password: string;
  confirmPassword: string;
};

type JWTPayload = {
  username: string;
};

const initialState: UsersState = {
  token: localStorage.getItem('token') || '',
  isValidToken: false,
  username: '',
  login: {
    isSuccess: false,
    status: 'idle',
    error: null,
  },
  signup: {
    isSuccess: false,
    status: 'idle',
    error: null,
  },
};

if (initialState.token) {
  api.setToken(initialState.token);
  initialState.isValidToken = true;
  try {
    initialState.username = jwt_decode<JWTPayload>(initialState.token).username;
  } catch (error) {
    console.error(`Invalid token format: ${initialState.token}`, error);
  }
}

export const loginUser = createAsyncThunk<string, LoginFields>('users/login', async ({ username, password }) => {
  const token = await api.logIn(username, password);
  localStorage.setItem('token', token);
  return token;
});

export const signupUser = createAsyncThunk<User, SignupFields, { rejectValue: any }>(
  'users/signup',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await api.signUp(username, password);
    } catch (error) {
      return rejectWithValue({ error });
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      api.setToken('');
      state.token = '';
      state.isValidToken = false;
      state.username = '';
      state.login.status = 'idle';
      state.login.isSuccess = false;
      state.login.error = null;
    },
    setIsValidToken: (state, action) => {
      state.isValidToken = action.payload;
    },
    resetSignupState: (state) => {
      state.signup.isSuccess = false;
      state.signup.status = 'idle';
      state.signup.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isValidToken = true;
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
    builder.addCase(signupUser.rejected, (state, action) => {
      state.signup.status = 'failed';
      const statusCode = Number(action.payload.error.code);
      const signupErrors: Array<ErrorDetails> = [];
      if (statusCode === RPCStatusCode.INTERNAL) {
        signupErrors.unshift({
          target: 'username',
          message: 'Username already exists',
        });
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        const errorDetails = action.payload.error.details;
        for (const { field, description } of errorDetails) {
          if (field === 'Username') {
            signupErrors.unshift({
              target: 'username',
              message: description,
            });
          } else if (field === 'Password') {
            signupErrors.unshift({
              target: 'password',
              message: description,
            });
          }
        }
      }
      state.signup.error = signupErrors;
    });
  },
});

export const { logoutUser, setIsValidToken, resetSignupState } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
