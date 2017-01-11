import React from 'react';
import N from 'numeral';

import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

import S from '../styles/styles.js';

class EntryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
  }

  delete() {
    this.props.onRemove(this.props.id);
  }

  cardIcon(category) {
    const iconStyles = {
      marginRight: 24,
      marginTop: 3,
      fontSize: 28,
    };

    var icon='attach_money';
    switch (category) {
      case 'dining': icon='local_dining'; break;
      case 'entertainment': icon='theaters'; break;
      case 'groceries': icon='shopping_cart'; break;
      case 'household': icon='home'; break;
      case 'pets': icon='pets'; break;
      case 'purchases': icon='shopping_basket'; break;
      case 'services': icon='room_service'; break;
      case 'transportation': icon='directions_car'; break;
      case 'travel': icon='flight_takeoff'; break;
      default:
        icon='attach-money';
    }
    return (
      <FontIcon className="material-icons" style={iconStyles}>{icon}</FontIcon>
    )
  }

  render() {
    let props = this.props;
    return (
      <Card style={S.entry} expandable={true}>
        <CardHeader
          title={N(props.amount).format('0,0.00')+' '+props.currency}
          subtitle={new Date(props.date).toDateString()}
          actAsExpander={true}
          showExpandableButton={true}
          avatar={this.cardIcon(props.category)}
        />
        <CardText expandable={true}>
          <ul>
            <li>{props.account}</li>
            <li>{props.category}</li>
            <li>{props.location}</li>
          </ul>
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Delete" secondary={true} onClick={this.delete} />
        </CardActions>
      </Card>
    );
  }
}

export default EntryListItem;
