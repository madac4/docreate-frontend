import { authRequest, loginError, loginSuccess, userLoaded, logout } from './auth';
import { loginRequest, loadRequest } from '../helpers/instance';
import { toast } from 'react-hot-toast';

export const loginUser = (body) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const { data } = await loginRequest(body);
        dispatch(loginSuccess(data));
        const token = data.token
            ? data.token
            : localStorage.getItem('persist:root') &&
              JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token;
        dispatch(loadUser(token));
        toast.success('Te-ai logat cu succes');
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(loginError());
    }
};

export const loadUser = (token) => async (dispatch) => {
    if (token) {
        try {
            const { data } = await loadRequest(token);
            if (data) {
                dispatch(userLoaded(data));
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
