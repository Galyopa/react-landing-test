/* eslint-disable max-len */
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { requestGetUser } from '../types/requestGetUser';
import { User } from '../types/User';
import { requestGetToken } from '../types/requestGetToken';
import { setToken } from '../app/auth';
import { RootState } from '../app/store';
import {
  BaseQueryApi,
  BaseQueryFn,
  QueryReturnValue
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { CustomError } from '../types/CustomError';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('token', token);
    }

    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  const { data } = result as QueryReturnValue<requestGetToken>;

  if (result?.error?.status === 401 && !data?.success) {
    const refreshResult = await baseQuery('token', api, {});

    const {
      data: refreshData
    } = refreshResult as QueryReturnValue<requestGetToken>;

    if (refreshData) {
      api.dispatch(setToken(refreshData?.token));

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const usersApi = createApi({
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ['Users', 'Token'],
  endpoints: (builder) => ({
    listUsers: builder.query<requestGetUser<User>, number | void>({
      query: (page = 0) => `users?page=${page}&count=6`,
      providesTags: (result) =>
        result
          ? [
            ...result.users.map(({ id }) => ({ type: 'Users' as const, id })),
            { type: 'Users', id: 'PARTIAL-LIST' },
          ]
          : [{ type: 'Users', id: 'PARTIAL-LIST' }],
    }),
    addUser: builder.mutation<User, Partial<FormData>>({
      query(body) {
        return {
          url: `users`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'PARTIAL-LIST' }],
    }),
    getToken: builder.query<requestGetToken, void >({
      query: () => '/token',
      providesTags: ['Token'],
    }),
  }),
});

export const {
  useListUsersQuery,
  useAddUserMutation,
  useGetTokenQuery,
  usePrefetch
} = usersApi;