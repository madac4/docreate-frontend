import React from 'react';
import Header from '../components/Header';

function Home() {
    return (
        <div className="wrapper">
            <Header></Header>
            <section className="dark:text-white text-gray-900">
                <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                            Modalitate mai simplă
                            <span className="sm:block"> de creare a documentelor </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
                            Site pentru unificarea documentelor oficiale
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
