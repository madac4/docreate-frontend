import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { publicRequest } from '../../helpers/instance';
import EditUserModal from '../../components/modals/EditUserModal';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Table from '../../components/dashboard/Table';
import Confirmation from '../../components/modals/Confirmation';
import Layout from '../../components/dashboard/Layout';

function UserList() {
    const [confirmationMessage, setConfirmationMessage] = useState({ message: '', id: null });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const [editModal, setEditModal] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
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

    const handleConfirmDeletion = (id) => {
        setShowConfirmation(false);
        try {
            publicRequest.delete(`/users/delete/${id}`, {
                headers: { 'x-auth-token': `${token}` },
            });
            toast.success('Utilizatorul a fost șters cu succes');
            setTimeout(() => {
                setSearchResults(users.filter((user) => user._id !== id));
            }, 300);
        } catch (error) {
            toast.error('Utilizatorul nu a putut fi șters');
        }
    };
    const openEditModal = (user) => {
        setEditModal(!editModal);
        setEditUser(user);
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleCancelDeletion = () => {
        setShowConfirmation(false);
    };

    const handleDeleteUser = (name, id) => {
        const confirmationMessage = `Utilizatorul ${name} va fi șters definitiv`;
        setConfirmationMessage({ message: confirmationMessage, id: id });
        setShowConfirmation(true);
    };

    return (
        <Layout>
            <Table
                data={users}
                onSearchResults={handleSearchResults}
                actionButton={'Invită utilizator'}>
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
                                                onClick={() => openEditModal(item)}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <PencilSquareIcon className="w-4 h-4 mr-2" />
                                                Editează
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteUser(item.name, item._id)
                                                }
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
            {showConfirmation && (
                <Confirmation
                    message={confirmationMessage}
                    onConfirm={handleConfirmDeletion}
                    onCancel={handleCancelDeletion}
                />
            )}
            <EditUserModal
                isOpen={editModal}
                setIsOpen={setEditModal}
                user={editUser}
                token={token}
                clearUser={setEditUser}></EditUserModal>
        </Layout>
    );
}

export default UserList;
