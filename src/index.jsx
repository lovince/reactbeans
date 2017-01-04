import React from 'react';
import { render } from 'react-dom';

import firedb from './common/firedb';

import Entry from './common/Entry';
import EntriesListComponent from './components/EntriesListComponent.jsx';

const defaultInputs = {
  account:'cash',
  amount:0,
  currency:'CAD',
  category:'dining',
  location:'',
  date:new Date().toISOString().split('T')[0],
  tags:''
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: Object.assign({},defaultInputs)
    };
    this.updateInputState = this.updateInputState.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  componentDidMount() {
    // firedb.db.ref('/data/xentries').orderByChild('date').on('child_added', snap => {
    //   // console.log(snap.val());
    //   firedb.db.ref('/data/entries').push(snap.val());
    // });

    // let e = new Entry();
    // e.save();
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
    e.save();
    this.setState({inputs:Object.assign({},defaultInputs)});
  }

  render () {
    let i = this.state.inputs;
    return (
      <div>
        <div>
          <select value={i.account} id='account' onChange={this.updateInputState}>
            <option value="cash">Cash</option>
            <option value="master">Master</option>
            <option value="master (cn)">Master (CN)</option>
            <option value="visa">VISA</option>
          </select>
          <input placeholder='amount' id='amount' onChange={this.updateInputState} value={i.amount} />
          <select value={i.currency} id='currency' onChange={this.updateInputState}>
            <option value="CAD">CAD</option>
            <option value="USD">USD</option>
            <option value="CNY">RMB</option>
            <option value="HKD">HKD</option>
          </select>
          <select value={i.category} id='category' onChange={this.updateInputState}>
            <option value="dining">Dining</option>
            <option value="entertainment">Entertainment</option>
            <option value="groceries">Groceries</option>
            <option value="pets">Pets</option>
            <option value="purchases">Purchases</option>
            <option value="services">Services</option>
            <option value="transportation">Transportation</option>
            <option value="misc">Misc</option>
          </select>
          <input placeholder='location' id='location' onChange={this.updateInputState} value={i.location} />
          <input placeholder='tags' id='tags' onChange={this.updateInputState} value={i.tags} />
          <input type='date' placeholder='date' id='date' onChange={this.updateInputState} value={i.date} />
          <button onClick={this.onClickSave}>Save</button>
        </div>
        <EntriesListComponent />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
