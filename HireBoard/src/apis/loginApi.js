import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/cookies";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password, expiresInMins: 60 },
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
