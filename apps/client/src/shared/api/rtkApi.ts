import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCAL_STORAGE_KEY } from '~/shared/constants/localstorage';

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';
      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: (_builder) => ({}),
});
