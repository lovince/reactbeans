import React from 'react';

import S from '../styles/styles.js';
import Entry from '../common/Entry.js';
// import firedb from '../common/firedb';

class EntryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
    this.onClick = this.onClick.bind(this);
    this.delete = this.delete.bind(this);
  }

  onClick () {
    let newExpandedState = !this.state.expanded;
    this.setState({expanded: newExpandedState});
  }

  delete() {
    Entry.remove(this.props.id);
  }

  render() {
    let props = this.props;
    var expanded = S.hidden;
    if (this.state.expanded) {
      expanded = S.show;
    }
    return (
      <div id={props.id} onClick={this.onClick} style={S.entry}>
        <ul>
        <li>{props.date}</li>
        <li>{props.amount}</li>
        <li>{props.currency}</li>
        <div style={expanded}>
          <li>{props.account}</li>
          <li>{props.category}</li>
          <li>{props.location}</li>
          <button onClick={this.delete}>Delete</button>
        </div>
        </ul>
      </div>
    );
  }
}

export default EntryListItem;
