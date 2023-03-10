import React from 'react';
import { data } from '../data/docs';

import Header from '../components/Header';
import DocumentType from '../components/DocumentType';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function DocumentsList() {
    const [searchValue, setSearchValue] = React.useState('');
    const [timer, setTimer] = React.useState(null);

    const handleSearch = (e) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setSearchValue(e.target.value);
        }, 200);

        setTimer(newTimer);
    };
    return (
        <div>
            <Header></Header>
            <main>
                <div className="container mx-auto pt-3 px-3 sm:px-0">
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
                    {data.filter((item) =>
                        item.name.toUpperCase().includes(searchValue.toUpperCase()),
                    ).length > 0 ? (
                        <div className="documents-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 md:mt-12">
                            {data
                                ?.filter((item) =>
                                    item.name.toUpperCase().includes(searchValue.toUpperCase()),
                                )
                                .map((doc) => (
                                    <DocumentType key={doc.slug} title={doc.name} slug={doc.slug} />
                                ))}
                        </div>
                    ) : (
                        <h1 className="dark:text-gray-300 mt-12 md:mt-8 text-gray-900 text-center md:text-4xl text-2xl font-bold">
                            Nu a fost găsit așa tip de document
                        </h1>
                    )}
                </div>
            </main>
        </div>
    );
}

export default DocumentsList;
