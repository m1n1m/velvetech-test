import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import rootStore from '@store/RootStore';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {StoreProvider} from '@store/stores';

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <StoreProvider value={rootStore}>
          <Router history={browserHistory}>
              <Route component={App} />
          </Router>
      </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
