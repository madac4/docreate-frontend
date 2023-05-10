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
    const { token, isAuth } = useSelector((state) => state.auth);
    React.useEffect(() => {
        store.dispatch(loadUser(token));
    }, [token]);

    return (
        <>
            <div className="h-screen">
                <ToastContainer />
                <ScrollToTop>
                    {isAuth ? (
                        <Routes>
                            <Route
                                path={Routing.NotFound.path}
                                element={Routing.NotFound.element}
                            />
                            <Route
                                path={Routing.Homepage.path}
                                element={Routing.Homepage.element}
                            />
                            <Route
                                path={Routing.Documents.path}
                                element={Routing.Documents.element}
                            />
                            <Route
                                path={Routing.Dashboard.path}
                                element={Routing.Dashboard.element}
                            />

                            <Route
                                path={Routing.Document.path}
                                element={Routing.Document.element}
                            />
                            <Route
                                path={Routing.AddDocument.path}
                                element={Routing.AddDocument.element}
                            />
                            <Route
                                path={Routing.UsersList.path}
                                element={Routing.UsersList.element}
                            />
                            <Route
                                path={Routing.DocsList.path}
                                element={Routing.DocsList.element}
                            />
                            <Route path={Routing.Invite.path} element={Routing.Invite.element} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route
                                path={Routing.NotFound.path}
                                element={Routing.NotFound.element}
                            />
                            <Route
                                path={Routing.Homepage.path}
                                element={Routing.Homepage.element}
                            />
                            <Route
                                path={Routing.Dashboard.path}
                                element={Routing.Dashboard.element}
                            />
                            <Route
                                path={Routing.ResetPassword.path}
                                element={Routing.ResetPassword.element}
                            />
                            <Route
                                path={Routing.Register.path}
                                element={Routing.Register.element}
                            />
                        </Routes>
                    )}
                </ScrollToTop>
            </div>
        </>
    );
};
export default App;
