import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
import pinsReducer from "./pinsSlice";
import { loginApi } from "../apis/loginApi";
import { todosApi } from "../apis/todosApi";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    pins: pinsReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, todosApi.middleware),
});
