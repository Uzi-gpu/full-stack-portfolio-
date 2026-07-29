import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/cookies";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || getCookie("taskly-token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos?limit=20",
      transformResponse: (response) => response?.todos || [],
      providesTags: ["Todos"],
    }),

    // NEW: Add Todo Mutation with Optimistic Updates
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos/add",
        method: "POST",
        body: newTodo,
      }),
      onQueryStarted: async (newTodo, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache so the task shows up instantly
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.unshift({
              id: Date.now(),
              todo: newTodo.todo,
              completed: newTodo.completed,
              userId: newTodo.userId
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Rollback if the API fails
        }
      },
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todosApi;