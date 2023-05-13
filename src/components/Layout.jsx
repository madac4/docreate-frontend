import React from 'react';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginModal from '../components/modals/LoginModal';
import styles from './styles/buttons.module.scss';
import ThemeToggle from './buttons/ThemeToggle';

export default function Layout({ children }) {
    const auth = useSelector((state) => state.auth);
    const [modal, setModal] = React.useState(false);

    const handleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="wrapper h-screen overflow-hidden">
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b dark:border-gray-600">
                    <div className="flex flex-wrap justify-between items-center container">
                        <Link to="/" className="flex items-center">
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
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
                                        className="block shrink-0 border rounded-full mr-2">
                                        <span className="sr-only">Profile</span>
                                        <img
                                            alt="Man"
                                            src={auth.user.profilePicture}
                                            className="h-9 w-9 rounded-full object-cover"
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
