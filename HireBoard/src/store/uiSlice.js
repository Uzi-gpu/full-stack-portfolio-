import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("hireboard-theme");
const initialTheme = saved === "dark" || saved === "light" ? saved : "light";

const uiSlice = createSlice({
    name: "ui",
    initialState: { theme: initialTheme },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
            localStorage.setItem("hireboard-theme", action.payload);
        },
        toggleTheme(state) {
            state.theme = state.theme === "dark" ? "light" : "dark";
            localStorage.setItem("hireboard-theme", state.theme);
        },
    },
});

export const { setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;