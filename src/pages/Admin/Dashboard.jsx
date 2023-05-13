import React from 'react';
import {
    BellIcon,
    DocumentDuplicateIcon,
    Bars3BottomLeftIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import { useSelector, connect } from 'react-redux';
import { logOut } from '../../redux/api';
import ThemeToggle from '../../components/buttons/ThemeToggle';

function Dashboard({ children, logOut }) {
    const [dropdown, setDropdown] = React.useState({
        user: false,
        notifications: false,
        burger: false,
    });
    // const [isAdmin, setIsAdmin] = React.useState(false);
    const { user, isAuth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // React.useEffect(() => {
    //     user && user.role.toLowerCase() === 'admin' ? setIsAdmin(true) : setIsAdmin(false);
    // }, [user]);

    React.useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const logout = () => {
        logOut();
        navigate('/');
    };
    return (
        // <div className="min-h-full">
        //     <nav className="dark:bg-gray-800 bg-zinc-100">
        //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        //             <div className="flex h-16 items-center justify-between">
        //                 <div className="flex items-center">
        //                     <Link
        //                         to={'/'}
        //                         className="flex-shrink-0 font-semibold sm:text-lg text-sm dark:text-white">
        //                         doCreator
        //                     </Link>
        //                     <div className="hidden md:block">
        //                         <div className="ml-10 flex items-baseline space-x-4">
        //                             <NavLink
        //                                 to="/dashboard"
        //                                 className={({ isActive }) =>
        //                                     isActive
        //                                         ? `${styles.menuItem} ${styles.current}`
        //                                         : `${styles.menuItem}`
        //                                 }
        //                                 aria-current="page"
        //                                 end>
        //                                 Dashboard
        //                             </NavLink>

        //                             <NavLink
        //                                 to="/dashboard/users"
        //                                 className={({ isActive }) =>
        //                                     isActive
        //                                         ? `${styles.menuItem} ${styles.current}`
        //                                         : `${styles.menuItem}`
        //                                 }>
        //                                 Lista de utilizatori
        //                             </NavLink>
        //                             <NavLink
        //                                 to="/dashboard/documents"
        //                                 className={({ isActive }) =>
        //                                     isActive
        //                                         ? `${styles.menuItem} ${styles.current}`
        //                                         : `${styles.menuItem}`
        //                                 }>
        //                                 Lista de documente
        //                             </NavLink>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="hidden md:block">
        //                     <div className="ml-4 flex items-center md:ml-6">
        //                         <Link className="button-primary mr-3" to="/documents">
        //                             <span className="text-sm font-medium"> Creează document </span>
        //                             <DocumentPlusIcon className="w-5 h-5"></DocumentPlusIcon>
        //                         </Link>
        //                         <button type="button" className="p-1">
        //                             <span className="sr-only">View notifications</span>
        //                             <BellIcon className="w-6 h-6 text-gray-400 hover:text-gray-900 transition-colors dark:hover:text-white"></BellIcon>
        //                         </button>

        //                         <div className="relative ml-3">
        //                             <div>
        //                                 <button
        //                                     type="button"
        //                                     className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        //                                     id="user-menu-button"
        //                                     aria-expanded="false"
        //                                     onClick={handleDropdown}
        //                                     aria-haspopup="true">
        //                                     <span className="sr-only">Open user menu</span>
        //                                     <img
        //                                         className="h-9 w-9 rounded-full"
        //                                         src={user.profilePicture}
        //                                         alt=""
        //                                     />
        //                                 </button>
        //                             </div>

        //                             {userDropdown && (
        //                                 <div
        //                                     className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        //                                     role="menu"
        //                                     aria-orientation="vertical"
        //                                     aria-labelledby="user-menu-button"
        //                                     tabIndex="-1">
        //                                     <a
        //                                         href="/"
        //                                         className={styles.userDropdownItem}
        //                                         role="menuitem"
        //                                         tabIndex="-1"
        //                                         id="user-menu-item-0">
        //                                         Your Profile
        //                                     </a>

        //                                     <Link
        //                                         to="/invite"
        //                                         className={styles.userDropdownItem}
        //                                         role="menuitem"
        //                                         tabIndex="-1"
        //                                         id="user-menu-item-1">
        //                                         Invită Persoană
        //                                     </Link>
        //                                     <Link
        //                                         to="/dashboard/new-document"
        //                                         className={styles.userDropdownItem}
        //                                         role="menuitem"
        //                                         tabIndex="-1"
        //                                         id="user-menu-item-1">
        //                                         Adaugă Document
        //                                     </Link>
        //                                     <button
        //                                         className={`${styles.userDropdownItem} ${styles.logout}`}
        //                                         onClick={logout}
        //                                         role="menuitem"
        //                                         tabIndex="-1"
        //                                         id="user-menu-item-2">
        //                                         Ieși din cont
        //                                     </button>
        //                                 </div>
        //                             )}
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="-mr-2 flex md:hidden">
        //                     <button
        //                         type="button"
        //                         className={styles.burger}
        //                         aria-expanded="false"
        //                         onClick={handleBurger}>
        //                         <span className="sr-only">Open main menu</span>
        //                         {burger ? (
        //                             <XMarkIcon className="block h-6 w-6" />
        //                         ) : (
        //                             <Bars3Icon className="block h-6 w-6" />
        //                         )}
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //         {burger && (
        //             <div className="md:hidden" id="mobile-menu">
        //                 <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        //                     <NavLink
        //                         to="/dashboard"
        //                         className={({ isActive }) =>
        //                             isActive
        //                                 ? `${styles.menuItemMobile} ${styles.current}`
        //                                 : `${styles.menuItemMobile}`
        //                         }
        //                         end
        //                         aria-current="page">
        //                         Dashboard
        //                     </NavLink>

        //                     <NavLink
        //                         to="/dashboard/users"
        //                         className={({ isActive }) =>
        //                             isActive
        //                                 ? `${styles.menuItemMobile} ${styles.current}`
        //                                 : `${styles.menuItemMobile}`
        //                         }>
        //                         Lista de utilizatori
        //                     </NavLink>
        //                     <NavLink
        //                         to="/dashboard/documents"
        //                         className={({ isActive }) =>
        //                             isActive
        //                                 ? `${styles.menuItemMobile} ${styles.current}`
        //                                 : `${styles.menuItemMobile}`
        //                         }>
        //                         Lista de documente
        //                     </NavLink>
        //                 </div>
        //                 <div className="border-t border-gray-700 pt-4 pb-3">
        //                     <div className="flex items-center px-5">
        //                         <div className="flex-shrink-0">
        //                             <img
        //                                 className="h-10 w-10 rounded-full"
        //                                 src={user.profilePicture}
        //                                 alt=""
        //                             />
        //                         </div>
        //                         <div className="ml-3">
        //                             <div className="text-base font-medium leading-none text-gray-800 mb-1 dark:text-gray-300">
        //                                 {user.name}
        //                             </div>
        //                             <div className="text-sm font-medium leading-none text-gray-500">
        //                                 {user.email}
        //                             </div>
        //                         </div>
        //                         <button type="button" className="ml-auto p-1">
        //                             <span className="sr-only">View notifications</span>
        //                             <BellIcon className="w-6 h-6 text-gray-400 hover:text-gray-900 transition-colors dark:hover:text-white"></BellIcon>
        //                         </button>
        //                     </div>
        //                     <div className="mt-3 space-y-1 px-2">
        //                         <a href="/" className={`${styles.menuItemMobile}`}>
        //                             Your Profile
        //                         </a>

        //                         <Link to="/register" className={styles.menuItemMobile}>
        //                             Adaugă Utilizator
        //                         </Link>

        //                         <Link to="/invite" className={styles.menuItemMobile}>
        //                             Invită Coleg
        //                         </Link>

        //                         <Link
        //                             to="/dashboard/new-document"
        //                             className={styles.menuItemMobile}>
        //                             Adaugă Document
        //                         </Link>

        //                         <button
        //                             onClick={logout}
        //                             className={`${styles.menuItemMobile} ${styles.logout}`}>
        //                             Sign out
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         )}
        //     </nav>

        //     <header className="bg-white shadow dark:bg-gray-700">
        //         <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        //             <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        //                 {pageTitle ? pageTitle : 'Dashboard'}
        //             </h1>
        //         </div>
        //     </header>

        //     <main className="pt-10 dark:bg-gray-900 min-h-screen">
        //         <div className="mx-auto max-w-7xl px-4">{children}</div>
        //     </main>
        // </div>

        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button
                            onClick={() =>
                                setDropdown({
                                    notifications: false,
                                    user: false,
                                    burger: !dropdown.burger,
                                })
                            }
                            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <Bars3BottomLeftIcon className="w-6 h-6" />
                            <span className="sr-only">Toggle sidebar</span>
                        </button>

                        <Link to="/" className="flex items-center mr-2">
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                doCreator
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center lg:order-2 relative">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() =>
                                setDropdown({ user: false, notifications: !dropdown.notifications })
                            }
                            className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="w-6 h-6" />
                        </button>

                        <div
                            className={`${
                                dropdown.notifications ? 'block' : 'hidden'
                            } absolute top-full right-0 overflow-hidden z-50 my-4 w-[360px] text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl`}
                            id="notification-dropdown">
                            <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                                Notificări
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                            alt="Bonnie Green avatar"
                                        />
                                    </div>
                                    <div className="pl-3 w-full">
                                        <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                Bonnie Green{' '}
                                            </span>
                                            a completat documentul:{' '}
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                Cerere de angajare
                                            </span>
                                        </div>
                                        <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                                            a few moments ago
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <Link
                                to="#"
                                className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline">
                                <div className="inline-flex items-center">
                                    <EyeIcon className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    Vezi toate
                                </div>
                            </Link>
                        </div>

                        {user && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDropdown({ notifications: false, user: !dropdown.user })
                                    }
                                    className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={user.profilePicture}
                                        alt={user.name}
                                    />
                                </button>

                                <div
                                    className={`${
                                        dropdown.user ? 'block' : 'hidden'
                                    } absolute top-full right-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}>
                                    <div className="py-3 px-4">
                                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                            {user.name}
                                        </span>
                                        <span className="block text-sm text-gray-900 truncate dark:text-white">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ul
                                        className="py-1 text-gray-700 dark:text-gray-300"
                                        aria-labelledby="dropdown">
                                        <li>
                                            <Link
                                                to="#"
                                                className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                                                Profilul meu
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="text-gray-700 py-1 dark:text-gray-300">
                                        <li>
                                            <button
                                                className={`${styles.userDropdownItem} ${styles.logout} rounded-b-xl`}
                                                onClick={logout}
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-2">
                                                Ieși din cont
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <aside
                className={`${
                    dropdown.burger ? 'translate-x-0' : '-translate-x-full'
                } fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidenav"
                id="drawer-navigation">
                <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li className="list-none">
                            <NavLink
                                to="/dashboard/documents"
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group`
                                        : `flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                                }>
                                <DocumentDuplicateIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ml-3">Lista de documente</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className="p-4 md:ml-64 h-auto pt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                </div>
                <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
                </div>
            </main>
        </div>
    );
}

export default connect(null, { logOut })(Dashboard);
