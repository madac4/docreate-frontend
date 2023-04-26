import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { publicRequest } from '../helpers/instance';

import Document from '../components/Document';
import Layout from '../components/Layout';
import { Loader } from '../components/Loader';

function Documents() {
    const [searchValue, setSearchValue] = React.useState('');
    const [documents, setDocuments] = React.useState([]);
    const { token } = useSelector((state) => state.auth);

    const [timer, setTimer] = React.useState(null);

    const handleSearch = (e) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setSearchValue(e.target.value);
        }, 200);

        setTimer(newTimer);
    };

    React.useEffect(() => {
        const getDocumentList = async (token) => {
            if (token) {
                try {
                    const { data } = await publicRequest.get('/documents', {
                        headers: { 'x-auth-token': `${token}` },
                    });
                    setDocuments(data.reverse());
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            } else {
                toast.error('Nu sunteți logat');
            }
        };
        getDocumentList(token);
    }, [token]);

    console.log(documents);
    return (
        <Layout>
            <div className="container mx-auto pt-3 px-3 sm:px-0 h-screen pt-28">
                <div className="search relative">
                    <input
                        onChange={handleSearch}
                        type="search"
                        id="searchInput"
                        placeholder="Caută"
                        className="input-style"
                    />

                    <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center dark:text-white text-gray-900">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </span>
                </div>
                {documents && documents.length > 0 ? (
                    <div className="documents-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 md:mt-12">
                        {documents
                            ?.filter((item) =>
                                item.name.toUpperCase().includes(searchValue.toUpperCase()),
                            )
                            .map((doc) => (
                                <Document key={`${doc.name}_${doc._id}`} doc={doc} />
                            ))}
                    </div>
                ) : (
                    <Loader size={24} />
                )}
                {searchValue &&
                    documents.filter((item) =>
                        item.name.toUpperCase().includes(searchValue.toUpperCase()),
                    ).length <= 0 && (
                        <h1 className="dark:text-gray-300 mt-12 md:mt-8 text-gray-900 text-center md:text-4xl text-2xl font-bold">
                            Nu a fost găsit nici un document
                        </h1>
                    )}
            </div>
        </Layout>
    );
}

export default Documents;
