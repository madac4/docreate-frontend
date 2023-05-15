import React from 'react';
import styles from '../styles/forms.module.scss';

function Select({ label, value, onChange, name, children, classNames, placeholder, required }) {
    return (
        <div className="relative">
            {label && (
                <label htmlFor="email" className={styles.label}>
                    {label}
                </label>
            )}
            <select
                id="countries"
                name={name}
                value={value}
                required={required}
                className={`${styles.input} ${classNames}`}
                onChange={onChange}>
                <option defaultValue hidden>
                    {placeholder}
                </option>
                <option value="text">text</option>
                <option value="date">date</option>
                <option value="email">email</option>
                <option value="number">number</option>
                <option value="tel">tel</option>
            </select>

            {children}
        </div>
    );
}

export default Select;
