/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createReducer from './createReducer';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
const initReducers = {
  global: globalReducer,
  language: languageProviderReducer,
};

export default function configureStore(initialState = {}) {
  // Create the store with  middlewares
  // 1. thunkMiddleware: allow writting action creators that return a function instead of an action
  const middleware = [thunkMiddleware];
  const enhancers = [applyMiddleware(...middleware)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;

  const store = createStore(
    createReducer(initReducers),
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.injectedReducers = initReducers; // Reducer registry

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createReducer(store.injectedReducers));
  //   });
  // }
  return store;
}
