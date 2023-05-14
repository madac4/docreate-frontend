import Documents from './pages/Documents';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Dashboard from './pages/Admin/Dashboard';
import Register from './pages/Admin/Register';
import SingleDocument from './pages/SingleDocument/';
import Users from './pages/Admin/Users';
import AddDocument from './pages/Admin/AddDocument';
import DocsList from './pages/Admin/DocsList';

export const Routing = {
    NotFound: { path: '*', element: <NotFound /> },
    Homepage: { path: '/', element: <Home /> },
    Documents: { path: '/documents', element: <Documents /> },
    Dashboard: { path: '/dashboard', element: <Dashboard /> },
    AddDocument: { path: '/dashboard/new-document', element: <AddDocument /> },
    DocsList: { path: '/dashboard/documents', element: <DocsList /> },
    Register: { path: '/register/:token', element: <Register /> },
    Document: { path: '/document/:slug', element: <SingleDocument /> },
    UsersList: { path: '/dashboard/users', element: <Users /> },
    ResetPassword: { path: '/reset-password/:token', element: <Home /> },
};
