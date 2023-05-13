import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Input from '../forms/Input';

function InviteModal({ isOpen, setIsOpen }) {
    return (
        <div
            className={`${
                isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'
            } transition-all fixed left-0 right-0 z-50 items-center bg-black bg-opacity-40 justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex`}
            id="add-user-modal"
            aria-modal="true"
            role="dialog">
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
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
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <Input
                                        label={'Email'}
                                        type={'email'}
                                        placeholder={'Email'}></Input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                        <button
                            className="text-white bg-primary-700 w-full hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            type="submit">
                            Trimite invitație
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InviteModal;
