import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dashboard from './Dashboard';
import styles from './style.module.scss';
import { publicRequest } from '../../helpers/instance';
import { Loader } from '../../components/buttons/Loader';
import UserModal from '../../components/modals/UserModal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Users() {
    const [searchValue, setSearchValue] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [editUser, setEditUser] = React.useState({});
    const [userModal, setUserModal] = React.useState(false);
    const [timer, setTimer] = React.useState(null);
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
    }, [token, userModal]);

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

    const openUserModal = (user) => {
        setUserModal(!userModal);
        setEditUser(user);
    };

    const handleSearch = (e) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setSearchValue(e.target.value);
        }, 200);

        setTimer(newTimer);
    };

    return (
        <Dashboard pageTitle="Lista de utilizatori">
            {searchValue &&
                users.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .length <= 0 && (
                    <h1 className="dark:text-gray-300 text-gray-900 mb-2 text-center text-2xl font-semibold">
                        Nu a fost găsit nici un utilizator
                    </h1>
                )}
            {users ? (
                <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-500">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500 dark:bg-gray-800 text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-600">
                            <tr>
                                <th className={styles.tableRow}>
                                    <div className="flex items-center gap-2">Nr</div>
                                </th>
                                <th className={styles.tableRow}>
                                    <div className="flex items-center gap-2">Numele</div>
                                </th>
                                <th className={styles.tableRow}>
                                    <div className="flex items-center gap-2">Email</div>
                                </th>
                                <th className={styles.tableRow}>
                                    <div className="flex items-center gap-2">Rolul</div>
                                </th>
                                <th className={styles.tableRow}>Acțiuni</th>
                                <th className="w-0 px-2">
                                    <div className="search relative w-52">
                                        <input
                                            type="search"
                                            id="searchInput"
                                            onChange={handleSearch}
                                            placeholder="Caută"
                                            className="input-style w-full"
                                        />
                                        <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center dark:text-white text-gray-900">
                                            <MagnifyingGlassIcon className="w-5 h-5" />
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                            {searchValue
                                ? users
                                      .filter((user) =>
                                          user.name
                                              .toLowerCase()
                                              .includes(searchValue.toLowerCase()),
                                      )
                                      .map((user, index) => (
                                          <tr key={user._id}>
                                              <td className={styles.tableId}>{++index}</td>
                                              <td className={styles.tableText}>{user.name}</td>
                                              <td className={styles.tableText}>{user.email}</td>
                                              <td className={styles.tableText}>{user.role}</td>
                                              <td className="whitespace-nowrap px-4 py-2 flex gap-2">
                                                  <button
                                                      onClick={() => openUserModal(user)}
                                                      className="rounded bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-blue-700 hover:text-white transition-all">
                                                      Editează
                                                  </button>
                                                  <button
                                                      onClick={() =>
                                                          deleteUser(user._id, user.name)
                                                      }
                                                      className="rounded bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-700 hover:text-white transition-all">
                                                      Șterge
                                                  </button>
                                              </td>
                                          </tr>
                                      ))
                                : users.map((user, index) => (
                                      <tr key={user._id}>
                                          <td className={styles.tableId}>{++index}</td>
                                          <td className={styles.tableText}>{user.name}</td>
                                          <td className={styles.tableText}>{user.email}</td>
                                          <td className={styles.tableText}>{user.role}</td>
                                          <td className="whitespace-nowrap px-4 py-2 flex gap-2">
                                              <button
                                                  onClick={() => openUserModal(user)}
                                                  className="rounded bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-blue-700 hover:text-white transition-all">
                                                  Editează
                                              </button>
                                              <button
                                                  onClick={() => deleteUser(user._id, user.name)}
                                                  className="rounded bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-700 hover:text-white transition-all">
                                                  Șterge
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>

                    <UserModal
                        isOpen={userModal}
                        setIsOpen={setUserModal}
                        user={editUser}
                        token={token}
                    />
                </div>
            ) : (
                <Loader />
            )}
        </Dashboard>
    );
}

export default Users;
