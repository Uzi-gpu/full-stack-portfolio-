import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("taskly-theme");
const initialTheme = saved === "dark" || saved === "light" ? saved : "light";

const uiSlice = createSlice({
  name: "ui",
  initialState: { theme: initialTheme },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("taskly-theme", state.theme);
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
