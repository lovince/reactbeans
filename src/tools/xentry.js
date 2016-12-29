import database from './firedb';
import { newEntry } from '../common/Entry';

database.ref('/data/xentries').on('child_added', snap => {
  const e = snap.val();

  const date = e.date ? new Date(e.date.iso) : new Date();
  const account = e.account ? e.account.trim() : 'cash';
  const amount = e.amount ? e.amount : 0;
  const currency = e.currency ? e.currency.trim() : 'NA';
  const category = e.category ? e.category.trim() : "";
  const location = e.location ? e.location.trim() : "";
  const tags = e.tags ? e.tags.trim() : "";
  newEntry(date, account, amount, currency, category, location, tags);
});
