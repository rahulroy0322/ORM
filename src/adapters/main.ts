import type { DatabaseAdapterType } from '../@types/adapter';
import type { DbConfigType } from '../@types/db.config';
import { MySqlAdapter } from './sql/mysql/main';
import { PostGreAdapter } from './sql/postgre';
import { SQLiteAdapter } from './sql/sqlite';

let activeAdapter: DatabaseAdapterType | null = null;

const getAdapter = (config: DbConfigType): DatabaseAdapterType => {
  switch (config.engine) {
    case 'sqlite':
      return SQLiteAdapter(config);
    case 'mysql':
      return MySqlAdapter(config);
    case 'postgre':
      return PostGreAdapter(config);
    default:
      // TODO! proper error!
      throw new Error();
  }
};

const getConnection = (config: DbConfigType): DatabaseAdapterType => {
  if (activeAdapter) return activeAdapter;

  const currentAdapter = getAdapter(config);

  activeAdapter = {
    ...currentAdapter,
    raw: (command: string) => {
      console.warn(`WARNING: row is where you take the full responsibility`, {
        command,
      });
      return currentAdapter.raw(command);
    },
  };

  return activeAdapter;
};

const db = getConnection({
  engine: 'sqlite',
  path: './db.sqlite',
});

export { db };
