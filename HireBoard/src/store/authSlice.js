import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

const TOKEN_KEY = "hireboard-token";
const USER_KEY = "hireboard-user";

function readStoredUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: readStoredUser(),
        token: getCookie(TOKEN_KEY),
    },
    reducers: {
        setCredentials(state, action) {
            const payload = action.payload;
            state.token = payload.accessToken;
            state.user = {
                id: payload.id,
                username: payload.username,
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                image: payload.image,
            };
            setCookie(TOKEN_KEY, payload.accessToken, 7);
            localStorage.setItem(USER_KEY, JSON.stringify(state.user));
        },
        logout(state) {
            state.user = null;
            state.token = null;
            deleteCookie(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;