import React from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import styles from '../styles/buttons.module.scss';

function Document({ doc }) {
    return (
        <Link to={`/document/${doc.slug}`} className={`${styles.buttonDocument} dark:text-white`}>
            <span>{doc.name}</span>
            <DocumentIcon className="w-6 h-6"></DocumentIcon>
        </Link>
    );
}

export default Document;
