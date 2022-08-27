/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  users: User [];
  page: number;
}

const initialState: UsersState = {
  users: [],
  page: 1,
};

const usersSlice = createSlice({
  name: 'users',
  initialState : initialState as UsersState,
  reducers: {
    addUsers: (state, {payload}) => {
      state.users = [...state.users, ...payload];
    },
    clearUsers: (state) => {
      state.users = [];
    },
    setPageUsers: (state, {payload}) => {
      state.page = payload;
    },
  },
});

export const { addUsers, clearUsers, setPageUsers } = usersSlice.actions;
export default usersSlice.reducer;
