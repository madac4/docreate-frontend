import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dashboard from './Dashboard';
import { publicRequest } from '../../helpers/instance';
import UserModal from '../../components/modals/UserModal';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Table from '../../components/dashboard/Table';

function Users() {
    const [searchResults, setSearchResults] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [editUser, setEditUser] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);
    const { token } = useSelector((state) => state.auth);

    React.useEffect(() => {
        const getUsers = async (token) => {
            if (token) {
                try {
                    const { data } = await publicRequest.get('/users/get', {
                        headers: { 'x-auth-token': `${token}` },
                    });
                    setUsers(data.reverse());
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getUsers(token);
    }, [token, editModal]);

    const deleteUser = (id, name) => {
        if (token) {
            if (window.confirm(`Utilizatorul ${name} va fi șters definitiv`)) {
                try {
                    publicRequest.delete(`/users/delete/${id}`, {
                        headers: { 'x-auth-token': `${token}` },
                    });
                    toast.success('Utilizatorul a fost șters cu succes');
                    setTimeout(() => {
                        const deletedUsers = users.filter((user) => user._id !== id);
                        setSearchResults(deletedUsers);
                    }, 300);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const openUserModal = (user) => {
        setEditModal(!editModal);
        setEditUser(user);
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <Dashboard>
            <Table data={users} onSearchResults={handleSearchResults}>
                {!searchResults.length > 0 ? (
                    <tbody>
                        <tr>
                            <td className="text-center py-6 mb-2 mt-0 md:text-2xl text-xl font-medium leading-tight dark:text-white">
                                Nu a fost găsit nici un utilizator
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    Nr
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Numele
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Rolul
                                </th>
                                <th scope="col" className="px-4 py-3 flex items-center justify-end">
                                    Acțiuni
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults &&
                                searchResults.map((item, index) => (
                                    <tr className="border-b dark:border-gray-700" key={item._id}>
                                        <th
                                            scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {++index}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-4 py-3">{item.email}</td>
                                        <td className="px-4 py-3">{item.role}</td>
                                        <td className="px-4 py-3 flex items-center justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={() => openUserModal(item)}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <PencilSquareIcon className="w-4 h-4 mr-2" />
                                                Editează
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteUser(item._id, item.name)}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                                <TrashIcon className="w-4 h-4 mr-2" />
                                                Șterge
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </>
                )}
            </Table>
            <UserModal
                isOpen={editModal}
                setIsOpen={setEditModal}
                user={editUser}
                token={token}
                clearUser={setEditUser}></UserModal>
        </Dashboard>
    );
}

export default Users;
