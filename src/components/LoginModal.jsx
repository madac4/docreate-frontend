import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { loginUser } from '../redux/api';
import ButtonLoader from './ButtonLoader';
import ForgetModal from './ForgetModal';

function LoginModal({ openModal, setModal }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [forgetModal, setForgetModal] = React.useState(false);
    const [auth, setAuth] = React.useState({
        email: '',
        password: '',
    });
    const authData = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (authData.isAuth) {
            setModal(false);
        }
    }, [authData.isAuth, setModal]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value });
    };

    function handleCheckboxChange() {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        dispatch(loginUser(auth));
        if (authData.isAuth) {
            setModal(false);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const forgetPassword = () => {
        setForgetModal(true);
        setModal(false);
    };

    const closeModal = () => {
        setModal(false);
    };
    return (
        <>
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className={openModal ? 'modal open' : 'modal'}>
                <div className="w-full h-full max-w-md md:h-auto modal-body">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-hide="authentication-modal">
                            <XMarkIcon onClick={closeModal} className="w-6 h-6"></XMarkIcon>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        value={auth.email}
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Parola
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={auth.password}
                                        onChange={handleChange}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                    />
                                    <span
                                        className="absolute right-4 top-1/2 translate-y-1 inline-flex items-center cursor-pointer"
                                        onClick={handleCheckboxChange}>
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5 text-gray-400 " />
                                        ) : (
                                            <EyeIcon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start"></div>
                                    <button
                                        type="button"
                                        onClick={forgetPassword}
                                        className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                                        Lost Password?
                                    </button>
                                </div>
                                <ButtonLoader
                                    isLoading={loading}
                                    classNames="button-primary w-full text-center justify-center text-sm font-medium">
                                    Intră în profil
                                </ButtonLoader>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ForgetModal openModal={forgetModal} setModal={setForgetModal} />
        </>
    );
}

export default LoginModal;
