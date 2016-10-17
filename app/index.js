import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

const self = render(<Root store={store} history={history} />, rootEl);

// re-render if in development mode
if (module.hot) {
  module.hot.accept();
}

export default self;