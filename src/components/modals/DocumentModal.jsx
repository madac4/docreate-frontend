import React from 'react';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Dropzone from 'react-dropzone';
import { publicRequest } from '../../helpers/instance';
import { toast } from 'react-toastify';
import ButtonLoader from '../buttons/ButtonLoader';

function DocumentModal({ document, isOpen, setIsOpen, token }) {
    const [newDocument, setNewDocument] = React.useState({ name: '', file: '' });
    const [loading, setLoading] = React.useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };

    const updateDocument = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', newDocument.file);
        formData.append('name', newDocument.name);

        if (newDocument.file || newDocument.name) {
            try {
                const { data } = await publicRequest.put(
                    `/documents/update/${document._id}`,
                    formData,
                    {
                        headers: { 'x-auth-token': `${token}` },
                    },
                );
                document = data;
                if (newDocument.file && !newDocument.name) {
                    toast.success('Fișierul a fost modificat cu succes');
                } else if (newDocument.name && !newDocument.file) {
                    toast.success('Numele a fost modificat cu succes');
                } else {
                    toast.success('Datele au fost modificate cu succes');
                }
                setLoading(false);
                setIsOpen(false);
                setNewDocument({ name: '', file: '' });
            } catch (error) {
                console.log(error);
                toast.error('Documentul nu a putut fi modificat');
                setLoading(false);
            }
        } else {
            toast.error('Câmpurile sunt goale');
            setLoading(false);
        }
    };

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={isOpen ? 'modal open' : 'modal'}>
            <div className="w-full h-full max-w-md md:h-auto modal-body">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pt-4">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal">
                        <XMarkIcon onClick={closeModal} className="w-6 h-6"></XMarkIcon>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            Modifică documentul "{document.name}"
                        </h3>
                        <form className="space-y-6" onSubmit={updateDocument}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Numele
                                    <input
                                        type="text"
                                        name="name"
                                        value={newDocument.name}
                                        onChange={(e) =>
                                            setNewDocument({ ...newDocument, name: e.target.value })
                                        }
                                        id="name"
                                        className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Titlul Documentului"
                                    />
                                </label>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Fișierul nou
                                    <Dropzone
                                        onDrop={(acceptedFiles) =>
                                            setNewDocument({
                                                ...newDocument,
                                                file: acceptedFiles[0],
                                            })
                                        }>
                                        {({ getRootProps, getInputProps }) => (
                                            <div
                                                className="flex items-start flex-col justify-center w-full mt-1"
                                                {...getRootProps()}>
                                                <label
                                                    htmlFor="dropzone-file"
                                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <ArrowUpTrayIcon className="w-10 mb-3 h-10 text-gray-400 dark:hover:text-white" />
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">
                                                                Click to upload
                                                            </span>{' '}
                                                            or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            DOCX or PDF (MAX. 16MB)
                                                        </p>
                                                    </div>
                                                    <input
                                                        id="dropzone-file"
                                                        type="file"
                                                        className="hidden"
                                                        name="file"
                                                        {...getInputProps()}
                                                    />
                                                </label>
                                                <h4 className="text-gray-800 dark:text-white font-semibold mt-2">
                                                    {newDocument.file && newDocument.file.name}
                                                </h4>
                                            </div>
                                        )}
                                    </Dropzone>
                                </label>
                            </div>
                            <ButtonLoader isLoading={loading}>Modifică documentul</ButtonLoader>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentModal;
