import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import styles from '../styles/forms.module.scss';

function PasswordInput({ value, onChange, label, required, name }) {
    const [showPassword, setShowPassword] = useState(false);
    function handleTypeChange() {
        setShowPassword(!showPassword);
    }
    return (
        <div className="relative">
            {label && (
                <label htmlFor="password" className={styles.label}>
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    name={name ? name : 'password'}
                    required={required}
                    placeholder="••••••••"
                    className={styles.input}
                />
                <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center cursor-pointer"
                    onClick={handleTypeChange}>
                    {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-400 " />
                    ) : (
                        <EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                </span>
            </div>
        </div>
    );
}

export default PasswordInput;
