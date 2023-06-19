import axios from 'axios';
import { toast } from 'react-hot-toast';

export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
});

export const loginRequest = (credentials) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return publicRequest.post(`/auth/login`, credentials, config);
};

export const loadRequest = (token) => {
    return publicRequest.get(`/auth/`, {
        headers: { 'x-auth-token': `${token}` },
    });
};

export const logoutRequest = (token) => {};

export const getDocumentList = async (token) => {
    if (token) {
        try {
            const { data } = await publicRequest.get('/documents', {
                headers: { 'x-auth-token': `${token}` },
            });
            return data;
        } catch (error) {
            console.log(error);
            // toast.error(error.message);
        }
    } else {
        // toast.error('Nu sunteți logat');
    }
};
