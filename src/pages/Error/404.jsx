import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../components/styles//buttons.module.scss';

function Error404() {
    return (
        <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
            <div className="block md:max-w-lg">
                <img
                    src="https://flowbite-admin-dashboard.vercel.app/images/illustrations/404.svg"
                    alt="404"
                />
            </div>
            <div className="text-center xl:max-w-4xl">
                <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    Uh-oh!
                </h1>
                <p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
                    Din păcate ceastă pagină nu a fost găsită.
                </p>
                <Link to="/" className={`${styles.buttonPrimary} mt-4`}>
                    Înapoi acasă
                </Link>
            </div>
        </div>
    );
}

export default Error404;
