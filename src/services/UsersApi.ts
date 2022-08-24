import {
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { requestGetUser } from '../types/requestGetUser';
import { User } from '../types/User';
import { requestGetToken } from '../types/requestGetToken';
import { removeToken, setToken } from '../app/auth';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';


const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('token', token);
    }

    return headers;
  }
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi
) => {
  let result = await baseQuery(args, api, {});

  if (result?.error?.status === 401 && !result?.data?.success) {
    const refreshResult = await baseQuery('token', api, {});

    if (refreshResult.data) {
      api.dispatch(setToken(refreshResult.data?.token));
      localStorage.setItem('access_token', refreshResult.data?.token);

      result = await baseQuery(args, api, {});
    } else {
      api.dispatch(removeToken());
    }
  }

  return result;
};

export const usersApi = createApi({
  baseQuery: baseQueryWithReauth,
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

export const {
  useListUsersQuery,
  useAddUserMutation,
  useGetTokenQuery
} = usersApi;