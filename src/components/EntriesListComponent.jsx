import React from 'react';
import firedb from '../common/firedb';

import Entry from '../common/Entry';
import EntryListItem from './EntryListItem.jsx';

class EntriesListComponent extends React.Component {
  constructor(props) {
    super(props);
    let now = new Date();
    this.state = {lastDate:now, entries:[]};
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore () {
    var ref = firedb.db.ref(firedb.entriesLoc).orderByChild('date').limitToLast(10).endAt(this.state.lastDate.toISOString());
    ref.on('child_added', e => {
      let k = e.key;
      let v = e.val();
      var entriesState = this.state.entries;
      var lastDateState = this.state.lastDate;
      let d = new Date(v.date);
      if (d < lastDateState) {
        lastDateState = new Date(d - 1);
      }
      entriesState.push({key:k,val:v});
      this.setState({lastDate:lastDateState, entries:entriesState});
    })
  }

  sortEntries(a,b) {
    return -Entry.compareByDate(a.val, b.val)
  }

  render() {
    let entriesList = this.state.entries.sort(this.sortEntries).map((k,i) => {
      let e = this.state.entries[i];
      return (
        <EntryListItem key={e.key} id={e.key} {...e.val} />
      )
    });

    return (
      <div>
        <h1>Entries</h1>
        <div className='entriesList'>
          {entriesList}
        </div>
        <button onClick={this.loadMore}>Load More</button>
      </div>
    );
  }
}

export default EntriesListComponent;
