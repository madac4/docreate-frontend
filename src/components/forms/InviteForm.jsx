import React from 'react';
import ButtonLoader from '../buttons/ButtonLoader';
import Input from './Input';
import { publicRequest } from '../../helpers/instance';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function InviteForm() {
    const [loading, setLoading] = React.useState(false);
    const { token } = useSelector((state) => state.auth);
    const [email, setEmail] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await publicRequest.post(
                '/auth/invite',
                { email },
                {
                    headers: { 'x-auth-token': `${token}` },
                },
            );
            console.log(data);
            data && toast.success('Invitația a fost trimisă');
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Ceva a mers gresit');
            setLoading(false);
        }
        setEmail('');
    };

    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                    <Input
                        type={'email'}
                        placeholder={'Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <ButtonLoader classNames={'w-full py-3 mt-6'} isLoading={loading}>
                Trimite invitație
            </ButtonLoader>
        </form>
    );
}

export default InviteForm;
