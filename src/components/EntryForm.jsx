import React from 'react';

import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';

import S from '../styles/styles.js';
import Entry from '../common/Entry.js';

const defaultInputs = {
  account:'cash',
  amount:'',
  currency:'CAD',
  category:'dining',
  location:'',
  date:new Date().toISOString().split('T')[0],
  tags:''
}

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: Object.assign({},defaultInputs)
    };
    this.updateInputState = this.updateInputState.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  updateInputState(e) {
    let key = e.currentTarget.id;
    let val = e.currentTarget.value;
    var newInputs = this.state.inputs;
    newInputs[key] = val;
    this.setState({inputs:newInputs});
  }

  onClickSave() {
    let i = this.state.inputs;
    let e = new Entry(i.date, i.account, i.amount, i.currency, i.category, i.location, i.tags);
    // e.save();
    this.props.onAdd(e);
    this.setState({inputs:Object.assign({},defaultInputs)});
  }

  render() {
    let i = this.state.inputs;
    return (
      <Card style={S.form}>
        <CardTitle>New Entry</CardTitle>
        <select style={S.M(S.input,S.w25)} value={i.account} id='account' onChange={this.updateInputState}>
          <option value="cash">Cash</option>
          <option value="master">Master</option>
          <option value="master (cn)">Master (CN)</option>
          <option value="visa">VISA</option>
        </select>
        <select style={S.M(S.input,S.w50)} value={i.category} id='category' onChange={this.updateInputState}>
          <option value="dining">Dining</option>
          <option value="entertainment">Entertainment</option>
          <option value="groceries">Groceries</option>
          <option value="pets">Pets</option>
          <option value="purchases">Purchases</option>
          <option value="services">Services</option>
          <option value="transportation">Transportation</option>
          <option value="misc">Misc</option>
        </select>
        <input style={S.M(S.input,S.w75)} placeholder='amount' id='amount' onChange={this.updateInputState} value={i.amount} />
        <select style={S.select} value={i.currency} id='currency' onChange={this.updateInputState}>
          <option value="CAD">CAD</option>
          <option value="USD">USD</option>
          <option value="CNY">RMB</option>
          <option value="HKD">HKD</option>
        </select>
        <input style={S.M(S.input,S.w90)} placeholder='location' id='location' onChange={this.updateInputState} value={i.location} />
        <input style={S.M(S.input,S.w90)} placeholder='tags' id='tags' onChange={this.updateInputState} value={i.tags} />
        <input style={S.M(S.input,S.w90)} type='date' placeholder='date' id='date' onChange={this.updateInputState} value={i.date} />
        <FlatButton label="Save" primary={true} onClick={this.onClickSave}/>
      </Card>
    );
  }
}

export default EntryForm;
