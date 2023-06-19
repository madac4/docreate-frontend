import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
import Layout from '../../components/dashboard/Layout';
import { publicRequest } from '../../helpers/instance';
import { useSelector } from 'react-redux';
import Table from '../../components/dashboard/Table';
import { TrashIcon } from '@heroicons/react/24/outline';
import Confirmation from '../../components/modals/Confirmation';

function DocumentList() {
    const [confirmationMessage, setConfirmationMessage] = useState({ message: '', id: null });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [documents, setDocuments] = useState([]);
    // const [docsModal, setDocsModal] = useState(false);
    // const [editDoc, setEditDoc] = useState({});
    const { token } = useSelector((state) => state.auth);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
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
        getDocuments(token);
    }, [token]);

    const handleConfirmDeletion = async (id) => {
        setShowConfirmation(false);
        try {
            await publicRequest.delete(`/documents/delete/${id}`, {
                headers: { 'x-auth-token': `${token}` },
            });
            setTimeout(() => {
                setSearchResults((prev) => prev.filter((document) => document._id !== id));
            }, 300);
            // toast.success('Documentul a fost șters cu succes');
        } catch (error) {
            // toast.error('Documentul nu a putut fi șters');
        }
    };

    const handleCancelDeletion = () => {
        setShowConfirmation(false);
    };

    const handleDeleteDocument = (name, id) => {
        const confirmationMessage = `Documentul ${name} va fi șters definitiv`;
        setConfirmationMessage({ message: confirmationMessage, id: id });
        setShowConfirmation(true);
    };

    // const openEditModal = (document) => {
    //     setDocsModal(!docsModal);
    // setEditDoc(document);
    // };

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };
    return (
        <Layout>
            <Table
                data={documents}
                onSearchResults={handleSearchResults}
                actionButton={'Adaugă document'}>
                {!searchResults.length > 0 ? (
                    <tbody>
                        <tr>
                            <td className="text-center py-6 mb-2 mt-0 md:text-2xl text-xl font-medium leading-tight dark:text-white">
                                Nu a fost găsit nici un document
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
                                        <td className="px-4 py-3 flex items-center justify-end gap-3">
                                            {/* <button
                                                type="button"
                                                onClick={() => openEditModal(item)}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                <PencilSquareIcon className="w-4 h-4 mr-2" />
                                                Editează
                                            </button> */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteDocument(item.name, item._id)
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
        </Layout>
    );
}

export default DocumentList;
