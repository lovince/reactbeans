import { combineReducers } from 'redux';
import { EntryReducer } from './EntryReducer';

const RootReducer = combineReducers({
  invite: EntryReducer
});

export default RootReducer;
