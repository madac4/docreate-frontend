import React from 'react';
import { publicRequest } from '../../helpers/instance';
import { ChevronUpDownIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Dashboard from './Dashboard';
import { toast } from 'react-toastify';

function CreateProfile() {
    const [role, setRole] = React.useState('');
    const [dropdown, setDropdown] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [register, setRegister] = React.useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    function handleCheckboxChange() {
        setShowPassword(!showPassword);
    }

    const toggleRole = (e) => {
        setRole(e.target.innerText);
        setRegister({ ...register, role: e.target.innerText });
        setDropdown(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        publicRequest
            .post('/auth/register', register)
            .then((response) => {
                if(response.data){
                    toast.success('Utilizatorul a fost creat cu succes');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Ceva a mers gresit');
            });
        setRegister({ name: '', email: '', password: '', role: '' });
        setRole('');
    };

    return (
        <Dashboard pageTitle="Lista de utilizatori">
            <section className="dark:dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
               <form
                   action="#"
                   method="post"
                   onSubmit={handleSubmit}
                   className="flex flex-col mt-5 max-w-xl w-full mx-auto gap-5">
                   <label className="form-label">
                       Nume/Prenume
                       <input
                           type="text"
                           name="name"
                           value={register.name}
                           onChange={handleChange}
                           className="auth-input"
                       />
                   </label>

                   <label className="form-label">
                       Email
                       <input
                           type="email"
                           name="email"
                           value={register.email}
                           onChange={handleChange}
                           className="auth-input"
                       />
                   </label>
                   <div>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="relative mt-1 w-full">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                required
                                className="auth-input"
                                placeholder="Enter password"
                            />

                            <span
                                className="absolute inset-y-0 right-4 inline-flex items-center cursor-pointer"
                                onClick={handleCheckboxChange}>
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5 text-gray-400 " />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </span>
                        </div>
                    </div>

                   <div className="w-full">
                       <label id="listbox-label" className="form-label">
                           Rolul
                       </label>
                       <div className="relative mt-1 w-full">
                           <button
                               type="button"
                               onClick={toggleDropdown}
                               className="auth-input pl-0 border"
                               aria-haspopup="listbox"
                               aria-expanded="true"
                               aria-labelledby="listbox-label">
                               <span
                                   className={
                                       role
                                           ? 'flex items-center pl-3'
                                           : 'flex items-center pl-3 text-gray-400'
                                   }>
                                   {role ? role : 'Alege rolul'}
                               </span>
                               <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                   <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                               </span>
                           </button>

                           {dropdown && (
                               <ul className="role-dropdown" tabIndex="-1">
                                   <li
                                       className="role-dropdown__item"
                                       id="listbox-option-0"
                                       onClick={toggleRole}>
                                       Admin
                                   </li>
                                   <li
                                       className="role-dropdown__item"
                                       id="listbox-option-0"
                                       onClick={toggleRole}>
                                       Profesor
                                   </li>
                                   <li
                                       className="role-dropdown__item"
                                       id="listbox-option-0"
                                       onClick={toggleRole}>
                                       Student
                                   </li>
                               </ul>
                           )}
                       </div>
                   </div>

                   <button type="submit" className="button-primary py-3 w-full justify-center">
                       Crează cont
                   </button>
               </form>
           </section>
        </Dashboard>
    );
}

export default CreateProfile;
