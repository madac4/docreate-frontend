import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { publicRequest } from '../../helpers/instance';
import Dashboard from './Dashboard';
import ButtonLoader from '../../components/buttons/ButtonLoader';

function Register() {
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
            // data && toast.success('Utilizatorul a fost creat cu succes');
            // console.log(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Ceva a mers gresit');
            setLoading(false);
        }
        setEmail('');
    };

    return (
        <Dashboard pageTitle="Invită Utilizator">
            <section className="dark:dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
                <form
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                    className="flex flex-col mt-5 max-w-xl w-full mx-auto gap-5">
                    <label className="form-label">
                        Email
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                        />
                    </label>

                    <ButtonLoader isLoading={loading}>Invită persoană</ButtonLoader>
                </form>
            </section>
        </Dashboard>
    );
}

export default Register;
