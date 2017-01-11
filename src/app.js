import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import EntriesContainer from './containers/EntriesContainer.jsx';

const main = (
  <Provider store={store}>
    <MuiThemeProvider>
      <EntriesContainer />
    </MuiThemeProvider>
  </Provider>
);


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(main, document.getElementById('app'));
