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

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAppThunk } from 'app/appThunk';
import * as api from 'api';
import { User, RPCStatusCode, RPCError } from 'api/types';
import { RootState } from 'app/store';

export interface UsersState {
  isValidToken: boolean;
  authProvider: string;
  username: string;
  fetchMe: {
    status: 'idle' | 'loading' | 'failed';
  };
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
  deleteAccount: {
    status: 'idle' | 'loading' | 'failed';
    isSuccess: boolean;
    error: { message: string } | null;
  };
  changePassword: {
    status: 'idle' | 'loading' | 'failed';
    isSuccess: boolean;
    error: {
      target: 'password' | 'newPassword';
      message: string;
    } | null;
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

export type ChangePasswordFields = {
  username: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const initialState: UsersState = {
  isValidToken: false,
  authProvider: '',
  username: '',
  fetchMe: {
    status: 'idle',
  },
  login: {
    isSuccess: false,
    status: 'idle',
    error: null,
  },
  logout: {
    isSuccess: false,
  },
  deleteAccount: {
    isSuccess: false,
    status: 'idle',
    error: null,
  },
  changePassword: {
    isSuccess: false,
    status: 'idle',
    error: null,
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

export const fetchMe = createAppThunk<User, void>('users/me', async () => {
  return await api.fetchMe();
});

export const loginUser = createAppThunk<User, LoginFields>('users/login', async ({ username, password }) => {
  await api.logIn(username, password);
  const user = await api.fetchMe();
  return user!;
});

export const logoutUser = createAppThunk<void, void>('users/logout', async () => {
  await api.logOut();
});

export const signupUser = createAppThunk<User, SignupFields>('users/signup', async ({ username, password }) => {
  return await api.signUp(username, password);
});

export const deleteUser = createAppThunk<void, LoginFields>('users/deleteAccount', async ({ username, password }) => {
  return await api.deleteAccount(username, password);
});

export const changePassword = createAppThunk<void, ChangePasswordFields>(
  'users/changePassword',
  async ({ username, password, newPassword }) => {
    return await api.changePassword(username, password, newPassword);
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsValidToken: (state, action: PayloadAction<boolean>) => {
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
    updateDarkTheme: (state, action: PayloadAction<string>) => {
      state.preferences.theme.darkMode = action.payload === 'dark';
    },
    toggleUse24HourClock: (state) => {
      state.preferences.use24HourClock = !state.preferences.use24HourClock;
      localStorage.setItem('clock', state.preferences.use24HourClock ? '24' : '12');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.isValidToken = true;
      state.username = action.payload.username;
      state.authProvider = action.payload.authProvider;
      state.fetchMe.status = 'idle';
    });
    builder.addCase(fetchMe.rejected, (state) => {
      state.isValidToken = false;
      state.username = '';
      state.fetchMe.status = 'failed';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isValidToken = true;
      state.username = action.payload.username;
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
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.logout.isSuccess = true;
      state.isValidToken = false;
      state.username = '';
      state.login.status = 'idle';
      state.login.isSuccess = false;
      state.login.error = null;
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
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteAccount.status = 'idle';
      state.deleteAccount.isSuccess = true;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.changePassword.status = 'loading';
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.changePassword.status = 'failed';
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.UNAUTHENTICATED) {
        state.changePassword.error = {
          target: 'password',
          message: 'The password is incorrect. Try again.',
        };
        action.meta.isHandledError = true;
        return;
      } else if (statusCode === RPCStatusCode.INVALID_ARGUMENT) {
        for (const { field, description } of error.details!) {
          if (field === 'Password') {
            state.changePassword.error = {
              target: 'newPassword',
              message: description,
            };
          }
        }
        action.meta.isHandledError = true;
      }
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.changePassword.status = 'idle';
      state.changePassword.isSuccess = true;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.deleteAccount.status = 'loading';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleteAccount.status = 'failed';
      const error = action.payload!.error;
      if (!(error instanceof RPCError)) {
        return;
      }
      const statusCode = Number(error.code);
      if (statusCode === RPCStatusCode.NOT_FOUND || statusCode === RPCStatusCode.UNAUTHENTICATED) {
        state.deleteAccount.error = {
          message: 'Please verify your account information and try again.',
        };
        action.meta.isHandledError = true;
        return;
      }
    });
  },
});

export const {
  setIsValidToken,
  resetSignupState,
  toggleUseSystemTheme,
  toggleUseDarkTheme,
  updateDarkTheme,
  toggleUse24HourClock,
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;
export const selectPreferences = (state: RootState) => state.users.preferences;

export default usersSlice.reducer;
