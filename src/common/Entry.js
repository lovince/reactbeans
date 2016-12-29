import database from './firedb';

const entriesRef = '/data/entries';
const tagsRef = '/data/entryTags';

var newEntry = function(date, account, amount, currency, category, location, tags) {
  var entryData = {
    account: account,
    amount: amount,
    currency: currency,
    category: category,
    location: location,
    date: date
  }

  // build tagsData
  var tagsData = {};
  tags.split(' ').map(tag => {
    var t = tag.replace('#','');
    t = t.replace('$','_');
    t = t.replace('.','_');
    t = t.replace('/','_');
    t = t.replace('[','_');
    t = t.replace(']','_');
    if (t.length == 0) {
      // console.log('empty string');
    } else {
      tagsData[t] = true;
    }
  });

  // Get a key for a new Entry
  var newEntryKey = database.ref(entriesRef).push().key;

  // Write the new Entry data simultaneously in the entries list and the entryTags list
  var updates = {};
  updates[entriesRef + '/' + newEntryKey] = entryData;

  if (tagsData) {
    updates[tagsRef + '/' + newEntryKey] = tagsData;
  }

  return firebase.database().ref().update(updates);
}

module.exports = {
  newEntry
}
