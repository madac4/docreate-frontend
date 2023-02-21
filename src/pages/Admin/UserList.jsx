import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dashboard from './Dashboard';
import styles from './style.module.scss';
import { publicRequest } from '../../helpers/instance';

function UserList() {
    const [users, setUsers] = React.useState([]);
    const { token } = useSelector((state) => state.auth);
    React.useEffect(() => {
        const getUsers = async (token) => {
            if (token) {
                try {
                    const res = await publicRequest.get('/users/getUsers', {
                        headers: { 'x-auth-token': `${token}` },
                    });
                    setUsers(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getUsers(token);
    }, [token]);

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
                        setUsers(deletedUsers);
                    }, 300);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    return (
        <Dashboard pageTitle="Lista de utilizatori">
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-500">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500 dark:bg-gray-800 text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-600">
                        <tr>
                            <th className={styles.tableRow}>
                                <div className="flex items-center gap-2">ID</div>
                            </th>
                            <th className={styles.tableRow}>
                                <div className="flex items-center gap-2">Name</div>
                            </th>
                            <th className={styles.tableRow}>
                                <div className="flex items-center gap-2">Email</div>
                            </th>
                            <th className={styles.tableRow}>
                                <div className="flex items-center gap-2">Role</div>
                            </th>
                            <th className={styles.tableRow}>Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                        {users &&
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className={styles.tableId}>{++index}</td>
                                    <td className={styles.tableText}>{user.name}</td>
                                    <td className={styles.tableText}>{user.email}</td>
                                    <td className={styles.tableText}>{user.role}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <button
                                            onClick={() => deleteUser(user._id, user.name)}
                                            className="rounded bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-700 hover:text-white transition-all">
                                            Delete user
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}

export default UserList;
