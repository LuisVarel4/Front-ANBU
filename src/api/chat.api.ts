import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Message } from '../types/chat';

export interface ChatPaginationQuery {
  take?: number;
  before?: string; // ISO string
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    count: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/chat',
    credentials: 'include', // Importante para sesión
  }),
  endpoints: (builder) => ({
    getMessages: builder.query<
      PaginatedResponse<Message>,
      { missionId: string; pagination?: ChatPaginationQuery }
    >({
      query: ({ missionId, pagination }) => {
        const params = new URLSearchParams();
        if (pagination?.take) params.append('take', String(pagination.take));
        if (pagination?.before) params.append('before', pagination.before);

        return {
          url: `/${missionId}?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetMessagesQuery } = chatApi;