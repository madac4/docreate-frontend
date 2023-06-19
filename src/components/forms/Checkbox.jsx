import React from 'react';

function Checkbox({ onChange, checked }) {
    return (
        <div className="flex items-start cursor-pointer">
            <div className="flex items-center h-5">
                <input
                    type="checkbox"
                    id="remember"
                    checked={checked}
                    onChange={onChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Remember me
                </label>
            </div>
        </div>
    );
}

export default Checkbox;
