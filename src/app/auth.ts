/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import { usersApi } from '../services/UsersApi';

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState : initialState as AuthState,
  reducers: {
    setToken: (state, {payload}) => {
      state.token = payload;
    },
    removeToken: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getToken.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    );
  },
});

export const {setToken, removeToken} = authSlice.actions;
export default authSlice.reducer;
