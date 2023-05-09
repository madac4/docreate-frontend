import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { publicRequest } from '../../helpers/instance';
import Dashboard from './Dashboard';
import ButtonLoader from '../../components/ButtonLoader';

function Register() {
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const { token } = useSelector((state) => state.auth);
    const [register, setRegister] = React.useState({
        name: '',
        email: '',
        password: '',
        organization: '',
    });

    function handleCheckboxChange() {
        setShowPassword(!showPassword);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await publicRequest.post('/auth/register', register, {
                headers: { 'x-auth-token': `${token}` },
            });
            data && toast.success('Utilizatorul a fost creat cu succes');
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Ceva a mers gresit');
            setLoading(false);
        }
        setRegister({ name: '', email: '', password: '', organization: '' });
    };

    return (
        <Dashboard pageTitle="Adaugă Utilizator">
            <section className="dark:dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
                <form
                    action="#"
                    method="post"
                    onSubmit={handleSubmit}
                    className="flex flex-col mt-5 max-w-xl w-full mx-auto gap-5">
                    <label className="form-label">
                        Nume/Prenume
                        <input
                            type="text"
                            name="name"
                            value={register.name}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </label>

                    <label className="form-label">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={register.email}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </label>
                    <label className="form-label">
                        Organizația
                        <input
                            type="text"
                            name="organization"
                            value={register.organization}
                            onChange={handleChange}
                            className="auth-input"
                        />
                    </label>
                    <div>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="relative mt-1 w-full">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                required
                                className="auth-input"
                                placeholder="Enter password"
                            />

                            <span
                                className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
                                onClick={handleCheckboxChange}>
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5 text-gray-400 " />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </span>
                        </div>
                    </div>

                    <ButtonLoader isLoading={loading}>Crează cont</ButtonLoader>
                </form>
            </section>
        </Dashboard>
    );
}

export default Register;
