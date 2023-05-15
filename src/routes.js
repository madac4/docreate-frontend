import Documents from './pages/Documents';
import Home from './pages/Home';
import Error404 from './pages/Error/404';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Admin/Register';
import SingleDocument from './pages/SingleDocument/';
import UserList from './pages/Dashboard/UserList';
import DocumentList from './pages/Dashboard/DocumentList';
import Profile from './pages/Dashboard/Profile';

export const Routing = {
    NotFound: { path: '*', element: <Error404 /> },
    Homepage: { path: '/', element: <Home /> },
    Documents: { path: '/documents', element: <Documents /> },
    Dashboard: { path: '/dashboard', element: <Dashboard /> },
    Profile: { path: '/dashboard/profile', element: <Profile /> },
    DocsList: { path: '/dashboard/documents', element: <DocumentList /> },
    Register: { path: '/register/:token', element: <Register /> },
    Document: { path: '/document/:slug', element: <SingleDocument /> },
    UsersList: { path: '/dashboard/users', element: <UserList /> },
    ResetPassword: { path: '/reset-password/:token', element: <Home /> },
};
