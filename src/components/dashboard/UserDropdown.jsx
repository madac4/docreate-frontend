import React from 'react';
import { logOut } from '../../redux/api';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserDropdown({ children, user, logOut, hidden }) {
    const [dropdown, setDropdown] = React.useState(false);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const logout = () => {
        logOut(token);
        navigate('/');
    };
    return (
        <div className="user relative">
            <button
                type="button"
                onClick={() => setDropdown(!dropdown)}
                className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-9 h-9 rounded-full object-cover"
                    src={user.profilePicture}
                    alt={user.name}
                />
            </button>
            <div
                className={`${
                    dropdown ? 'block' : 'hidden'
                } absolute top-full right-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}>
                <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                    </span>
                    <span className="block text-sm text-gray-900 truncate dark:text-white">
                        {user.email}
                    </span>
                </div>
                {children}
                <ul className="text-gray-700 py-1 dark:text-gray-300">
                    <li>
                        <button
                            className="block py-2 px-4 text-red-500 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 w-full"
                            onClick={logout}
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-2">
                            Ieși din cont
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default connect(null, { logOut })(UserDropdown);
