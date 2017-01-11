import React from 'react';
import db from '../database';

import Entry from '../common/Entry';
import EntryListItem from './EntryListItem.jsx';

class EntriesListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const entries = this.props.entries;
    const loadMore = this.props.onMore;

    let entriesList = entries.map(e => {
      return (
        <EntryListItem id={e.key} {...e} onRemove={this.props.onRemove}/>
      )
    });

    return (
      <div>
        <h1>Entries</h1>
        <div className='entriesList'>
          {entriesList}
        </div>
        <button onClick={loadMore}>Load More</button>
      </div>
    );
  }
}

export default EntriesListComponent;
