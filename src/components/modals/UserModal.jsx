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
        // <div
        //     class="fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex"
        //     id="edit-user-modal"
        //     aria-modal="true"
        //     role="dialog">
        //     <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
        //         <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        //             <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
        //                 <h3 class="text-xl font-semibold dark:text-white">Edit user</h3>
        //                 <button
        //                     type="button"
        //                     class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
        //                     data-modal-toggle="edit-user-modal">
        //                     <svg
        //                         class="w-5 h-5"
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                         xmlns="http://www.w3.org/2000/svg">
        //                         <path
        //                             fill-rule="evenodd"
        //                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        //                             clip-rule="evenodd"></path>
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div class="p-6 space-y-6">
        //                 <form action="#">
        //                     <div class="grid grid-cols-6 gap-6">
        //                         <div class="col-span-6 sm:col-span-3">
        //                             <label
        //                                 for="first-name"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 First Name
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 name="first-name"
        //                                 value="Bonnie"
        //                                 id="first-name"
        //                                 class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="Bonnie"
        //                                 required=""
        //                             />
        //                         </div>
        //                         <div class="col-span-6 sm:col-span-3">
        //                             <label
        //                                 for="last-name"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 Last Name
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 name="last-name"
        //                                 value="Green"
        //                                 id="last-name"
        //                                 class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="Green"
        //                                 required=""
        //                             />
        //                         </div>
        //                         <div class="col-span-6 sm:col-span-3">
        //                             <label
        //                                 for="email"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 Email
        //                             </label>
        //                             <input
        //                                 type="email"
        //                                 name="email"
        //                                 value="bonnie@flowbite.com"
        //                                 id="email"
        //                                 class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="example@company.com"
        //                                 required=""
        //                             />
        //                         </div>
        //                         <div class="col-span-6 sm:col-span-3">
        //                             <label
        //                                 for="position"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 Position
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 name="position"
        //                                 value="React Developer"
        //                                 id="position"
        //                                 class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="e.g. React developer"
        //                                 required=""
        //                             />
        //                         </div>
        //                         <div class="col-span-6 sm:col-span-3">
        //                             <label
        //                                 for="current-password"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 Current Password
        //                             </label>
        //                             <input
        //                                 type="password"
        //                                 name="current-password"
        //                                 value="••••••••"
        //                                 id="current-password"
        //                                 class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="••••••••"
        //                                 required=""
        //                             />
        //                         </div>
        //                         <div class="col-span-6 sm:col-span-3">
        //                             <label
        //                                 for="new-password"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 New Password
        //                             </label>
        //                             <input
        //                                 type="password"
        //                                 name="new-password"
        //                                 value="••••••••"
        //                                 id="new-password"
        //                                 class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="••••••••"
        //                                 required=""
        //                             />
        //                         </div>
        //                         <div class="col-span-6">
        //                             <label
        //                                 for="biography"
        //                                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //                                 Biography
        //                             </label>
        //                             <textarea
        //                                 id="biography"
        //                                 rows="4"
        //                                 class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        //                                 placeholder="👨&zwj;💻Full-stack web developer. Open-source contributor.">
        //                                 👨&zwj;💻Full-stack web developer. Open-source
        //                                 contributor.
        //                             </textarea>
        //                         </div>
        //                     </div>
        //                 </form>
        //             </div>
        //             <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        //                 <button
        //                     class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        //                     type="submit">
        //                     Save all
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default UserModal;
