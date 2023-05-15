import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ResetPassword from '../forms/ResetPassword';

function ResetModal({ token }) {
    const [modal, setModal] = React.useState(true);

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
                            Resetează parola
                        </h3>

                        <ResetPassword token={token} closeModal={closeModal} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetModal;
