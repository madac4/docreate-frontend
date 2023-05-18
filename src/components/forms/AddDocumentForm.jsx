import { ArrowUpTrayIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { useState } from 'react';

import { publicRequest } from '../../helpers/instance';
import ButtonLoader from '../buttons/ButtonLoader';
import styles from '../styles/buttons.module.scss';
import Select from './Select';
import Input from './Input';
import ButtonIcon from '../buttons/ButtonIcon';
function AddDocumentForm() {
    const [input, setInput] = useState({ placeholder: '', type: '', name: '', repeat: false });
    const [file, setFile] = useState({ file: '', name: '', inputs: [] });
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

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
        <form onSubmit={handleSubmit}>
            <Input
                label={'Nume Document'}
                required
                type="text"
                name="document-name"
                onChange={(e) => setFile({ ...file, name: e.target.value })}
            />

            <Dropzone onDrop={(acceptedFiles) => setFile({ ...file, file: acceptedFiles[0] })}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        className="flex items-start flex-col justify-center w-full mt-3"
                        {...getRootProps()}>
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ArrowUpTrayIcon className="w-10 mb-3 h-10 text-gray-400 dark:hover:text-white" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag
                                    and drop
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
                        <p className="text-gray-800 dark:text-white font-semibold my-1">
                            {file && file.file && file.file.path}
                        </p>
                    </div>
                )}
            </Dropzone>

            <div className="grid grid-cols-4 gap-x-2 w-full gap-y-3 mt-2">
                <Input
                    placeholder={'Placeholder'}
                    type="text"
                    name="placeholder"
                    value={input.placeholder}
                    onChange={(e) => setInput({ ...input, placeholder: e.target.value })}
                />
                <Select
                    placeholder={'Tipul'}
                    name="type"
                    value={input.type}
                    onChange={(e) => setInput({ ...input, type: e.target.value })}
                />
                <Input
                    placeholder={'Numele'}
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => setInput({ ...input, name: e.target.value })}
                />
                <ButtonIcon
                    checked={input.repeat}
                    classNames={'mr-0'}
                    clickEvent={() => setInput({ ...input, repeat: !input.repeat })}>
                    {input.repeat ? (
                        <CheckIcon className={`${input.repeat && 'text-white'} w-5 h-5`} />
                    ) : (
                        <XMarkIcon className={`${input.repeat && 'text-white'} w-5 h-5`} />
                    )}
                </ButtonIcon>
                {file.inputs.length > 0 &&
                    file.inputs.map((input, index) => (
                        <div
                            key={`${input.name}_${index}`}
                            className="col-span-4 grid grid-cols-4 gap-x-2 gap-y-3">
                            <p className="text-white font-semibold border p-1 text-sm rounded-md">
                                {input.placeholder}
                            </p>
                            <p className="text-white font-semibold border p-1 text-sm rounded-md">
                                {input.type}
                            </p>
                            <p className="text-white font-semibold border p-1 text-sm rounded-md">
                                {input.name}
                            </p>
                            <p className="text-white font-semibold border p-1 text-sm rounded-md">
                                {input.repeat ? 'Da' : 'Nu'}
                            </p>
                        </div>
                    ))}
                <button
                    type="button"
                    onClick={handleAddInputs}
                    className={`${styles.buttonEmpty} col-span-2`}>
                    Adaugă Câmp
                </button>
            </div>

            <ButtonLoader type={'submit'} isLoading={loading} classNames={'w-full mt-4'}>
                Publică Documentul
            </ButtonLoader>
        </form>
    );
}

export default AddDocumentForm;
