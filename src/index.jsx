import React from 'react';
import { render } from 'react-dom';

import firedb from './common/firedb';

import Entry from './common/Entry';
import EntryForm from './components/EntryForm.jsx';
import EntriesListComponent from './components/EntriesListComponent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // firedb.db.ref('/data/xentries').orderByChild('date').on('child_added', snap => {
    //   // console.log(snap.val());
    //   firedb.db.ref('/data/entries').push(snap.val());
    // });

    // let e = new Entry();
    // e.save();
  }

  render () {
    return (
      <div>
        <EntryForm />
        <EntriesListComponent />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
