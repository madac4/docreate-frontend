import React from 'react';

import styles from '../styles/buttons.module.scss';
function ButtonIcon({ children, clickEvent, classNames, type, checked }) {
    return (
        <button
            type={type ? type : 'button'}
            onClick={clickEvent}
            className={`${classNames} ${styles.buttonIcon} ${
                checked
                    ? 'bg-green-500 dark:bg-green-500'
                    : 'bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700'
            } `}>
            {children}
        </button>
    );
}

export default ButtonIcon;
