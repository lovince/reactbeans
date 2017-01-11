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
    case ActionTypes.AddEntryRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.AddEntryRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in adding entry.',
      });
    }
    case ActionTypes.AddEntryFulfilled: {
      const entries = state.entries.concat([action.entry]).sort(compareEntries);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added entry.',
        entries: entries
      });
      return newState;
    }
    case ActionTypes.RemoveEntryRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.RemoveEntryRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in removing entry.',
      });
    }
    case ActionTypes.RemoveEntryFulfilled: {
      var i = 0;
      for (i=0; i<state.entries.length; i++) {
        if (state.entries[i].key == action.key) {
          break
        }
      }
      console.log("i="+i);
      var a1 = []
      var a2 = [];
      if (i-1 > 0) {
        a1 = state.entries.slice(0,i);
      }
      if (i+1 < state.entries.length) {
        a2 = state.entries.slice(i+1,state.entries.length);
      }
      const entries = a1.concat(a2);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Removed entry.',
        entries: entries
      });
      return newState;
    }
    default:
      return state;
  }
}
