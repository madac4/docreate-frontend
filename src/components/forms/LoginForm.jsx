import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import ButtonLoader from '../buttons/ButtonLoader';
import PasswordInput from './PasswordInput';
import { loginUser } from '../../redux/api';
import Input from './Input';
import Checkbox from './Checkbox';

function LoginForm({ setForgetModal, closeModal }) {
    const [loading, setLoading] = React.useState(false);
    const authData = useSelector((state) => state.auth);
    const [auth, setAuth] = React.useState({
        email: '',
        password: '',
        remember: false,
    });
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (authData.isAuth) {
            closeModal();
            setAuth({ email: '', password: '', remember: false });
        }
        setLoading(authData.loading);
    }, [authData, closeModal]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(authData.loading);
        dispatch(loginUser(auth));
    };

    const forgetPassword = () => {
        setForgetModal(true);
        closeModal();
        setAuth({ email: '', password: '', remember: false });
    };

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
            <div className="flex justify-between">
                <Checkbox
                    checked={auth.remember}
                    onChange={() => setAuth({ ...auth, remember: !auth.remember })}
                />
                <button
                    type="button"
                    onClick={forgetPassword}
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                    Lost Password?
                </button>
            </div>
            <ButtonLoader isLoading={loading} classNames="w-full">
                Intră în profil
            </ButtonLoader>
        </form>
    );
}

export default LoginForm;
