import React from 'react';
import ForgetPassword from '../forms/ForgetPassword';
import CloseModal from './CloseModal';

function ForgetModal({ openModal, setModal }) {
    const closeModal = () => {
        setModal(false);
    };
    return (
        <div className="w-full h-full max-w-md md:h-auto modal-body">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <CloseModal closeModal={closeModal} />
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Ai uitat parola?
                    </h3>
                    <ForgetPassword closeModal={closeModal} />
                </div>
            </div>
        </div>
    );
}

export default ForgetModal;
