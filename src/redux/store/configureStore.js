import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../root/rootReducer';
import sagas from '../root/rootSaga';
import history from '../../utils/history';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export default () => {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose;

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers)
  );
  if (module.hot) {
    module.hot.accept('../root/rootReducer', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }
  const persister = persistStore(store);
  sagaMiddleware.run(sagas);

  return { store, persister };
};
