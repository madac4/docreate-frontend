import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { getDocumentList } from '../helpers/instance';

import Document from '../components/buttons/Document';
import Layout from '../components/Layout';
import { Loader } from '../components/buttons/Loader';
import Input from '../components/forms/Input';

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
        getDocumentList(token)
            .then((data) => setDocuments(data))
            .catch((error) => console.log(error));
    }, [token]);

    return (
        <Layout>
            <div className="container">
                {searchValue &&
                documents.filter((item) =>
                    item.name.toUpperCase().includes(searchValue.toUpperCase()),
                ).length <= 0 ? (
                    <h3 className="text-center py-8">Nu a fost găsit nici un document</h3>
                ) : (
                    <h3 className="text-center py-8">
                        Alege un document din lista de mai jos pentru a-l completa
                    </h3>
                )}

                <Input onChange={handleSearch} placeholder="Caută">
                    <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center dark:text-white text-gray-900">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </span>
                </Input>

                {documents && documents.length > 0 ? (
                    <div className="documents-list pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 md:mt-12">
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
            </div>
        </Layout>
    );
}

export default Documents;
