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
        const { data } = await publicRequest.post('/auth/login', body, config);
        dispatch(loginSuccess(data));
        toast.success('Te-ai logat cu succes');
        const token = data.token
            ? data.token
            : localStorage.getItem('persist:root') &&
              JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token;
        dispatch(loadUser(token));
    } catch (error) {
        toast.error('Email sau parola este greșită');
        dispatch(loginError());
    }
};

export const loadUser = (token, sessionId, deviceId) => async (dispatch) => {
    if (token) {
        try {
            const { data } = await publicRequest.get(`/auth/`, {
                headers: { 'x-auth-token': `${token}` },
                params: { sessionId: sessionId, deviceId: deviceId },
            });

            if (data) {
                dispatch(userLoaded(data));
                console.log(data);
            } else {
                dispatch(loginError());
            }
        } catch (error) {
            dispatch(loginError());
        }
    }
};

export const logOut = (sessionId, token) => async (dispatch) => {
    dispatch(logout());
    try {
        await publicRequest.delete(`/sessions/${sessionId}`, {
            headers: { 'x-auth-token': `${token}` },
        });
    } catch (error) {
        console.log(error);
    }
    toast.error('Ai ieșit din cont');
};
