import React from 'react';
import PasswordInput from './PasswordInput';
import Input from './Input';
import ButtonLoader from '../buttons/ButtonLoader';

function LoginForm({ handleSubmit, auth, loading, forgetPassword, setAuth }) {
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
                value={auth.email}
                onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                placeholder="name@company.com"
                type="email"
                label="Email"
                required
            />

            <PasswordInput
                value={auth.password}
                label={'Parola'}
                required
                onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            />
            <button
                type="button"
                onClick={forgetPassword}
                className="text-sm text-blue-700 hover:underline dark:text-blue-500 flex justify-end w-full">
                Lost Password?
            </button>
            <ButtonLoader isLoading={loading} classNames="w-full">
                Intră în profil
            </ButtonLoader>
        </form>
    );
}

export default LoginForm;
