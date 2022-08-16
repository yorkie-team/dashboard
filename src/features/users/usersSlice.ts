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
import { User, RPCError, RPCStatusCode } from 'api/types';
import { RootState } from 'app/store';

export interface UsersState {
  token: string;
  login: {
    isSuccess: boolean;
    status: 'idle' | 'loading' | 'failed';
    error: {
      target: 'username' | 'password';
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

const initialState: UsersState = {
  token: localStorage.getItem('token') || '',
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
}

export const loginUser = createAsyncThunk<string, LoginFields, { rejectValue: any }>(
  'users/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const token = await api.logIn(username, password);
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      const { code, message } = error as RPCError;
      return rejectWithValue({ code, message });
    }
  },
);

export const signupUser = createAsyncThunk<User, SignupFields, { rejectValue: any }>(
  'users/signup',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await api.signUp(username, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.token = '';
      state.login.status = 'idle';
      state.login.isSuccess = false;
      state.login.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.login.status = 'idle';
      state.login.isSuccess = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.login.status = 'loading';
      state.login.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.login.status = 'failed';
      switch (action.payload.code) {
        case RPCStatusCode.NOT_FOUND:
          state.login.error = {
            target: 'username',
            message: 'No matching accounts have been found. Check your user name and try again.',
          };
          break;
        case RPCStatusCode.UNAUTHENTICATED:
          state.login.error = {
            target: 'password',
            message: 'The password is not correct. Please try again.',
          };
          break;
        default:
          throw action.payload;
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
