import {
  createApi,

  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { requestGetUser } from '../types/requestGetUser';
import { User } from '../types/User';
import type { RootState } from '../app/store';
import { requestGetToken } from '../types/requestGetToken';


const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('token', token);
    }

    return headers;
  },
});

export const usersApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    listUsers: builder.query<requestGetUser<User>, number | void>({
      query: (page = 1) => `users?page=${page}&count=6`,
    }),
    addUser: builder.mutation<User, Partial<FormData>>({
      query(body) {
        return {
          url: `users`,
          method: 'POST',
          body,
        };
      },
    }),
    getToken: builder.query<requestGetToken, void >({
      query: () => '/token',
    }),
  }),
});

export const { useListUsersQuery, useAddUserMutation } = usersApi;