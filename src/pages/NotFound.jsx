import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../components/styles/buttons.module.scss';

function NotFound() {
    return (
        <>
            <div className="grid h-screen px-4 bg-white place-content-center dark:bg-gray-900">
                <div className="text-center">
                    ``
                    <h1 className="font-black  dark:text-white text-gray-300 text-9xl">404</h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-300">
                        Uh-oh!
                    </p>
                    <p className="mt-4 text-gray-500">Această pagină nu există.</p>
                    <Link to="/" className={`${styles.buttonPrimary} mt-4`}>
                        Înapoi acasă
                    </Link>
                </div>
            </div>
        </>
    );
}

export default NotFound;
