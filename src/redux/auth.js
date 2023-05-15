import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAdmin: null,
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
                isAdmin: false,
            };
        },
        userLoaded: (state, action) => {
            return {
                ...state,
                user: action.payload,
                isAdmin: action.payload.role.toLowerCase() === 'admin' ? true : false,
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
                isAdmin: false,
            };
        },
    },
});

export const { authRequest, loginError, loginSuccess, userLoaded, logout } = authSlice.actions;
export default authSlice.reducer;
