import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop';
import Home from './pages/Home';
import DocumentsList from './pages/DocumentsList';
import SingleDocument from './pages/SingleDocument';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import UserList from './pages/Admin/UserList';
import { loadUser } from './redux/api';
import { store } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import CreateProfile from './pages/Admin/CreateProfile';
const App = () => {
    const { token, isAuth } = useSelector((state) => state.auth);
    React.useEffect(() => {
        store.dispatch(loadUser(token));
    }, [token]);

    return (
        <div className="dark:bg-gray-900 h-screen">
            <ToastContainer />
            <ScrollToTop>
                {isAuth ? (
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/documents-list" element={<DocumentsList />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/register" element={<CreateProfile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/documents/:slug" element={<SingleDocument />} />
                        <Route path="/dashboard/users" element={<UserList />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                )}
            </ScrollToTop>
        </div>
    );
};
export default App;
