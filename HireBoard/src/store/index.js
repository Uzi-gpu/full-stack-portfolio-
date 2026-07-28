import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
import applicationsReducer from "./applicationsSlice";
import { loginApi } from "../apis/loginApi";
import { jobsApi } from "../apis/jobsApi";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    applications: applicationsReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, jobsApi.middleware),
});