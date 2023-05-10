import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FileViewer from 'react-file-viewer';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import styles from './styles.module.scss';
import { publicRequest } from '../../helpers/instance';
import Layout from '../../components/Layout';
import { Loader } from '../../components/Loader';
import ButtonLoader from '../../components/ButtonLoader';

function SingleDocument() {
    const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth);
    const [inputValues, setInputValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [html, setHtml] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [element, setElement] = React.useState(null);
    const { token } = useSelector((state) => state.auth);
    const { slug } = useParams();

    React.useEffect(() => {
        function handleResize() {
            setViewportWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            if (viewportWidth > 766) {
                try {
                    if (element && element._id) {
                        const { data } = await publicRequest.get(
                            `/documents/getfile/${element._id}`,
                            {
                                responseType: 'blob',
                                headers: { 'x-auth-token': token },
                            },
                        );
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
            }
        };
        getInitialDocument(element && element);
    }, [element, token, viewportWidth]);

    const getDoc = async (event) => {
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
            setLoading(false);
            setHtml('');
            setTimeout(() => {
                if (viewportWidth > 766) {
                    setHtml(<FileViewer fileType={'docx'} filePath={url} />);
                } else {
                    setHtml(
                        <a
                            href={url}
                            download={slug}
                            className="button-primary w-full text-center justify-center py-4 mt-10">
                            <ArrowDownTrayIcon className="h-6 w-6" />
                            Descarcă Documentul
                        </a>,
                    );
                }
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
                            Complecatați câmpurile de mai jos pentru completarea documentului:{' '}
                            {element.name && element.name}
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
                            {url.length > 0 && viewportWidth < 767 && html}
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
                                    <ArrowDownTrayIcon className="h-6 w-6" />
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
