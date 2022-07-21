import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'api';
import { User } from 'api/types'
import { RootState } from 'app/store';

export interface UsersState {
  email: string;
  isSuccess: boolean;
  status: 'idle' | 'loading' | 'failed';
}

export type LoginFields = {
  email: string;
  password: string;
};

export type SignupFields = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const initialState: UsersState = {
  email: '',
  isSuccess: false,
  status: 'idle',
}

export const loginUser = createAsyncThunk<
  User,
  LoginFields,
  { rejectValue: any }
>('users/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await api.loginUser(email, password);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const signupUser = createAsyncThunk<
  User,
  SignupFields,
  { rejectValue: any }
>('users/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await api.signupUser(email, password);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state) => {
      state.status = 'idle';
      state.isSuccess = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.status = 'idle';
      state.isSuccess = true;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
