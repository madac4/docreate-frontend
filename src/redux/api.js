import { authRequest, loginError, loginSuccess, userLoaded, logout } from './auth';
import { publicRequest } from '../helpers/instance';
import { toast } from 'react-toastify';

export const loginUser = (body) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    dispatch(authRequest());
    try {
        const res = await publicRequest.post('/auth/login', body, config);
        dispatch(loginSuccess(res.data));
        toast.success('Te-ai logat cu succes');
        const token = res.data.token
            ? res.data.token
            : localStorage.getItem('persist:root') &&
              JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token;
        dispatch(loadUser(token));
    } catch (error) {
        toast.error('Email sau parola este greșită');
        dispatch(loginError());
    }
};

export const loadUser = (token) => async (dispatch) => {
    if (token) {
        try {
            const res = await publicRequest.get('/auth/', {
                headers: { 'x-auth-token': `${token}` },
            });
            if (res.data) {
                dispatch(userLoaded(res.data));
            } else {
                dispatch(loginError());
            }
        } catch (error) {
            dispatch(loginError());
        }
    }
};

export const logOut = () => async (dispatch) => {
    dispatch(logout());
    toast.error('Ai ieșit din cont');
};
