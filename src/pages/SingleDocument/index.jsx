import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { publicRequest } from '../../helpers/instance';
import Layout from '../../components/Layout';
import { Loader } from '../../components/buttons/Loader';
import ButtonLoader from '../../components/buttons/ButtonLoader';
import buttons from '../../components/styles/buttons.module.scss';
import Input from '../../components/forms/Input';
import DateInput from '../../components/forms/DateInput';
import { PrimaryLink } from '../../components/buttons/ButtonPrimary';

function SingleDocument() {
    const [inputValues, setInputValues] = React.useState({ repeater: [] });
    const [repeater, setRepeater] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [element, setElement] = React.useState(null);
    const { token } = useSelector((state) => state.auth);
    const { slug } = useParams();

    React.useEffect(() => {
        const getDocument = async (slug) => {
            try {
                const { data } = await publicRequest.get(`/documents/${slug}`, {
                    headers: { 'x-auth-token': `${token}` },
                });
                setElement(data);
            } catch (error) {
                console.log(error);
                alert('Nu există așa document');
            }
        };
        getDocument(slug);
    }, [slug, token]);

    const generateDocument = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await publicRequest.get(`/documents/getfile/${element._id}`, {
                responseType: 'blob',
                params: inputValues,
                headers: { 'x-auth-token': token },
            });
            const url = URL.createObjectURL(data);
            setUrl(url);
            toast.success('Documentul a fost generat cu succes');
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Documentul nu exista');
            setLoading(false);
        }
    };
    const pushRepeater = () => {
        setInputValues({
            ...inputValues,
            repeater: [...inputValues.repeater, repeater],
        });

        setRepeater([]);
        toast.success('Element adaugat cu succes');
    };

    return (
        <Layout>
            {element ? (
                <div className="mx-auto mt-10 max-w-3xl">
                    <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-300 mb-8">
                        Complecatați câmpurile de mai jos pentru completarea documentului:{' '}
                        {element.name && element.name}
                    </h2>
                    <form action="#" onSubmit={generateDocument} className="w-full" method="GET">
                        <div className="mb-5 flex flex-col gap-3">
                            {element &&
                                element.inputs &&
                                element.inputs.map((input, index) =>
                                    input.type !== 'date' && !input.repeat ? (
                                        <Input
                                            key={`${input.name}_${index}`}
                                            type={input.type}
                                            label={input.placeholder}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            onChange={(e) =>
                                                setInputValues({
                                                    ...inputValues,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    ) : input.type !== 'date' && input.repeat ? (
                                        <Input
                                            key={`${input.name}_${index}`}
                                            type={input.type}
                                            label={`${input.placeholder} *`}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            onChange={(e) =>
                                                setRepeater({
                                                    ...repeater,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        <DateInput
                                            key={`${input.name}_${index}`}
                                            type={input.type}
                                            label={input.placeholder}
                                            name={input.name}
                                            required
                                            onChange={(e) => {
                                                const date = new Date(e.target.value);
                                                const formattedDate = date
                                                    .toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })
                                                    .replace(/\//g, '.');
                                                setInputValues({
                                                    ...inputValues,
                                                    [e.target.name]: formattedDate,
                                                });
                                            }}
                                        />
                                    ),
                                )}
                        </div>
                        <button
                            type="button"
                            onClick={pushRepeater}
                            className={buttons.buttonPrimary}>
                            Adauga rand
                        </button>

                        <ButtonLoader isLoading={loading} classNames={'w-full py-3 mt-5'}>
                            Generează Document
                        </ButtonLoader>

                        {url && (
                            <PrimaryLink
                                href={url}
                                download={element.slug}
                                classNames="mt-5 w-full">
                                Descarca Document
                            </PrimaryLink>
                        )}
                    </form>
                </div>
            ) : (
                <main className="h-screen dark:bg-gray-900">
                    <Loader></Loader>
                </main>
            )}
        </Layout>
    );
}

export default SingleDocument;
