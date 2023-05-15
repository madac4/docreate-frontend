import React from 'react';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

function Confirmation({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed left-0 right-0 bg-black bg-opacity-40 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex">
            <div className="relative w-full h-full max-w-md px-4 md:h-auto flex items-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 w-full">
                    <div className="flex justify-end p-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 pt-0 text-center">
                        <ExclamationCircleIcon className="w-16 h-16 mx-auto text-red-600" />
                        <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                            {message.message}
                        </h3>
                        <button
                            onClick={() => onConfirm(message.id)}
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                            Șterge
                        </button>
                        <button
                            onClick={onCancel}
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                            Anulare
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
