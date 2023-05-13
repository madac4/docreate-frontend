import React from 'react';
import { toast } from 'react-toastify';
import Dashboard from './Dashboard';
import styles from './style.module.scss';
import { publicRequest } from '../../helpers/instance';
import { useSelector } from 'react-redux';
import { Loader } from '../../components/buttons/Loader';
import DocumentModal from '../../components/modals/DocumentModal';

function DocsList() {
    const [documents, setDocuments] = React.useState([]);
    const [docsModal, setDocsModal] = React.useState(false);
    const [editDoc, setEditDoc] = React.useState({});
    const { token } = useSelector((state) => state.auth);

    const getDocuments = async (token) => {
        if (token) {
            try {
                const { data } = await publicRequest.get('/documents/', {
                    headers: { 'x-auth-token': `${token}` },
                });
                setDocuments(data.reverse());
            } catch (error) {
                console.log(error);
            }
        }
    };

    React.useEffect(() => {
        getDocuments(token);
    }, [token, docsModal]);

    const openDocsModal = (document) => {
        setDocsModal(!docsModal);
        setEditDoc(document);
    };

    const deleteDocument = async (id, name) => {
        if (window.confirm(`Documentul ${name} va fi șters definitiv`)) {
            try {
                const { data } = await publicRequest.delete(`/documents/delete/${id}`, {
                    headers: { 'x-auth-token': `${token}` },
                });
                if (data) {
                    setTimeout(() => {
                        const deletedDocument = documents.filter((document) => document._id !== id);
                        setDocuments(deletedDocument);
                    }, 300);
                    toast.success('Documentul a fost șters cu succes');
                } else {
                    toast.error('Documentul nu fost a șters');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Dashboard pageTitle="Lista de documente">
            {documents ? (
                documents.length > 0 && (
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-500">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-500 dark:bg-gray-800 text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-600 w-full">
                                <tr>
                                    <th className={styles.tableRow}>
                                        <div className="flex items-center gap-2">Nr</div>
                                    </th>
                                    <th className={styles.tableRow}>
                                        <div className="flex items-center gap-2">Document</div>
                                    </th>
                                    <th className={styles.tableRow}>Acțiuni</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                                {documents.map((document, index) => (
                                    <tr key={`${document.name}_${document._id}`}>
                                        <td className={styles.tableId}>{++index}</td>
                                        <td className={styles.tableText}>{document.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => openDocsModal(document)}
                                                className="rounded bg-blue-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-blue-700 hover:text-white transition-all">
                                                Editează
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteDocument(document._id, document.name)
                                                }
                                                className="rounded bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-700 hover:text-white transition-all">
                                                Șterge
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <DocumentModal
                            document={editDoc}
                            isOpen={docsModal}
                            setIsOpen={setDocsModal}
                            token={token}
                        />
                    </div>
                )
            ) : (
                <Loader />
            )}
            {documents.length === 0 && (
                <h1 className="dark:text-gray-300 mt-12 md:mt-8 text-gray-900 text-center md:text-4xl text-2xl font-bold">
                    Nu sunt documente de afișat
                </h1>
            )}
        </Dashboard>
    );
}

export default DocsList;
