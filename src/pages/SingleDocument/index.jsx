import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useParams, Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { data as types } from '../../data/docs';
import { Angajare, Demisie, Concediu } from '../../components/documents';

function SingleDocument() {
    const [data, setData] = React.useState({});
    const [element, setElement] = React.useState({});
    const [timer, setTimer] = React.useState(null);
    const [date, setDate] = React.useState({});
    const { slug } = useParams();

    React.useEffect(() => {
        setElement(types.find((item) => item.slug === slug));
    }, [slug]);

    const handleDate = (newValue) => {
        setDate(newValue);
    };

    const getComponent = () => {
        console.log(slug + '||' + types[0].slug);

        if (slug === 'demisie') {
            return <Demisie data={data} date={date} />;
        } else if (slug === 'angajare') {
            return <Angajare data={data} date={date} />;
        } else if (slug === 'concediu') {
            return <Concediu data={data} date={date} />;
        } else {
            return (
                <h1 className="text-gray-200 text-center mt-5 text-xl">
                    Acest document lipsește la moment
                </h1>
            );
        }
    };

    const readData = (e) => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            setData({ ...data, [e.target.name]: e.target.value });
        }, 600);

        setTimer(newTimer);
    };

    return (
        <>
            <div className={styles.liveDocument}>
                <div className={styles.liveDocument__editor}>
                    <Link to="/" className="font-semibold sm:text-lg text-sm dark:text-white">
                        doCreator
                    </Link>
                    <h2 className="font-bold text-2xl mb-5 mt-6 text-gray-900 dark:text-gray-300">
                        Complecatați câmpurile de mai jos
                    </h2>
                    <div className={styles.fields}>
                        {element &&
                            element.inputs &&
                            element.inputs.map((input, index) => {
                                if (input.type !== 'date') {
                                    return (
                                        <input
                                            key={`${input.name}_${index}`}
                                            type={input.type}
                                            name={input.name}
                                            onChange={readData}
                                            placeholder={input.placeholder}
                                            className="input-style"
                                        />
                                    );
                                }
                                return (
                                    <Datepicker
                                        key={input.name}
                                        value={date}
                                        onChange={handleDate}
                                        placeholder={input.placeholder}
                                        useRange={false}
                                        asSingle={input.isSingle}
                                        i18n={'ro'}
                                        showFooter={true}
                                        displayFormat="DD.MM.YYYY"
                                        configs={{
                                            footer: {
                                                cancel: 'Anulează',
                                                apply: 'Aplică',
                                            },
                                        }}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className={styles.liveDocument__body}>{getComponent()}</div>
            </div>
        </>
    );
}

export default SingleDocument;
