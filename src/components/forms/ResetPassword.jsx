import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordInput from './PasswordInput';
import ButtonLoader from '../buttons/ButtonLoader';
import { publicRequest } from '../../helpers/instance';

function ResetPassword({ token, closeModal }) {
    const [newPassword, setNewPassword] = React.useState({ newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (newPassword.newPassword === newPassword.confirmPassword) {
            try {
                const response = await publicRequest.put(`/auth/reset-password/${token}`, {
                    password: newPassword,
                });
                toast.success(response.data.message);
                setLoading(false);
                closeModal();
                navigate('/');
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error('Parola nu a fost modificată');
            }
        } else {
            toast.error('Parolele nu coincid');
            setLoading(false);
        }
    };
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <PasswordInput
                label={'Parola nouă'}
                value={newPassword.newPassword}
                name={'new-password'}
                required
                onChange={(e) =>
                    setNewPassword({
                        ...newPassword,
                        newPassword: e.target.value,
                    })
                }
            />
            <PasswordInput
                label={'Confirmă parola'}
                value={newPassword.confirmPassword}
                name={'confirm-password'}
                required
                onChange={(e) =>
                    setNewPassword({
                        ...newPassword,
                        confirmPassword: e.target.value,
                    })
                }
            />
            <ButtonLoader isLoading={loading} classNames={'w-full'}>
                Resetează parola
            </ButtonLoader>
        </form>
    );
}

export default ResetPassword;
