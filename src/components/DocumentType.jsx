import React from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function DocumentType({ title, slug }) {
    return (
        <Link
            to={`/documents/${slug}`}
            className="flex cursor-pointer text-gray-700 dark:text-gray-200 dark:border-gray-800 dark:hover:border-gray-700  items-center justify-between rounded-md border border-gray-200 p-4 text-sm font-medium shadow-sm hover:border-blue-500  hover:ring-1 hover:ring-blue-500 transition-all duration-300">
            {title}
            <DocumentIcon className="w-6 h-6"></DocumentIcon>
        </Link>
    );
}

export default DocumentType;
