import {
  MockSessionService,
  createApp,
  createAppInitializer,
} from '@basaldev/blocks-frontend-framework';
import { api } from '@basaldev/blocks-frontend-sdk';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { HelloWorldAppTemplate } from './template';

import '@basaldev/blocks-frontend-framework/dist/style.css';
import './core-styles.css';

const sessionService = new MockSessionService();
sessionService.registerMockResponseHandler('http://auth/ping', 'get', () => ({
  packageInfo: {
    gitCommitHash: 'mock-git-commit-hash',
    sdkVersion: 'mock-sdk-version',
    serviceAdapterAPIVersion: 'mock-service-adapter-api-version',
    serviceName: 'blocks-auth-service',
    serviceVersion: '4.0.1',
  },
  status: 'ok',
}));
sessionService.registerMockResponseHandler('http://user/ping', 'get', () => ({
  packageInfo: {
    gitCommitHash: 'mock-git-commit-hash',
    sdkVersion: 'mock-sdk-version',
    serviceAdapterAPIVersion: 'mock-service-adapter-api-version',
    serviceName: 'blocks-user-service',
    serviceVersion: '2.16.0',
  },
  status: 'ok',
}));
sessionService.registerMockResponseHandler('http://auth/login', 'post', () => ({
  accessToken: '1234567890',
  refreshToken: '1234567890',
  userId: 'mock-user-id',
}));
sessionService.registerMockResponseHandler(
  'http://auth/refresh-access-token',
  'post',
  () => ({
    accessToken: '1234567890',
    refreshToken: '1234567890',
    userId: 'mock-user-id',
  })
);

sessionService.registerMockResponseHandler(
  'http://auth/users/mock-user-id/logout',
  'post',
  () => ({})
);
sessionService.registerMockResponseHandler(
  'http://user/users/mock-user-id',
  'get',
  () => ({
    avatar: '',
    email: 'test-user@email.com',
    id: 'mock-user-id',
    name: 'ベーセル太郎',
  })
);

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
