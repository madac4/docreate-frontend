import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { store, persistor } from './redux/store';
// import 'flowbite';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-zbtxjufhp0pf3ns6.us.auth0.com"
            clientId="ySzPZhWuV7Pz4dpQyOIPzbx93oSPdWQv"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: 'https://dev-zbtxjufhp0pf3ns6.us.auth0.com/api/v2/',
                scope: 'read:current_user update:current_user_metadata',
            }}>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>,
);
