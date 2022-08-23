import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { requestGetUser } from '../types/requestGetUser';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    getUsersByPage: builder.query<requestGetUser, string>({
      query: (page) => `?page=${page}&count=6`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersByPageQuery } = usersApi;