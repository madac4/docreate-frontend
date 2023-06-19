import React from 'react';

import ForgetModal from './ForgetModal';
import LoginForm from '../forms/LoginForm';
import CloseModal from './CloseModal';
import OutsideClickHandler from '../OutsideClickHandler';

function LoginModal({ openModal, setModal }) {
    const [forgetModal, setForgetModal] = React.useState(false);
    const closeModal = () => {
        setModal(false);
        setForgetModal(false);
    };

    return (
        <>
            {!forgetModal && (
                <OutsideClickHandler onOutsideClick={closeModal} openModal={openModal}>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <CloseModal closeModal={closeModal} />

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
                </OutsideClickHandler>
            )}
            {forgetModal && (
                <OutsideClickHandler onOutsideClick={closeModal} openModal={openModal}>
                    <ForgetModal openModal={forgetModal} setModal={setForgetModal} />
                </OutsideClickHandler>
            )}
        </>
    );
}

export default LoginModal;
