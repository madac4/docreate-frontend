import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

import Input from '../forms/Input';
import InviteModal from '../modals/InviteModal';
import AddDocumentModal from '../modals/AddDocumentModal';

function Table({ children, data, onSearchResults, actionButton }) {
    const [openInvitation, setOpenInvitation] = useState(false);
    const { pathname } = useLocation();
    const currentPath = `/${pathname.split('/').pop()}`;
    useEffect(() => {
        onSearchResults(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;

        const results = data.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        onSearchResults(results);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <Input onChange={handleSearch} classNames="py-2" placeholder="Caută">
                            <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-content-center dark:text-white text-gray-900">
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </span>
                        </Input>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => setOpenInvitation(true)}
                            className="flex items-center justify-center gap-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <PlusSmallIcon className="w-6 h-6" />
                            {actionButton}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[800px] text-gray-500 dark:text-gray-400">
                        {children}
                    </table>
                </div>

                {currentPath === '/users' ? (
                    <InviteModal isOpen={openInvitation} setIsOpen={setOpenInvitation} />
                ) : (
                    <AddDocumentModal isOpen={openInvitation} setIsOpen={setOpenInvitation} />
                )}
            </div>
        </section>
    );
}

export default Table;
