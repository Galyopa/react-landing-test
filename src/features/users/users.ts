import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetUsersByPageQuery } from '../../services/UsersApi';
import { User } from '../../types/User';


type UsersState = {
  loaded: boolean;
  error: string;
  items: User[];
};

const initialState: UsersState = {
  loaded: false,
  error: '',
  items: [],
};

export const loadUsers = createAsyncThunk('users/load', async () => {
  return useGetUsersByPageQuery('1');
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;