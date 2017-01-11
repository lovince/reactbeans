import React from 'react';

import { Card, CardHeader, CardTitle, CardText, CardActions }  from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import S from '../styles/styles.js';
import Entry from '../common/Entry.js';

const defaultInputs = {
  account:'cash',
  amount:'',
  currency:'CAD',
  category:'dining',
  location:'',
  // date:new Date().toISOString().split('T')[0],
  date:new Date(),
  tags:''
}

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      inputs: Object.assign({},defaultInputs)
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.accountHandler = this.accountHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.currencyHandler = this.currencyHandler.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  onClickSave() {
    let i = this.state.inputs;
    let e = new Entry(i.date, i.account, i.amount, i.currency, i.category, i.location, i.tags);
    // e.save();
    this.props.onAdd(e);
    this.setState({expanded:false, inputs:Object.assign({},defaultInputs)});
  }

  onClickReset() {
    this.setState({inputs:Object.assign({},defaultInputs)});
  }

  updateInputState(e) {
    let key = e.currentTarget.id;
    let val = e.currentTarget.value;
    var newInputs = this.state.inputs;
    newInputs[key] = val;
    this.setState({inputs:newInputs});
  }

  accountHandler(event, index, value) {
    this.selectHandler('account',value);
  }
  categoryHandler(event, index, value) {
    this.selectHandler('category',value);
  }
  currencyHandler(event, index, value) {
    this.selectHandler('currency',value);
  }
  selectHandler(id, value) {
    const e = {
      currentTarget: {
        id: id,
        value: value
      }
    }
    this.updateInputState(e);
  }

  dateHandler(n, date) {
    this.updateInputState({
      currentTarget: {
        id: 'date',
        value: date
      }
    });
  }

  render() {
    let i = this.state.inputs;
    return (
      <Card expandable={true} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title='New Entry'
          actAsExpander={true} />
        <CardText expandable={true}>
          <SelectField value={i.account} onChange={this.accountHandler} floatingLabelText="Account">
            <MenuItem value='cash' primaryText='Cash'/>
            <MenuItem value='master' primaryText='Master'/>
            <MenuItem value='master (cn)' primaryText='Master (CN)'/>
            <MenuItem value='visa' primaryText='VISA'/>
          </SelectField>

          <SelectField value={i.category} onChange={this.categoryHandler} floatingLabelText="Category">
            <MenuItem value='dining' primaryText='Dining'/>
            <MenuItem value='entertainment' primaryText='Entertainment'/>
            <MenuItem value='groceries' primaryText='Groceries'/>
            <MenuItem value='household' primaryText='Household'/>
            <MenuItem value='pets' primaryText='Pets'/>
            <MenuItem value='purchases' primaryText='Purchases'/>
            <MenuItem value='services' primaryText='Services'/>
            <MenuItem value='transportation' primaryText='Transportation'/>
            <MenuItem value='travel' primaryText='Travel'/>
            <MenuItem value='misc' primaryText='Misc'/>
          </SelectField>

          <TextField id='amount' hintText='amount' onChange={this.updateInputState} value={i.amount} />
          <SelectField value={i.currency} onChange={this.currencyHandler} floatingLabelText="Currency">
            <MenuItem value='CAD' primaryText='CAD'/>
            <MenuItem value='USD' primaryText='USD'/>
            <MenuItem value='CNY' primaryText='RMB'/>
            <MenuItem value='HKD' primaryText='HKD'/>
          </SelectField>

          <TextField id='location' hintText='@location' onChange={this.updateInputState} value={i.location} />
          <TextField id='tags' hintText='#tags' id='tags' onChange={this.updateInputState} value={i.tags} />

          <DatePicker value={i.date} autoOk={true} onChange={this.dateHandler} />
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Cancel" onClick={this.onClickReset}/>
          <RaisedButton label="Add" primary={true} onClick={this.onClickSave}/>
        </CardActions>
      </Card>
    );
  }
}

export default EntryForm;
