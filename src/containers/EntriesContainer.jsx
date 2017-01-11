import React from 'react';
import { connect } from 'react-redux';

import { getEntries, addEntry, removeEntry } from '../actions/EntriesActions';
import EntryForm from '../components/EntryForm.jsx';
import EntriesListComponent from '../components/EntriesListComponent.jsx';

class EntriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.loadEntries = this.loadEntries.bind(this);
  }

  componentDidMount() {
    this.loadEntries();
  }

  render () {
    const entries = this.props.entries;
    return (
      <div>
        <EntryForm onAdd={this.props.onAddEntry}/>
        <EntriesListComponent entries={entries} onMore={this.loadEntries} onRemove={this.props.onRemoveEntry} />
      </div>
    )
  }

  loadEntries() {
    this.props.onGetEntries(this.props.lastdate);
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entriesState.entries,
    lastdate: state.entriesState.lastdate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetEntries: (lastdate) => dispatch(getEntries(lastdate)),
    onAddEntry: (entry) => dispatch(addEntry(entry)),
    onRemoveEntry: (entry) => dispatch(removeEntry(entry))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesContainer);
