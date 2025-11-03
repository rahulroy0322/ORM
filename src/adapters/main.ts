import type { DatabaseAdapter } from './base.adapter';
import { SQLiteAdapter } from './sqlite.adapter';

let activeAdapter: DatabaseAdapter | null = null;
const getAdapter = () => {
  if (activeAdapter) return activeAdapter;

  activeAdapter = SQLiteAdapter();

  return activeAdapter;
};

export { getAdapter };
