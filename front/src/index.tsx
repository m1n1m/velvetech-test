import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import {Provider} from 'mobx-react';
import rootStore from '@store/RootStore';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import categoriesStore from '@store/CategoriesStore';
import goodsStore from '@store/GoodsStore';

export const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <Provider
          rootStore={rootStore}
          categoriesStore={categoriesStore}
          goodsStore={goodsStore}
      >
          <Router history={browserHistory}>
              <Route component={App} />
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
