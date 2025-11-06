import type { DatabaseAdapterType } from '../@types/adapter';
import { MySqlAdapter } from './sql/mysql/main';

let activeAdapter: DatabaseAdapterType | null = null;

const getConnection = (): DatabaseAdapterType => {
  if (activeAdapter) return activeAdapter;

  activeAdapter = MySqlAdapter();

  return activeAdapter;
};

const db = getConnection();

export { db };
