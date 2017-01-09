import React from 'react';
import { connect } from 'react-redux';

import EntryForm from '../components/EntryForm.jsx';
import EntriesListComponent from '../components/EntriesListComponent.jsx';

class EntriesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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

function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesContainer);
