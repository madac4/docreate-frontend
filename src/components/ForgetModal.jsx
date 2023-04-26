import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ButtonLoader from './ButtonLoader';
import { publicRequest } from '../helpers/instance';
import { toast } from 'react-toastify';

function ForgetModal({ openModal, setModal }) {
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
            setModal(false);
        } catch (error) {
            console.log(error);
            toast.error('Utilizatorul nu a fost găsit');
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
                            Forget Password
                        </h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="forget-email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="forget-email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="name@company.com"
                                    required
                                />
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

export default ForgetModal;
