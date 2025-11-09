import type Database from 'better-sqlite3';
import type { DatabaseAdapterType } from '../../@types/adapter';
import type { SQLiteConfigType } from '../../@types/db.config';

const SQLiteAdapter = (
  config: Omit<SQLiteConfigType, 'engine'>
): DatabaseAdapterType => {
  let db: Database.Database | null = null;

  const connect: DatabaseAdapterType['connect'] = async () => {
    if (db) {
      return;
    }
    const Database = (await import('better-sqlite3')).default;

    db = new Database(config.path);
    db.pragma('foreign_keys = ON');
  };

  const disconnect: DatabaseAdapterType['disconnect'] = async () => {
    if (db) {
      db.close();
    }
    db = null;
  };

  // @ts-expect-error
  const run: DatabaseAdapterType['run'] = (
    sql,
    params = undefined,
    exec = false
  ) => {
    if (!db) {
      // TODO! proper error!
      throw new Error('please connect db first');
    }

    sql = sql.replace(/\$\d+/gi, '?');

    if (exec) {
      return db.exec(sql);
    }
    
    return db.prepare(sql).all(params);
  };

  const raw: DatabaseAdapterType['raw'] = async (command) =>
    (db as any).exec(command);

  return {
    connect,
    disconnect,
    run,
    raw,
  };
};

export { SQLiteAdapter };
