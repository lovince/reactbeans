import ActionTypes from './actionTypes';
import db from '../database.js';
import U from '../common/utils';

import Entry from '../common/Entry';

export function getEntries(lastDate) {
  return dispatch => {
    dispatch(getEntriesRequestedAction());

    const end = lastDate || new Date();
    const start = U.daysAgo(14,end);

    const ref = db.firebase.ref(db.entriesLoc).orderByChild('date').startAt(start.toISOString()).endAt(end.toISOString());
    return ref.once('value', snap => {
      const entries = snap.val() || {};
      dispatch(getEntriesFulfilledAction(entries, start))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getEntriesRejectedAction());
    });
  }
}

function getEntriesRequestedAction() {
  return {
    type: ActionTypes.GetEntriesRequested
  };
}

function getEntriesRejectedAction() {
  return {
    type: ActionTypes.GetEntriesRejected
  }
}

function getEntriesFulfilledAction(entries, lastdate) {
  const keys = Object.keys(entries);
  var a = [];
  for (var i=0; i<keys.length; i++) {
    const k = keys[i];
    entries[k].key = k;
    a.push(entries[k]);
  }

  return {
    type: ActionTypes.GetEntriesFulfilled,
    entries: a,
    lastdate: lastdate
  };
}

export function addEntry(entry) {
  return dispatch => {
    dispatch(addEntryRequestedAction());
    entry.save()
    .then(() => {
      dispatch(addEntryFulfilledAction(entry));
    })
    .catch((error) => {
      dispatch(addEntryRejectedAction());
    });
  }
}

function addEntryRequestedAction() {
  return {
    type: ActionTypes.AddEntryRequested
  };
}

function addEntryRejectedAction() {
  return {
    type: ActionTypes.AddEntryRejected
  }
}

function addEntryFulfilledAction(entry) {
  return {
    type: ActionTypes.AddEntryFulfilled,
    entry
  };
}

export function removeEntry(key) {
  return dispatch => {
    dispatch(removeEntryRequestedAction());
    Entry.remove(key)
    .then(() => {
      dispatch(removeEntryFulfilledAction(key));
    })
    .catch((error) => {
      dispatch(removeEntryRejectedAction());
    });
  }
}

function removeEntryRequestedAction() {
  return {
    type: ActionTypes.RemoveEntryRequested
  };
}

function removeEntryRejectedAction() {
  return {
    type: ActionTypes.RemoveEntryRejected
  }
}

function removeEntryFulfilledAction(key) {
  return {
    type: ActionTypes.RemoveEntryFulfilled,
    key: key
  };
}
