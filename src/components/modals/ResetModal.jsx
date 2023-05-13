import React from 'react';
import { toast } from 'react-toastify';
import { XMarkIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import ButtonLoader from '../buttons/ButtonLoader';
import { publicRequest } from '../../helpers/instance';

function ResetModal({ token }) {
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState({
        newPassword: false,
        confirmPassword: false,
    });
    const [newPassword, setNewPassword] = React.useState({ newPassword: '', confirmPassword: '' });
    const [modal, setModal] = React.useState(true);
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
                setModal(false);
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

    const closeModal = () => {
        setModal(false);
    };

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={modal ? 'modal open' : 'modal'}>
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
                            Reset Password
                        </h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                <label
                                    htmlFor="new-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Parola nouă
                                </label>
                                <input
                                    type={showPassword.newPassword ? 'text' : 'password'}
                                    value={newPassword.newPassword}
                                    onChange={(e) =>
                                        setNewPassword({
                                            ...newPassword,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    name="password"
                                    id="new-password"
                                    placeholder="••••••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                                <span
                                    className="absolute right-4 top-1/2 translate-y-1 inline-flex items-center cursor-pointer"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            newPassword: !showPassword.newPassword,
                                        })
                                    }>
                                    {showPassword.newPassword ? (
                                        <EyeSlashIcon className="w-5 h-5 text-gray-400 " />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-gray-400" />
                                    )}
                                </span>
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirmă parola
                                </label>
                                <input
                                    type={showPassword.confirmPassword ? 'text' : 'password'}
                                    value={newPassword.confirmPassword}
                                    onChange={(e) =>
                                        setNewPassword({
                                            ...newPassword,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    name="password"
                                    id="confirm-password"
                                    placeholder="••••••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                                <span
                                    className="absolute right-4 top-1/2 translate-y-1 inline-flex items-center cursor-pointer"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            confirmPassword: !showPassword.confirmPassword,
                                        })
                                    }>
                                    {showPassword.confirmPassword ? (
                                        <EyeSlashIcon className="w-5 h-5 text-gray-400 " />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-gray-400" />
                                    )}
                                </span>
                            </div>
                            <ButtonLoader
                                isLoading={loading}
                                classNames="button-primary w-full text-center justify-center text-sm font-medium">
                                Resetează parola
                            </ButtonLoader>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetModal;
