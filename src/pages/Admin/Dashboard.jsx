import React from 'react';
import {
    BellIcon,
    Bars3BottomLeftIcon,
    EyeIcon,
    ChartPieIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggle from '../../components/buttons/ThemeToggle';
import UserDropdown from '../../components/dashboard/UserDropdown';

export default function Dashboard({ children }) {
    const { user, isAuth } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [dropdown, setDropdown] = React.useState({
        notifications: false,
        burger: false,
    });

    React.useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button
                            onClick={() =>
                                setDropdown({
                                    notifications: false,
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
                                setDropdown({
                                    burger: false,
                                    notifications: !dropdown.notifications,
                                })
                            }
                            className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="w-6 h-6" />
                        </button>

                        <div
                            className={`${
                                dropdown.notifications ? 'block' : 'hidden'
                            } absolute top-full right-0 overflow-hidden z-50 my-4 w-[320px] md:w-[440px] text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl`}
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
                            <UserDropdown user={user}>
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
                            </UserDropdown>
                        )}
                    </div>
                </div>
            </nav>

            <aside
                className={`${
                    dropdown.burger ? 'translate-x-0' : '-translate-x-full'
                } fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidenav"
                id="drawer-navigation">
                <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li className="list-none">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group`
                                        : `flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                                }
                                end>
                                <ChartPieIcon className="w-6 h-6 text-gray-500 mr-3 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/dashboard/users"
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center p-2 text-base font-medium text-gray-900 mt-4 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group`
                                        : `flex items-center p-2 text-base font-medium text-gray-900 mt-4 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                                }>
                                <UsersIcon className="w-6 h-6 text-gray-500 mr-3 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                Utilizatori
                            </NavLink>
                            <NavLink
                                to="/dashboard/documents"
                                className={({ isActive }) =>
                                    isActive
                                        ? `flex items-center p-2 text-base font-medium text-gray-900 mt-4 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group`
                                        : `flex items-center p-2 text-base font-medium text-gray-900 mt-4 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`
                                }>
                                <ClipboardDocumentListIcon className="w-6 h-6 text-gray-500 mr-3 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                Lista de documente
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className="p-4 md:ml-64 h-auto pt-20">
                {children}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                </div> */}
            </main>
        </div>
    );
}
