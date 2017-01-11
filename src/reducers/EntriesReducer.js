import ActionTypes from '../actions/actionTypes';
import Entry from '../common/Entry';

const defaultState = {
  lastdate: new Date(),
  entries: []
}

function compareEntries(a,b) {
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
      const entries = state.entries.concat(action.entries).sort(compareEntries);
      const lastdate = action.lastdate;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got entries list.',
        entries: entries,
        lastdate: lastdate
      });
      return newState;
    }
    case ActionTypes.AddEntryFulfilled: {
      // var entries = state.entries || [];
      // entries.push(action.entry);
      // entries.sort(compareEntries);
      const entries = state.entries.concat([action.entry]).sort(compareEntries);

      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added entry.',
        entries: entries
      });
      return newState;
    }
    default:
      return state;
  }
}
