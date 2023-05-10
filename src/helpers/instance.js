import axios from 'axios';
import { toast } from 'react-toastify';

export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API,
});

export const getDocumentList = async (token) => {
    if (token) {
        try {
            const { data } = await publicRequest.get('/documents', {
                headers: { 'x-auth-token': `${token}` },
            });
            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    } else {
        toast.error('Nu sunteți logat');
    }
};
