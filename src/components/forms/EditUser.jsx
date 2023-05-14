import React from 'react';
import Input from './Input';
import PasswordInput from './PasswordInput';
import ButtonLoader from '../buttons/ButtonLoader';
import { publicRequest } from '../../helpers/instance';
import { toast } from 'react-toastify';

function EditUser({ user, token, closeModal }) {
    const [updatedUser, setUpdatedUser] = React.useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = React.useState(false);

    const updateUser = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (updatedUser.email || updatedUser.name || updatedUser.password) {
            try {
                const { data } = await publicRequest.put(`/users/update/${user._id}`, updatedUser, {
                    headers: { 'x-auth-token': `${token}` },
                });
                user = data;
                toast.success('Utilizatorul a fost modificat cu succes');
                setLoading(false);
                closeModal();
                setUpdatedUser({ name: '', email: '', password: '' });
            } catch (error) {
                console.log(error);
                toast.error('Utilizatorul nu a putut fi modificat');
                setLoading(false);
            }
        } else {
            toast.error('Câmpurile sunt goale');
            setLoading(false);
        }
    };

    return (
        <form action="#" onSubmit={updateUser}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <Input
                        label={'Numele, Prenumele'}
                        placeholder={'Numele, Prenumele'}
                        type="text"
                        value={updatedUser.name}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <Input
                        label={'Email'}
                        placeholder={'Email'}
                        type="email"
                        value={updatedUser.email}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    />
                </div>
                <div className="col-span-6">
                    <PasswordInput
                        label={'Parola Nouă'}
                        value={updatedUser.password}
                        onChange={(e) =>
                            setUpdatedUser({ ...updatedUser, password: e.target.value })
                        }
                    />
                </div>
            </div>
            <ButtonLoader isLoading={loading} classNames={'w-full py-3 mt-6'}>
                Salvează
            </ButtonLoader>
        </form>
    );
}

export default EditUser;
