import React from 'react';
import { BellIcon, DocumentPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const auth = useSelector((state) => state.auth);
    return (
        <header className="absolute w-full">
            <div className="container mx-auto pt-3 px-3 sm:px-0">
                <div className="flex justify-end items-center dark:bg-gray-700 bg-zinc-100 shadow-sm rounded-md p-3 gap-4">
                    <Link
                        to="/"
                        className="flex-1 font-semibold sm:text-lg text-sm dark:text-white">
                        doCreator
                    </Link>
                    <button>
                        <BellIcon className="w-6 h-6 text-gray-400 hover:text-gray-900 transition-colors dark:hover:text-white"></BellIcon>
                    </button>

                    {auth.isAuth ? (
                        <Link className="button-primary" to="/documents-list">
                            <span className="text-sm font-medium"> Creează document </span>
                            <DocumentPlusIcon className="w-5 h-5"></DocumentPlusIcon>
                        </Link>
                    ) : (
                        <Link className="button-primary" to="/login">
                            <span className="text-sm font-medium"> Intră în cont </span>
                            <ArrowRightOnRectangleIcon className="w-5 h-5"></ArrowRightOnRectangleIcon>
                        </Link>
                    )}
                    {auth.isAuth && auth.user && (
                        <Link to={'/dashboard'} className="block shrink-0">
                            <span className="sr-only">Profile</span>
                            <img
                                alt="Man"
                                src={auth.user.profilePicture}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
