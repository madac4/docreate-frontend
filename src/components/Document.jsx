import React from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function Document({ doc }) {
    return (
        <Link to={`/document/${doc.slug}`} className="document-link">
            <span>{doc.name}</span>
            <DocumentIcon className="w-6 h-6"></DocumentIcon>
        </Link>
    );
}

export default Document;
