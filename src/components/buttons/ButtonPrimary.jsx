import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import styles from '../styles/buttons.module.scss';

export function ButtonPrimary({ children, classNames, type }) {
    return (
        <button
            type={type ? type : 'button'}
            className={
                classNames ? `${classNames} ${styles.buttonPrimary}` : `${styles.buttonPrimary}`
            }>
            {children}
        </button>
    );
}
export function PrimaryLink({ children, classNames, href, download }) {
    return (
        <a
            href={href}
            download={download}
            className={
                classNames ? `${classNames} ${styles.buttonPrimary}` : `${styles.buttonPrimary}`
            }>
            <ArrowDownTrayIcon className="h-6 w-6" />
            {children}
        </a>
    );
}
