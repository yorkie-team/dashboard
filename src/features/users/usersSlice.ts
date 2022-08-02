import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'api';
import { User } from 'api/types'
import { RootState } from 'app/store';

export interface UsersState {
  token: string;
  login: {
    isSuccess: boolean;
    status: 'idle' | 'loading' | 'failed';
  },
  signup: {
    isSuccess: boolean;
    status: 'idle' | 'loading' | 'failed';
  }
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
  token: '',
  login: {
    isSuccess: false,
    status: 'idle',
  },
  signup: {
    isSuccess: false,
    status: 'idle',
  }
}

export const loginUser = createAsyncThunk<
  string,
  LoginFields,
  { rejectValue: any }
>('users/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    return await api.logIn(username, password);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const signupUser = createAsyncThunk<
  User,
  SignupFields,
  { rejectValue: any }
>('users/signup', async ({ username, password }, { rejectWithValue }) => {
  try {
    return await api.signUp(username, password);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.login.status = 'idle';
      state.login.isSuccess = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.login.status = 'loading';
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.login.status = 'failed';
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

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
