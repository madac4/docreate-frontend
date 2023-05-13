import React from 'react';

import styles from '../styles/buttons.module.scss';
function ButtonIcon({ children, clickEvent }) {
    return (
        <button onClick={clickEvent} className={styles.buttonIcon}>
            {children}
        </button>
    );
}

export default ButtonIcon;
