import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import InviteForm from '../forms/InviteForm';

function InviteModal({ isOpen, setIsOpen }) {
    return (
        <div
            className={`${
                isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'
            } transition-all fixed z-50 items-center bg-black bg-opacity-40 justify-center overflow-x-hidden overflow-y-auto inset-0 h-modal sm:h-full flex`}
            id="add-user-modal">
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto flex justify-center items-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 w-full">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold dark:text-white">Invită utilizator</h3>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <InviteForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InviteModal;
