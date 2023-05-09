import React from 'react';
import { BellIcon, Bars3Icon, XMarkIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import { useSelector, connect } from 'react-redux';
import { logOut } from '../../redux/api';

function Dashboard({ children, logOut, pageTitle }) {
    const [userDropdown, setUserDropdown] = React.useState(false);
    const [burger, setBurger] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const { user, isAuth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        user && user.role.toLowerCase() === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
    }, [user]);

    React.useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const handleDropdown = () => {
        setUserDropdown(!userDropdown);
    };
    const handleBurger = () => {
        setBurger(!burger);
    };

    const logout = () => {
        logOut();
        navigate('/');
    };
    return (
        <div className="min-h-full">
            <nav className="dark:bg-gray-800 bg-zinc-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link
                                to={'/'}
                                className="flex-shrink-0 font-semibold sm:text-lg text-sm dark:text-white">
                                doCreator
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.menuItem} ${styles.current}`
                                                : `${styles.menuItem}`
                                        }
                                        aria-current="page"
                                        end>
                                        Dashboard
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/users"
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.menuItem} ${styles.current}`
                                                : `${styles.menuItem}`
                                        }>
                                        Lista de utilizatori
                                    </NavLink>
                                    <NavLink
                                        to="/dashboard/documents"
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${styles.menuItem} ${styles.current}`
                                                : `${styles.menuItem}`
                                        }>
                                        Lista de documente
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <Link className="button-primary mr-3" to="/documents">
                                    <span className="text-sm font-medium"> Creează document </span>
                                    <DocumentPlusIcon className="w-5 h-5"></DocumentPlusIcon>
                                </Link>
                                <button type="button" className="p-1">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="w-6 h-6 text-gray-400 hover:text-gray-900 transition-colors dark:hover:text-white"></BellIcon>
                                </button>

                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            onClick={handleDropdown}
                                            aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-9 w-9 rounded-full"
                                                src={user.profilePicture}
                                                alt=""
                                            />
                                        </button>
                                    </div>

                                    {userDropdown && (
                                        <div
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu-button"
                                            tabIndex="-1">
                                            <a
                                                href="/"
                                                className={styles.userDropdownItem}
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-0">
                                                Your Profile
                                            </a>

                                            <Link
                                                to="/register"
                                                className={styles.userDropdownItem}
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-1">
                                                Adaugă Utilizator
                                            </Link>
                                            <Link
                                                to="/dashboard/new-document"
                                                className={styles.userDropdownItem}
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-1">
                                                Adaugă Document
                                            </Link>

                                            <button
                                                className={`${styles.userDropdownItem} ${styles.logout}`}
                                                onClick={logout}
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-2">
                                                Ieși din cont
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                type="button"
                                className={styles.burger}
                                aria-expanded="false"
                                onClick={handleBurger}>
                                <span className="sr-only">Open main menu</span>
                                {burger ? (
                                    <XMarkIcon className="block h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {burger && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            <a
                                href="/"
                                className={`${styles.menuItemMobile} ${styles.current}`}
                                aria-current="page">
                                Dashboard
                            </a>

                            <a href="/" className={`${styles.menuItemMobile}`}>
                                Team
                            </a>

                            <a href="/" className={`${styles.menuItemMobile}`}>
                                Projects
                            </a>

                            <a href="/" className={`${styles.menuItemMobile}`}>
                                Calendar
                            </a>

                            <a href="/" className={`${styles.menuItemMobile}`}>
                                Reports
                            </a>
                        </div>
                        <div className="border-t border-gray-700 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={user.profilePicture}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-gray-800 mb-1 dark:text-gray-300">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium leading-none text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                                <button type="button" className="ml-auto p-1">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="w-6 h-6 text-gray-400 hover:text-gray-900 transition-colors dark:hover:text-white"></BellIcon>
                                </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                <a href="/" className={`${styles.menuItemMobile}`}>
                                    Your Profile
                                </a>

                                <a href="/" className={`${styles.menuItemMobile}`}>
                                    Settings
                                </a>

                                <button
                                    onClick={logout}
                                    className={`${styles.menuItemMobile} ${styles.logout}`}>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <header className="bg-white shadow dark:bg-gray-700">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {pageTitle ? pageTitle : 'Dashboard'}
                    </h1>
                </div>
            </header>

            <main className="pt-10 dark:bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl">{children}</div>
            </main>
        </div>
    );
}

export default connect(null, { logOut })(Dashboard);
