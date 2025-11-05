import type { DatabaseAdapterType } from '../@types/adapter';
import { SQLiteAdapter } from './sql/sqlite';

let activeAdapter: DatabaseAdapterType | null = null;

const getConnection = (): DatabaseAdapterType => {
  if (activeAdapter) return activeAdapter;

  activeAdapter = SQLiteAdapter();

  return activeAdapter;
};

const db = getConnection();

export { db };
