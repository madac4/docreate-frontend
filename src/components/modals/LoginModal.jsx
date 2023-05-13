import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { loginUser } from '../../redux/api';
import ButtonLoader from '../buttons/ButtonLoader';
import ForgetModal from './ForgetModal';
import PasswordInput from '../forms/PasswordInput';
import Input from '../forms/Input';

function LoginModal({ openModal, setModal }) {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        dispatch(loginUser(auth));
        if (authData.isAuth) {
            setModal(false);
        }
        setLoading(false);
    };

    const forgetPassword = () => {
        setForgetModal(true);
        setModal(false);
    };

    const closeModal = () => {
        setModal(false);
        setAuth({ email: '', password: '' });
    };

    return (
        <>
            <div tabIndex="-1" className={openModal ? 'modal open' : 'modal'}>
                <div className="w-full h-full max-w-md md:h-auto modal-body">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <XMarkIcon onClick={closeModal} className="w-6 h-6"></XMarkIcon>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Autentificăte pe platformă
                            </h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <Input
                                    value={auth.email}
                                    onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                                    placeholder="name@company.com"
                                    type="email"
                                    label="Email"
                                />

                                <PasswordInput
                                    value={auth.password}
                                    setAuth={(e) => setAuth({ ...auth, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={forgetPassword}
                                    className="text-sm text-blue-700 hover:underline dark:text-blue-500 flex justify-end w-full">
                                    Lost Password?
                                </button>
                                <ButtonLoader isLoading={loading} classNames="w-full">
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
