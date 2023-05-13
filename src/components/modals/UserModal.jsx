import React from 'react';
import { XMarkIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { publicRequest } from '../../helpers/instance';
import { toast } from 'react-toastify';
import ButtonLoader from '../buttons/ButtonLoader';

function UserModal({ user, isOpen, setIsOpen, token }) {
    const [updatedUser, setUpdatedUser] = React.useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    function handleCheckboxChange() {
        setShowPassword(!showPassword);
    }
    const closeModal = () => {
        setIsOpen(false);
    };

    const updateUser = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (updatedUser.email || updatedUser.name || updatedUser.password) {
            try {
                const { data } = await publicRequest.put(`/users/update/${user._id}`, updatedUser, {
                    headers: { 'x-auth-token': `${token}` },
                });
                user = data;
                toast.success('Utilizatorul a fost modificat cu succes');
                setLoading(false);
                setIsOpen(false);
                setUpdatedUser({ name: '', email: '', password: '' });
            } catch (error) {
                console.log(error);
                toast.error('Utilizatorul nu a putut fi modificat');
                setLoading(false);
            }
        } else {
            toast.error('Câmpurile sunt goale');
            setLoading(false);
        }
    };
    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={isOpen ? 'modal open' : 'modal'}>
            <div className="w-full h-full max-w-md md:h-auto modal-body">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pt-4">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal">
                        <XMarkIcon onClick={closeModal} className="w-6 h-6"></XMarkIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            Modifică utilizatorul "{user.name}"
                        </h3>
                        <form className="space-y-6" onSubmit={updateUser}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {' '}
                                    Numele{' '}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedUser.name}
                                    onChange={(e) =>
                                        setUpdatedUser({ ...updatedUser, name: e.target.value })
                                    }
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Numele"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedUser.email}
                                    onChange={(e) =>
                                        setUpdatedUser({ ...updatedUser, email: e.target.value })
                                    }
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Parola Nouă
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={updatedUser.password}
                                    onChange={(e) =>
                                        setUpdatedUser({ ...updatedUser, password: e.target.value })
                                    }
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                            <ButtonLoader isLoading={loading}>Modifică datele</ButtonLoader>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModal;
