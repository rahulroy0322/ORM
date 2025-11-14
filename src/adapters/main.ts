import type { DatabaseAdapterType } from '../@types/adapter';
import type { DbConfigType } from '../@types/db.config';
import SETTINGS from '../settings';
import { MongoAdapter } from './nosql/mongo';
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
    case 'mongo':
      return MongoAdapter(config);
    default:
      // TODO! proper error!
      throw new Error();
  }
};

const getConnection = (config: DbConfigType): DatabaseAdapterType => {
  if (!activeAdapter) {
    activeAdapter = getAdapter(config);
  }
  return activeAdapter;
};

const db = getConnection(SETTINGS.db);

export { db };
