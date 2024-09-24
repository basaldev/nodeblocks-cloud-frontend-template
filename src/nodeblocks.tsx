import {
  createApp,
  createAppInitializer,
} from '@basaldev/blocks-frontend-framework';
import { api, session } from '@basaldev/blocks-frontend-sdk';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { HelloWorldAppTemplate } from './template';

import '@basaldev/blocks-frontend-framework/dist/style.css';
import './core-styles.css';

const sessionService = new session.LocalStorageSessionService();

const authApi = new api.AuthDefaultAdapterApi('http://auth', sessionService);
const userApi = new api.UserDefaultAdapterApi('http://user', sessionService);

const template = new HelloWorldAppTemplate(
  {},
  { authApi, sessionService, userApi }
);
const appInitializer = createAppInitializer({ template });
const App = createApp({ appInitializer, template });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
