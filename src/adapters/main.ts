import type { DatabaseAdapterType } from '../@types/adapter';
import type { DbConfigType } from '../@types/db.config';
import { MySqlAdapter } from './sql/mysql/main';
import { PostGreAdapter } from './sql/postgre';
import { SQLiteAdapter } from './sql/sqlite';

let activeAdapter: DatabaseAdapterType | null = null;

const getConnection = (config: DbConfigType): DatabaseAdapterType => {
  if (activeAdapter) return activeAdapter;

  switch (config.engine) {
    case 'sqlite':
      activeAdapter = SQLiteAdapter(config);
      break;
    case 'mysql':
      activeAdapter = MySqlAdapter(config);
      break;
    case 'postgre':
      activeAdapter = PostGreAdapter(config);
      break;
    default:
      // TODO! proper error!
      throw new Error();
  }

  return activeAdapter;
};

const db = getConnection({
  engine: 'sqlite',
  path: './db.sqlite',
});

export { db };
