import React from 'react';
import { Loading } from './Loader';

function ButtonLoader({ children, isLoading, classNames }) {
    return (
        <button
            className={
                classNames ? classNames : 'button-primary py-3 mt-3 w-full justify-center relative'
            }
            type="submit">
            {isLoading ? <Loading size={24} /> : children}
        </button>
    );
}

export default ButtonLoader;
