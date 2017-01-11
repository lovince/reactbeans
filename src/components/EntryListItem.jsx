import React from 'react';

import S from '../styles/styles.js';
import Entry from '../common/Entry.js';

class EntryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
    this.onClick = this.onClick.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
  }

  onClick () {
    let newExpandedState = !this.state.expanded;
    this.setState({expanded: newExpandedState});
  }

  delete() {
    this.props.onRemove(this.props.id);
  }

  render() {
    let props = this.props;
    var expanded = S.hidden;
    if (this.state.expanded) {
      expanded = S.show;
    }
    const ds = new Date(props.date).toString();
    return (
      <ul id={props.id} onClick={this.onClick} style={S.entrybg}>
        <li>{ds}</li>
        <li>{props.amount}</li>
        <li>{props.currency}</li>
        <div style={expanded}>
          <li>{props.account}</li>
          <li>{props.category}</li>
          <li>{props.location}</li>
          <button onClick={this.delete}>Delete</button>
        </div>
      </ul>
    );
  }
}

export default EntryListItem;
