import React from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ArrowUpTrayIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

import { publicRequest } from '../../helpers/instance';
import Dashboard from './Dashboard';
import ButtonLoader from '../../components/ButtonLoader';

function AddDocument() {
    const [file, setFile] = React.useState({
        file: '',
        name: '',
        inputs: [],
    });
    const [input, setInput] = React.useState({ placeholder: '', type: '', name: '' });
    const [loading, setLoading] = React.useState(false);
    const { token } = useSelector((state) => state.auth);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('name', file.name);
        formData.append('inputs', JSON.stringify(file.inputs));

        try {
            await publicRequest.post('/documents', formData, {
                headers: { 'x-auth-token': `${token}` },
            });
            toast.success('Documentul a fost adăugat cu succes');
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('A apărut o erroare la încărcare');
            setLoading(false);
        }
        setFile({ name: '', file: '', inputs: [] });
    }

    const handleAddInputs = () => {
        if (input.name && input.placeholder && input.type) {
            setFile((prevFile) => ({
                ...prevFile,
                inputs: [...prevFile.inputs, input],
            }));
            setInput({ placeholder: '', name: '', type: '' });
        } else {
            toast.error('Complectați totate câmpurile');
        }
    };

    return (
        <Dashboard pageTitle="Adaugă Document">
            <div className="with-aside grid gap-5">
                <form onSubmit={handleSubmit}>
                    <label className="form-label mb-4">
                        Nume Document
                        <input
                            type="text"
                            name="name"
                            required
                            value={file.name}
                            onChange={(e) => setFile({ ...file, name: e.target.value })}
                            className="auth-input pr-3"
                        />
                    </label>
                    <Dropzone
                        onDrop={(acceptedFiles) => setFile({ ...file, file: acceptedFiles[0] })}>
                        {({ getRootProps, getInputProps }) => (
                            <div
                                className="flex items-start flex-col justify-center w-full"
                                {...getRootProps()}>
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <ArrowUpTrayIcon className="w-10 mb-3 h-10 text-gray-400 dark:hover:text-white" />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>{' '}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            DOCX or PDF (MAX. 16MB)
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        name="file"
                                        {...getInputProps()}
                                    />
                                </label>
                                <h4 className="text-gray-800 dark:text-white font-semibold mt-2">
                                    {file && file.file && file.file.path}
                                </h4>
                            </div>
                        )}
                    </Dropzone>
                    <div className="grid grid-cols-3 gap-x-5 w-full gap-y-3">
                        <label className="form-label mb-4">
                            Placeholder
                            <input
                                type="text"
                                name="placeholder"
                                value={input.placeholder}
                                onChange={(e) =>
                                    setInput({ ...input, placeholder: e.target.value })
                                }
                                className="auth-input pr-3"
                            />
                        </label>
                        <label className="form-label mb-4">
                            Tipul
                            <select
                                id="countries"
                                value={input.type}
                                className="auth-input pr-3"
                                onChange={(e) => setInput({ ...input, type: e.target.value })}>
                                <option defaultValue hidden>
                                    Alege Tipul
                                </option>
                                <option value="text">text</option>
                                <option value="date">date</option>
                                <option value="email">email</option>
                                <option value="number">number</option>
                                <option value="tel">tel</option>
                            </select>
                        </label>
                        <label className="form-label mb-4">
                            Numele
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                className="auth-input pr-3"
                                onChange={(e) => setInput({ ...input, name: e.target.value })}
                            />
                        </label>
                        <PlusCircleIcon
                            className="text-white w-10 h-10 cursor-pointer hover:scale-110 transition-all col-span-3 mb-2"
                            onClick={handleAddInputs}></PlusCircleIcon>
                        {file.inputs.length > 0 &&
                            file.inputs.map((input) => (
                                <>
                                    <h3 className="text-white font-semibold border p-2 rounded-md">
                                        {input.placeholder}
                                    </h3>
                                    <h3 className="text-white font-semibold border p-2 rounded-md">
                                        {input.type}
                                    </h3>
                                    <h3 className="text-white font-semibold border p-2 rounded-md">
                                        {input.name}
                                    </h3>
                                </>
                            ))}
                    </div>

                    <ButtonLoader isLoading={loading}>Publică Documentul</ButtonLoader>
                </form>
                <aside className="legend">
                    <h3>Placeholder</h3>
                    <p>
                        Un placeholder reprezintă o valoare sau un text temporar afișat într-un câmp
                        de introducere a datelor, pentru a indica utilizatorului ce tip de
                        informații ar trebui să fie introduse în acel câmp.
                    </p>
                    <h3>Tipul</h3>
                    <p>
                        Tipus se utilizeaza pentru a specifica tipul de date acceptate într-un câmp
                        de introducere a datelor.
                    </p>
                    <ul>
                        <li>"text": acesta reprezintă un câmp de introducere a textului.;</li>
                        <li>
                            "date": acesta reprezintă un câmp de introducere a datei, care permite
                            itroducerea datei utilizând un calendar;
                        </li>
                        <li>
                            "email": acesta reprezintă un câmp de introducere a adresei de e-mail,
                            care validează datele introduse și verifică dacă acestea sunt formate
                            corect pentru o adresă de e-mail;
                        </li>
                        <li>
                            "number": acesta reprezintă un câmp de introducere a numerelor, care
                            permite utilizatorilor să introducă numere întregi;
                        </li>
                        <li>
                            "tel": acesta reprezintă un câmp de introducere a numerelor de telefon.
                        </li>
                    </ul>
                    <h3>Numele</h3>
                    <p>
                        Numele se introduce conform documentului Template, de exemplu daca in
                        document aveti campul "fullname" atunci numele campului ar trebui la fel sa
                        fie "fullname"
                    </p>
                </aside>
            </div>
        </Dashboard>
    );
}

export default AddDocument;
