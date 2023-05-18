import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import ForgetModal from './ForgetModal';
import LoginForm from '../forms/LoginForm';

function LoginModal({ openModal, setModal }) {
    const [forgetModal, setForgetModal] = React.useState(false);
    const closeModal = () => {
        setModal(false);
    };

    return (
        <>
            <div
                tabIndex="-1"
                className={`${
                    openModal
                        ? 'opacity-1 visible scale-100 backdrop-blur-sm'
                        : 'opacity-0 invisible scale-90 backdrop-blur-none'
                } transition-all fixed z-50 items-center  justify-center overflow-x-hidden overflow-y-auto inset-0 h-modal sm:h-full flex`}>
                <div className="w-full h-full max-w-md md:h-auto modal-body px-3">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <XMarkIcon onClick={closeModal} className="w-6 h-6"></XMarkIcon>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div className="px-6 pt-10 pb-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                Autentificăte pe platformă
                            </h3>
                            <LoginForm
                                setForgetModal={setForgetModal}
                                setModal={setModal}
                                closeModal={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ForgetModal openModal={forgetModal} setModal={setForgetModal} />
        </>
    );
}

export default LoginModal;
