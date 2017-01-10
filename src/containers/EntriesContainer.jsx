import React from 'react';
import { connect } from 'react-redux';

import { getEntries, addEntry } from '../actions/getEntries';
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
        <EntriesListComponent entries={entries} onMore={this.loadEntries}/>
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
    onAddEntry: (entry) => dispatch(addEntry(entry))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesContainer);
