import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Transaction } from './models/Transaction';

type Data = {
  transactions: Transaction[];
};

const adapter = new FileSync<Data>('db.json');
const db = low(adapter);

// Set default structure
db.defaults({ transactions: [] }).write();

export { db };
