import React from 'react';
import Input from './Input';
import ButtonLoader from '../buttons/ButtonLoader';
import { toast } from 'react-toastify';
import { publicRequest } from '../../helpers/instance';

function ForgetPassword({ closeModal }) {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await publicRequest.post('/auth/forget-password', { email });
            toast.success(response.data.message);
            setEmail('');
            setLoading(false);
            closeModal();
        } catch (error) {
            console.log(error);
            toast.error('Utilizatorul nu a fost găsit');
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
                label={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={'email'}
                placeholder="name@company.com"
                name={'forget-email'}
                required
            />

            <ButtonLoader isLoading={loading} classNames="w-full">
                Resetează parola
            </ButtonLoader>
        </form>
    );
}

export default ForgetPassword;
