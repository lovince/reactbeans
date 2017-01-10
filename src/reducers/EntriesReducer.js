import ActionTypes from '../actions/actionTypes';
import Entry from '../common/Entry';

const defaultState = {
  lastdate: new Date(),
  entries: []
}

function _sortEntries(a,b) {
  return -Entry.compareByDate(a, b)
}

export function EntriesReducer(state = defaultState, action) {
  switch(action.type) {
    case ActionTypes.GetEntriesRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.GetEntriesRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting entries list.',
      });
    }
    case ActionTypes.GetEntriesFulfilled: {
      const entries = state.entries.concat(action.entries).sort(_sortEntries);
      const lastdate = action.lastdate;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got entries list.',
        entries: entries,
        lastdate: lastdate
      });
      return newState;
    }
    default:
      return state;
  }
}
