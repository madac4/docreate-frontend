import React from 'react';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginModal from '../components/modals/LoginModal';
import styles from './styles/buttons.module.scss';
import ThemeToggle from './buttons/ThemeToggle';

export default function Layout({ children }) {
    const auth = useSelector((state) => state.auth);
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
                            {auth.isAuth ? (
                                <Link className={styles.buttonPrimary} to="/documents">
                                    <span className="text-sm font-medium"> Creează document </span>
                                    <DocumentPlusIcon className="w-5 h-5"></DocumentPlusIcon>
                                </Link>
                            ) : (
                                <button onClick={handleModal} className={styles.buttonPrimary}>
                                    Autentificare
                                </button>
                            )}

                            <ThemeToggle></ThemeToggle>
                            {auth.isAuth && auth.user && (
                                <>
                                    <Link
                                        to={'/dashboard'}
                                        className="block shrink-0 border rounded-full">
                                        <span className="sr-only">Profile</span>
                                        <img
                                            alt="Man"
                                            src={auth.user.profilePicture}
                                            className="md:h-9 md:w-9 w-8 h-8 rounded-full object-cover"
                                        />
                                    </Link>
                                </>
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
