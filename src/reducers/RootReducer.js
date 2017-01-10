import { combineReducers } from 'redux';
import { EntriesReducer } from './EntriesReducer';

const RootReducer = combineReducers({
  entriesState: EntriesReducer
});

export default RootReducer;
