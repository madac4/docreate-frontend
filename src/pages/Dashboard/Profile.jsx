import { useState, useEffect } from 'react';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

import Layout from '../../components/dashboard/Layout';
import Input from '../../components/forms/Input';
import PasswordInput from '../../components/forms/PasswordInput';
import ButtonLoader from '../../components/buttons/ButtonLoader';
import { publicRequest } from '../../helpers/instance';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';

function Profile() {
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [organization, setOrganization] = useState('');
    let { user, token } = useSelector((state) => state.auth);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function fetchStartData() {
            if (user && user.organization) {
                const response = await publicRequest.get(`/organizations/${user.organization}`, {
                    headers: { 'x-auth-token': `${token}` },
                });
                setOrganization(response.data);
            }
        }

        fetchStartData();
    }, [user, token]);

    const updateProfile = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (updatedUser.email || updatedUser.name) {
            try {
                const { data } = await publicRequest.put(
                    `/users/profile/${user._id}`,
                    updatedUser,
                    {
                        headers: { 'x-auth-token': `${token}` },
                    },
                );
                user = data;
                toast.success('Informația generală a fost modificată');
                setLoading(false);
                setUpdatedUser({
                    name: '',
                    email: '',
                });
            } catch (error) {
                console.log(error);
                toast.error('Informația generală nu a putut fi modificată');
                setLoading(false);
            }
        } else {
            toast.error('Câmpurile sunt goale');
            setLoading(false);
        }
    };

    const updatePassword = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (updatedUser.currentPassword || updatedUser.newPassword || updatedUser.confirmPassword) {
            try {
                const { data } = await publicRequest.put(
                    `/users/profile/${user._id}`,
                    updatedUser,
                    {
                        headers: { 'x-auth-token': `${token}` },
                    },
                );
                user = data;
                toast.success('Parola a fost modificată');
                setLoading(false);
                setUpdatedUser({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } catch (error) {
                toast.error(error.response.data.error);
                setLoading(false);
            }
        }
    };

    const handleDrop = async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('profilePicture', acceptedFiles);

        try {
            setUploading(true);
            const { data } = await publicRequest.put(
                `/users/profile-picture/${user._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-auth-token': `${token}`,
                    },
                },
            );
            setProfilePicture(data.profilePicture);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    // const deleteSession = async (sessionId, deviceId) => {
    //     try {
    //         await publicRequest.delete(`/sessions/${sessionId}`, {
    //             headers: { 'x-auth-token': `${token}` },
    //             params: { deviceId: deviceId },
    //         });
    //         toast.success(`Sesiunea ${sessionId} a fost terminata`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const sessionIcon = (session) => {
    //     if (session === 'Android') {
    //         return <DevicePhoneMobileIcon className="w-6 h-6 dark:text-white" />;
    //     } else if (session === 'iOS') {
    //         return <DevicePhoneMobileIcon className="w-6 h-6 dark:text-white" />;
    //     } else if (session === 'Windows') {
    //         return <ComputerDesktopIcon className="w-6 h-6 dark:text-white" />;
    //     } else if (session === 'Linux') {
    //         return <ComputerDesktopIcon className="w-6 h-6 dark:text-white" />;
    //     } else if (session === 'Mac OS') {
    //         return <ComputerDesktopIcon className="w-6 h-6 dark:text-white" />;
    //     } else {
    //         return <ComputerDesktopIcon className="w-6 h-6 dark:text-white" />;
    //     }
    // };
    return (
        <Layout>
            <div className="relative w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="grid grid-cols-1 pt-4 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                    <div className="mb-4 col-span-full xl:mb-2">
                        <h3 className="font-semibold">Profilul meu</h3>
                    </div>

                    <div className="col-span-full xl:col-auto">
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                                <img
                                    className="mb-4 rounded-lg w-24 object-cover h-24 sm:mb-0 xl:mb-4 2xl:mb-0"
                                    src={profilePicture ? profilePicture : user.profilePicture}
                                    alt={user.name}
                                />
                                <div>
                                    <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                        Imaginea de profil
                                    </h3>
                                    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                        JPG, JPEG sau PNG. Mărimea max 800K
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex relative items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <ArrowUpOnSquareIcon className="w-4 h-4 mr-2 -ml-1" />
                                            {uploading ? 'Se încarcă...' : 'Încarcă imaginea'}

                                            <Dropzone
                                                onDrop={(acceptedFiles) =>
                                                    handleDrop(acceptedFiles[0])
                                                }>
                                                {({ getRootProps, getInputProps }) => (
                                                    <div
                                                        className="absolute inset-0 w-full h-full"
                                                        {...getRootProps()}>
                                                        <input
                                                            id="dropzone-file"
                                                            type="file"
                                                            className="hidden"
                                                            name="profilePicture"
                                                            {...getInputProps()}
                                                        />
                                                    </div>
                                                )}
                                            </Dropzone>
                                        </button>

                                        {/* <button
                                            type="button"
                                            className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            Șterge
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <div className="flow-root">
                                <h3 className="text-xl font-semibold dark:text-white">Sesiuni</h3>
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {sessions &&
                                        sessions.map((session) => (
                                            <li className="py-4" key={session._id}>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        {sessionIcon(session.os)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                                                            {session.city}, {session.ip}
                                                        </p>
                                                        <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                                            {session.browser} pe {session.os}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center">
                                                        <button
                                                            onClick={() =>
                                                                deleteSession(
                                                                    session._id,
                                                                    session.deviceId,
                                                                )
                                                            }
                                                            className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                            Termină
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                         <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
                            <div className="flow-root">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    Notificări
                                </h3>
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="flex items-center justify-between py-4">
                                        <div className="flex flex-col flex-grow">
                                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Aprobare
                                            </div>
                                            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                Primește notificări la aprobarea documentelor
                                                completate
                                            </div>
                                        </div>
                                        <label
                                            for="company-news"
                                            className="relative flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id="company-news"
                                                className="sr-only"
                                            />
                                            <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <ButtonLoader>Salvează</ButtonLoader>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="col-span-2">
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <h5 className="mb-4 font-semibold">Informația generală</h5>
                            <form action="#" onSubmit={updateProfile}>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <Input
                                            label="Numele, Prenumele"
                                            type="text"
                                            name="name"
                                            placeholder={user.name}
                                            value={updatedUser.name}
                                            onChange={(e) =>
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <Input
                                            label="Organizația"
                                            type="text"
                                            name="organization"
                                            placeholder={organization}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-span-6 ">
                                        <Input
                                            label="Email"
                                            type="email"
                                            name="email"
                                            placeholder={user.email}
                                            value={updatedUser.email}
                                            onChange={(e) =>
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-full">
                                        <ButtonLoader isLoading={loading} type={'submit'}>
                                            Salvează
                                        </ButtonLoader>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <h5 className="mb-4 font-semibold">Parola</h5>
                            <form action="#" onSubmit={updatePassword}>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <PasswordInput
                                            label={'Parola curentă'}
                                            name="current-password"
                                            value={updatedUser.currentPassword}
                                            onChange={(e) =>
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    currentPassword: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <PasswordInput
                                            label={'Parola nouă'}
                                            name="new-password"
                                            value={updatedUser.newPassword}
                                            onChange={(e) =>
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    newPassword: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        {/* <div className="absolute z-10 visible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                            <div className="p-3 space-y-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    Must have at least 6 characters
                                                </h3>
                                                <div className="grid grid-cols-4 gap-2">
                                                    <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                                    <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                                    <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                                    <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                                </div>
                                                <p>It’s better to have:</p>
                                                <ul>
                                                    <li className="flex items-center mb-1">
                                                        <svg
                                                            className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clip-rule="evenodd"></path>
                                                        </svg>
                                                        Upper &amp; lower case letters
                                                    </li>
                                                    <li className="flex items-center mb-1">
                                                        <svg
                                                            className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clip-rule="evenodd"></path>
                                                        </svg>
                                                        A symbol (#$&amp;)
                                                    </li>
                                                    <li className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clip-rule="evenodd"></path>
                                                        </svg>
                                                        A longer password (min. 12 chars.)
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                data-popper-arrow=""
                                                // style="position: absolute; left: 0px; transform: translate3d(139px, 0px, 0px);"
                                            ></div>
                                        </div> */}
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <PasswordInput
                                            label={'Confirmă parola'}
                                            value={updatedUser.confirmPassword}
                                            onChange={(e) =>
                                                setUpdatedUser({
                                                    ...updatedUser,
                                                    confirmPassword: e.target.value,
                                                })
                                            }
                                            name="confirm-password"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-full">
                                        <ButtonLoader type="submit" isLoading={loading}>
                                            Salvează
                                        </ButtonLoader>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <p className="my-8 mb-5 text-sm text-center text-gray-500">
                    © 2019-2023{' '}
                    <a
                        href="https://docreate.vercel.app/"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer">
                        doCreate
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </Layout>
    );
}

export default Profile;
