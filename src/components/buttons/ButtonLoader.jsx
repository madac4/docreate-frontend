import React from 'react';
import { Loading } from './Loader';
import styles from '../styles/buttons.module.scss';

function ButtonLoader({ children, isLoading, classNames, type }) {
    return (
        <button
            className={
                classNames ? `${classNames} ${styles.buttonPrimary}` : `${styles.buttonPrimary}`
            }>
            {isLoading ? <Loading size={24} /> : children}
        </button>
    );
}

export default ButtonLoader;
