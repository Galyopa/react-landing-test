/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  users: User [];
}

const initialState: UsersState = {
  users: [],
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
    }
  },
});

export const { addUsers, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
