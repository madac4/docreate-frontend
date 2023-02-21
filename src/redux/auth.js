import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        isAuth: false,
        loading: false,
        error: null,
    },
    reducers: {
        authRequest: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        loginSuccess: (state, action) => {
            return {
                ...state,
                ...action.payload,
                token: action.payload.token,
                isAuth: true,
                loading: false,
            };
        },
        loginError: (state) => {
            return {
                token: null,
                user: null,
                isAuth: false,
                loading: false,
            };
        },
        userLoaded: (state, action) => {
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false,
            };
        },
        logout: (state) => {
            return {
                token: null,
                user: null,
                isAuth: false,
                loading: false,
            };
        },
    },
});

export const { authRequest, loginError, loginSuccess, userLoaded, logout } = authSlice.actions;
export default authSlice.reducer;
