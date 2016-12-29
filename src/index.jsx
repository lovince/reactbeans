import React from 'react';
import {render} from 'react-dom';

import Entry from './common/Entry';

class App extends React.Component {
  render () {
    return (
      <div>
        <p>Hello React World!</p>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
