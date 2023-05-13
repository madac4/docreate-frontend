import React from 'react';

import styles from '../styles/forms.module.scss';

function Input({ children, value, onChange, type, placeholder, name, label, classNames }) {
    return (
        <div className="relative">
            {label && (
                <label htmlFor="email" className={styles.label}>
                    {label}
                </label>
            )}
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                className={`${styles.input} ${classNames}`}
                placeholder={placeholder}
                required
            />

            {children}
        </div>
    );
}

export default Input;
