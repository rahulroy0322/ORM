import type { Database } from 'better-sqlite3';
import type { DatabaseAdapterType } from '../../@types/adapter';
import type { SQLiteConfigType } from '../../@types/db.config';
import { SQLBuilder } from './builder';

const SQLiteAdapter = (
  config: Omit<SQLiteConfigType, 'engine'>
): DatabaseAdapterType => {
  let db: Database | null = null;
  const builder = SQLBuilder();

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

  const run = (
    sql: string,
    params: unknown[] | undefined = undefined,
    exec = false
  ): unknown[] => {
    if (!db) {
      // TODO! proper error!
      throw new Error('please connect db first');
    }
    sql = sql.replace(/\$\d+/gi, '?');
    if (exec) {
      // @ts-expect-error this is just for migrate
      return db.exec(sql);
    }

    return db.prepare(sql).all(params);
  };

  const find: DatabaseAdapterType['find'] = async (
    table,
    filter,
    projection = {},
    options
  ) => {
    const [sql, params] = builder.find(table, filter, projection, options);

    return run(sql, params) as any;
  };

  const create: DatabaseAdapterType['create'] = async (
    table,
    data,
    projection = {}
  ) => {
    const [sql, params] = builder.create(table, data, projection);

    return run(sql, params) as any;
  };

  const update: DatabaseAdapterType['update'] = async (
    table,
    filter,
    data,
    projection
    // TODO!
    // options
  ) => {
    const [sql, params] = builder.update(
      table,
      filter,
      data,
      projection
      // options
    );

    return run(sql, params) as any;
  };

  const destroy: DatabaseAdapterType['destroy'] = async (
    table,
    filter,
    options
  ) => {
    const [sql, params] = builder.destroy(table, filter, options);

    return run(sql, params) as any;
  };

  const raw = db;

  return {
    connect,
    disconnect,
    create,
    update,
    destroy,
    find,
    raw,
  };
};

export { SQLiteAdapter };
