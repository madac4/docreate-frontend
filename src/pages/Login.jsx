import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AtSymbolIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { loginUser } from '../redux/api';

function Login() {
    const navigate = useNavigate();
    const authData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [auth, setAuth] = React.useState({
        email: '',
        password: '',
    });

    React.useEffect(() => {
        if (authData.isAuth) {
            navigate('/');
        }
    }, [authData.isAuth, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value });
    };

    function handleCheckboxChange() {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser(auth));
        if (authData.isAuth) {
            navigate('/');
        }
    };
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl dark:text-white">Logare</h1>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>

                        <div className="relative">
                            <input
                                type="email"
                                value={auth.email}
                                name="email"
                                id="email"
                                onChange={handleChange}
                                required
                                className="auth-input"
                                placeholder="Enter email"
                            />

                            <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                <AtSymbolIcon className="h-5 w-5 text-gray-400" />
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={auth.password}
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

                    <button
                        type="submit"
                        className="button-primary py-3 w-full text-center justify-center"
                        disabled={authData.loading}>
                        {authData.loading ? <span className="loader"></span> : 'Intră în cont'}
                    </button>
                    <Link to="/" className="underline text-gray-400 mt-3 block text-center">
                        Înapoi acasă
                    </Link>
                </form>
            </div>
        </>
    );
}

export default Login;
