import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import EntriesContainer from './containers/EntriesContainer.jsx';

const main = (
  <Provider store={store}>
    <EntriesContainer />
  </Provider>
);

ReactDOM.render(main, document.getElementById('app'));
