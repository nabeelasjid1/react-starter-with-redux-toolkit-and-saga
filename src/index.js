import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';
import App from './App';
import configureStore from './redux/store/configureStore';
import history from './utils/history';
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
// Create redux store with history
const initialState = {};
const { store, persister } = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
