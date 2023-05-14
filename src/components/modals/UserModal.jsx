import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import EditUser from '../forms/EditUser';

function UserModal({ user, isOpen, setIsOpen, token, clearUser }) {
    const closeModal = () => {
        setIsOpen(false);
        clearUser({});
    };

    return (
        <div
            className={` ${
                isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'
            } fixed left-0 right-0 z-50 bg-black transition-all bg-opacity-40 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex`}>
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold dark:text-white">
                            Editează utilizator {user.name}
                        </h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <EditUser user={user} token={token} closeModal={closeModal} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModal;
