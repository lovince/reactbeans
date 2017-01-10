import ActionTypes from '../actions/actionTypes';

const defaultState = {
  lastdate: new Date(),
  entries: []
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
      const entries = state.entries.concat(action.entries);
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
