import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

import ButtonLoader from '../../components/buttons/ButtonLoader';
import PasswordInput from '../../components/forms/PasswordInput';
import { publicRequest } from '../../helpers/instance';
import Input from '../../components/forms/Input';
import Layout from '../../components/Layout';

function Register() {
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const getRegisterEmail = async (token) => {
            const { data } = await publicRequest.get(`/auth/register/${token}`, {
                headers: { 'x-auth-token': `${token}` },
            });
            setRegister({ email: data });
        };

        getRegisterEmail(token);
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await publicRequest.post('/auth/register', register, {
                headers: { 'x-auth-token': `${token}` },
            });
            // data && toast.success('Utilizatorul a fost creat cu succes');
            setLoading(false);
            navigate('/');
            setRegister({ name: '', email: '', password: '' });
        } catch (error) {
            setLoading(false);
            // toast.error('Eroare la crearea contului');
            setRegister({ name: '', email: '', password: '' });
        }
    };

    return (
        <Layout>
            <section className="dark:dark:bg-gray-900 px-4 sm:px-6 lg:px-8 h-screen pt-36">
                <form
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                    className="flex flex-col max-w-xl w-full mx-auto gap-5">
                    <Input
                        placeholder={'Popescu Ion'}
                        label={'Nume, Prenume'}
                        type={'text'}
                        value={register.name}
                        required
                        onChange={(e) => setRegister({ ...register, name: e.target.value })}
                    />
                    <Input
                        placeholder={'example@example.com'}
                        label={'Email'}
                        required
                        type={'email'}
                        value={register.email}
                        onChange={(e) => setRegister({ ...register, email: e.target.value })}
                    />

                    <PasswordInput
                        label={'Parola'}
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, password: e.target.value })}
                        required
                    />
                    <ButtonLoader isLoading={loading}>Crează cont</ButtonLoader>
                </form>
            </section>
        </Layout>
    );
}

export default Register;
