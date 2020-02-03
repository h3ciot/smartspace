/**
 * @flow
 * index.js
 * This is the entry file for the application
 */
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

import Routes from './router';
import configureStore from './configureStore';

import { translationMessages } from './i18n';
import 'moment/locale/zh-cn';
import registerServiceWorker from './registerServiceWorker';

// Import CSS reset and Global Styles
import './index.less';
// Create redux store
const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');
if (MOUNT_NODE == null) {
  throw new Error('no root element');
}

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <App>
          <Routes />
        </App>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

render(translationMessages);
if (process.env.NODE_ENV !== 'development') {
  window.onerror = function(message, source, lineno, colno, error) {
    console.log('window.onerror:', message, source, lineno, colno, error);
    return true;
  };
  window.addEventListener(
    'error',
    error => {
      console.error('捕获到异常：', error, error.message);
      return true;
    },
    true
  );
  window.addEventListener('unhandledrejection', function(e) {
    console.error(e);
    return true;
  });
}
registerServiceWorker();
// 默认移除所有打开的子窗口关联
if (window.opener) {
  window.opener = null;
}
