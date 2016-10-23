import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import List from './components/list';
import Statistic from './components/statistic';
import Summary from './components/summary'
import reducers from './reducers';

import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='statistic' component={Statistic}></Route>
        <Route path='list' component={List}></Route>
        <Route path='summary' component={Summary}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
