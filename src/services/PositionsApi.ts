import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { requestGetPositions } from '../types/requestGetPositions';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const positionsApi = createApi({
  reducerPath: 'positionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    getPositions: builder.query<requestGetPositions, void >({
      query: () => '/positions',
    }),
  }),
});

export const { useGetPositionsQuery } = positionsApi;