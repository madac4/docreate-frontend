import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileViewer from 'react-file-viewer';

import styles from './styles.module.scss';
import { publicRequest } from '../../helpers/instance';
import Layout from '../../components/Layout';
import { Loader } from '../../components/Loader';
import ButtonLoader from '../../components/ButtonLoader';

function SingleDocument() {
    const [inputValues, setInputValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [html, setHtml] = React.useState('');
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

    React.useEffect(() => {
        const getInitialDocument = async (element) => {
            try {
                if (element && element._id) {
                    const { data } = await publicRequest.get(`/documents/getfile/${element._id}`, {
                        responseType: 'blob',
                    });
                    const url = URL.createObjectURL(data);
                    setUrl(url);
                    setLoading(false);
                    setHtml('');
                    setTimeout(() => {
                        setHtml(<FileViewer fileType={'docx'} filePath={url} />);
                    }, 200);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getInitialDocument(element && element);
    }, [element]);

    const getDoc = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await publicRequest.get(`/documents/getfile/${element._id}`, {
                responseType: 'blob',
                params: inputValues,
            });
            const url = URL.createObjectURL(data);
            setUrl(url);
            setLoading(false);
            setHtml('');
            setTimeout(() => {
                setHtml(<FileViewer fileType={'docx'} filePath={url} />);
            }, 200);
        } catch (error) {
            console.log(error);
            alert('Nu există așa document');
            setLoading(false);
        }
    };

    return (
        <Layout>
            {element ? (
                <div className={styles.liveDocument}>
                    <div className={styles.liveDocument__editor}>
                        <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-300 mb-8">
                            Complecatați câmpurile de mai jos {element.name && element.name}
                        </h2>
                        <form action="#" onSubmit={getDoc} method="GET">
                            <div className={styles.fields}>
                                {element &&
                                    element.inputs &&
                                    element.inputs.map((input, index) =>
                                        input.type !== 'date' ? (
                                            <input
                                                key={`${input.name}_${index}`}
                                                type={input.type}
                                                name={input.name}
                                                required
                                                onChange={(e) =>
                                                    setInputValues({
                                                        ...inputValues,
                                                        [e.target.name]: e.target.value,
                                                    })
                                                }
                                                placeholder={input.placeholder}
                                                className="auth-input pr-3"
                                            />
                                        ) : (
                                            <label
                                                className="form-label mb-4"
                                                key={`${input.name}_${index}`}>
                                                {input.placeholder}
                                                <input
                                                    type={input.type}
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
                                                    placeholder={input.placeholder}
                                                    className="auth-input pr-3"
                                                />
                                            </label>
                                        ),
                                    )}
                            </div>
                            <ButtonLoader isLoading={loading}>Generează Document</ButtonLoader>
                        </form>
                    </div>
                    <div className={styles.liveDocument__body}>
                        {url.length > 0 && (
                            <>
                                {html}
                                <a
                                    href={url}
                                    download={slug}
                                    className="button-primary w-full text-center justify-center py-4">
                                    Descarcă Documentul
                                </a>
                            </>
                        )}
                    </div>
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
