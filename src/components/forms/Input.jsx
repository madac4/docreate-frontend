import React from 'react';

import styles from '../styles/forms.module.scss';

function Input({
    children,
    value,
    onChange,
    type,
    placeholder,
    name,
    label,
    classNames,
    required,
    disabled,
}) {
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
                disabled={disabled}
                required={required}
                className={`${styles.input} ${classNames} ${disabled && 'opacity-50'}`}
                placeholder={placeholder}
            />

            {children}
        </div>
    );
}

export default Input;
