import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import CategoryView from './components/category_view'
import reducers from './reducers';

import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='category' component={CategoryView}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
