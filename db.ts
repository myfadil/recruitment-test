import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

async function init(): Promise<Database> {
  return open({
    filename: './test.db',
    driver: sqlite3.Database,
  });
}

export default init;
