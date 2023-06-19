import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { getDocumentList } from '../helpers/instance';

import Layout from '../components/Layout';
import { Loader } from '../components/buttons/Loader';
import Input from '../components/forms/Input';
import { searchDocument } from '../utils/search';
import { renderDocumentItem } from '../utils/render';

function Documents() {
    const [searchTerm, setSearchTerm] = useState('');
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);

    const { token } = useSelector((state) => state.auth);

    const [timer, setTimer] = useState(null);

    useEffect(() => {
        getDocumentList(token)
            .then((data) => setDocuments(data))
            .catch((error) => console.log(error));
    }, [token]);

    const handleSearch = (e) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            const searchTerm = e.target.value;
            setSearchTerm(searchTerm);
            const filtered = searchDocument(documents, searchTerm);
            setFilteredDocuments(filtered);
        }, 200);

        setTimer(newTimer);
    };

    return (
        <Layout>
            <div className="container">
                {searchTerm && filteredDocuments.length === 0 ? (
                    <h3 className="text-center py-8">Nu a fost găsit nici un document</h3>
                ) : (
                    <h3 className="text-center py-8">
                        Alege un document din lista de mai jos pentru a-l completa
                    </h3>
                )}

                <Input onChange={handleSearch} placeholder="Caută document">
                    <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center dark:text-white text-gray-900">
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </span>
                </Input>
                {searchTerm && renderDocumentItem(filteredDocuments)}

                {!searchTerm && documents && documents.length > 0 && renderDocumentItem(documents)}

                {documents.length === 0 && <Loader size={24} />}
            </div>
        </Layout>
    );
}

export default Documents;
