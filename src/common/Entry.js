import database from './firedb';

const entriesRef = '/data/entries';
const tagsRef = '/data/entryTags';

class Entry {
  constructor(date, account, amount, currency, category, location, tags) {
    this.date = date ? new Date(date) : new Date();
    this.account = account ? account.trim() : 'cash';
    this.amount = amount ? amount : 0;
    this.currency = currency ? currency.trim() : 'usd';
    this.category = category ? category.trim() : "";
    this.location = location ? location.trim() : "";
    this.tags = tags ? tags.replace(/#|\.|\$|\/|\\|\[|\]/gi,'_').trim() : "";

    this.save();
  }

  save() {
    // build entryData
    var entryData = {
      account: this.account,
      amount: this.amount,
      currency: this.currency,
      category: this.category,
      location: this.location,
      date: this.date
    }
    // build tagsData
    var tagsData = {};
    this.tags.split(' ').map(tag => {
      if (tag.length == 0) {
        // console.log('empty string');
      } else {
        tagsData[tag] = true;
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
}

module.exports = Entry;
