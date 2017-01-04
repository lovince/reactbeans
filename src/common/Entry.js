import firedb from './firedb';

class Entry {
  constructor(date, account, amount, currency, category, location, tags) {
    this.date = date ? new Date(date) : new Date();
    this.account = account ? account.trim() : 'cash';
    this.amount = amount ? amount : 0;
    this.currency = currency ? currency.trim() : 'usd';
    this.category = category ? category.trim() : "";
    this.location = location ? location.trim() : "";
    this.tags = tags ? tags.replace(/#|\.|\$|\/|\\|\[|\]/gi,'_').trim() : "";
  }

  static compareByDate(a,b) {
    let ad = new Date(a.date);
    let bd = new Date(b.date);
    if (ad < bd) {
      return -1;
    }
    if (ad > bd) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  static remove(key) {
    firedb.db.ref(firedb.entriesLoc + '/' + key).remove();
    firedb.db.ref(firedb.tagsLoc + '/' + key).remove();
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
    var newEntryKey = firedb.db.ref(firedb.entriesLoc).push().key;

    // Write the new Entry data simultaneously in the entries list and the entryTags list
    var updates = {};
    updates[firedb.entriesLoc + '/' + newEntryKey] = entryData;
    if (tagsData) {
      updates[firedb.tagsLoc + '/' + newEntryKey] = tagsData;
    }

    // Keep a local copy of the Entry key
    this.key = newEntryKey;

    return firedb.db.ref().update(updates);
  }

  delete() {
    if (this.key) {
      Entry.remove(this.key);
      this.key = null;
    }
  }
}

module.exports = Entry;
