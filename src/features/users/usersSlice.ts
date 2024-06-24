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

import { createSlice } from '@reduxjs/toolkit';
import { createAppThunk } from 'app/appThunk';
import * as api from 'api';
import { User, RPCStatusCode, RPCError } from 'api/types';
import { RootState } from 'app/store';
import { jwtDecode } from 'jwt-decode';

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
  logout: {
    isSuccess: boolean;
  };
  signup: {
    isSuccess: boolean;
    status: 'idle' | 'loading' | 'failed';
    error: Array<ErrorDetails> | null;
  };
  preferences: {
    theme: {
      useSystem: boolean;
      darkMode: boolean;
    };
    use24HourClock: boolean;
  };
}

function isDarkMode(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
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
  logout: {
    isSuccess: false,
  },
  signup: {
    isSuccess: false,
    status: 'idle',
    error: null,
  },
  preferences: {
    theme: {
      useSystem: localStorage.getItem('theme') === 'system',
      darkMode:
        (localStorage.getItem('theme') === 'system' && isDarkMode()) || localStorage.getItem('theme') === 'dark',
    },
    use24HourClock: localStorage.getItem('clock') === '24',
  },
};

if (initialState.token) {
  api.setToken(initialState.token);
  initialState.isValidToken = true;
  try {
    initialState.username = jwtDecode<JWTPayload>(initialState.token).username;
  } catch (error) {
    console.error(`Invalid token format: ${initialState.token}`, error);
  }
}

export const loginUser = createAppThunk<string, LoginFields>('users/login', async ({ username, password }) => {
  const token = await api.logIn(username, password);
  // TODO(hackerwins): For security, we need to change the token to be stored in the cookie.
  // For more information, see https://github.com/yorkie-team/dashboard/issues/42.
  localStorage.setItem('token', token);
  return token;
});

export const signupUser = createAppThunk<User, SignupFields>('users/signup', async ({ username, password }) => {
  return await api.signUp(username, password);
});

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
      state.logout.isSuccess = true;
    },
    setIsValidToken: (state, action) => {
      state.isValidToken = action.payload;
    },
    resetSignupState: (state) => {
      state.signup.isSuccess = false;
      state.signup.status = 'idle';
      state.signup.error = null;
    },
    toggleUseSystemTheme: (state) => {
      if (state.preferences.theme.useSystem) {
        state.preferences.theme.useSystem = false;
        state.preferences.theme.darkMode = isDarkMode();
        localStorage.setItem('theme', isDarkMode() ? 'dark' : 'light');
        return;
      }

      state.preferences.theme.useSystem = true;
      state.preferences.theme.darkMode = isDarkMode();
      localStorage.setItem('theme', 'system');
    },
    toggleUseDarkTheme: (state) => {
      if (state.preferences.theme.darkMode) {
        state.preferences.theme.darkMode = false;
        localStorage.setItem('theme', 'light');
        return;
      }

      state.preferences.theme.darkMode = true;
      localStorage.setItem('theme', 'dark');
    },
    toggleUse24HourClock: (state) => {
      state.preferences.use24HourClock = !state.preferences.use24HourClock;
      localStorage.setItem('clock', state.preferences.use24HourClock ? '24' : '12');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isValidToken = true;
      state.username = jwtDecode<JWTPayload>(action.payload).username;
      state.login.status = 'idle';
      state.login.isSuccess = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.login.status = 'loading';
      state.login.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.login.status = 'failed';
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.NOT_FOUND || statusCode === RPCStatusCode.UNAUTHENTICATED) {
        state.login.error = {
          target: 'username',
          message: 'Incorrect username or password',
        };
        action.meta.isHandledError = true;
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
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.ALREADY_EXISTS) {
        state.signup.error = [
          {
            target: 'username',
            message: 'Username already exists',
          },
        ];
        action.meta.isHandledError = true;
        return;
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        const signupErrors: Array<ErrorDetails> = [];
        for (const { field, description } of error.details!) {
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
        state.signup.error = signupErrors;
        action.meta.isHandledError = true;
      }
    });
  },
});

export const {
  logoutUser,
  setIsValidToken,
  resetSignupState,
  toggleUseSystemTheme,
  toggleUseDarkTheme,
  toggleUse24HourClock,
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;
export const selectPreferences = (state: RootState) => state.users.preferences;

export default usersSlice.reducer;
