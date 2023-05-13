import React from 'react';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginModal from './modals/LoginModal';
import styles from './styles/buttons.module.scss';
import ThemeToggle from './buttons/ThemeToggle';
import UserDropdown from './dashboard/UserDropdown';

export default function Layout({ children, logOut }) {
    const { user, isAuth } = useSelector((state) => state.auth);
    const [modal, setModal] = React.useState(false);
    const location = useLocation();

    const handleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="wrapper h-screen overflow-auto">
            <header className={`w-full z-10 ${location.pathname === '/' ? 'absolute' : 'sticky'}`}>
                <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-800 border-b dark:border-gray-600">
                    <div className="flex flex-wrap justify-between items-center container">
                        <Link to="/" className="flex items-center">
                            <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white md:text-xl">
                                doCreator
                            </span>
                        </Link>
                        <div className="flex items-center lg:order-2">
                            {isAuth ? (
                                <Link className={styles.buttonPrimary} to="/documents">
                                    <span className="text-sm font-medium"> Creează document </span>
                                    <DocumentPlusIcon className="w-5 h-5"></DocumentPlusIcon>
                                </Link>
                            ) : (
                                <button onClick={handleModal} className={styles.buttonPrimary}>
                                    Autentificare
                                </button>
                            )}

                            <ThemeToggle />
                            {isAuth && user && (
                                <UserDropdown user={user}>
                                    <ul
                                        className="py-1 text-gray-700 dark:text-gray-300"
                                        aria-labelledby="dropdown">
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                                                Dashboard
                                            </Link>
                                        </li>
                                    </ul>
                                </UserDropdown>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <LoginModal openModal={modal} setModal={setModal}></LoginModal>

            <main>{children}</main>
        </div>
    );
}
