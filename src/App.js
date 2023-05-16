import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop';
import { loadUser } from './redux/api';
import { store } from './redux/store';

import 'react-toastify/dist/ReactToastify.css';

import { Routing } from './routes';
const App = () => {
    const { token, isAuth, isAdmin } = useSelector((state) => state.auth);
    React.useEffect(() => {
        store.dispatch(loadUser(token));
    }, [token]);

    React.useEffect(() => {
        const isDark = localStorage.getItem('isDarkMode') === 'true';
        document.body.classList.toggle('dark', isDark);
    }, []);

    return (
        <>
            <div className="h-screen">
                <ToastContainer />
                <ScrollToTop>
                    <Routes>
                        <Route path={Routing.NotFound.path} element={Routing.NotFound.element} />
                        <Route path={Routing.Homepage.path} element={Routing.Homepage.element} />
                        <Route
                            path={Routing.ResetPassword.path}
                            element={Routing.ResetPassword.element}
                        />
                        {token && (
                            <Route
                                path={Routing.Register.path}
                                element={Routing.Register.element}
                            />
                        )}
                        {isAuth && isAdmin && (
                            <>
                                <Route
                                    path={Routing.Dashboard.path}
                                    element={Routing.Dashboard.element}
                                />
                                <Route
                                    path={Routing.UsersList.path}
                                    element={Routing.UsersList.element}
                                />
                                <Route
                                    path={Routing.DocsList.path}
                                    element={Routing.DocsList.element}
                                />
                            </>
                        )}

                        {isAuth && (
                            <>
                                <Route
                                    path={Routing.Documents.path}
                                    element={Routing.Documents.element}
                                />
                                <Route
                                    path={Routing.Document.path}
                                    element={Routing.Document.element}
                                />
                                <Route
                                    path={Routing.Profile.path}
                                    element={Routing.Profile.element}
                                />
                            </>
                        )}
                    </Routes>
                </ScrollToTop>
            </div>
        </>
    );
};
export default App;
