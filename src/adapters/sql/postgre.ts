import type { Pool, PoolConfig } from 'pg';
import type { DatabaseAdapterType } from '../../@types/adapter';
import type { PostGreConfigType } from '../../@types/db.config';
import { SQLBuilder } from './builder';

const PostGreAdapter = (
  config: Omit<PostGreConfigType, 'engine'>
): DatabaseAdapterType => {
  let pool: Pool | null = null;
  const builder = SQLBuilder();

  const connect: DatabaseAdapterType['connect'] = async () => {
    if (pool) {
      return;
    }

    const { Pool } = await import('pg');

    if ('url' in config) {
      (config as PoolConfig) = {
        connectionString: config.url as string,
      };
    }

    (config as PoolConfig).max = 10;

    pool = new Pool(config as PoolConfig);
    await pool.connect();
  };

  const disconnect: DatabaseAdapterType['disconnect'] = async () => {
    if (pool) {
      pool.end();
    }
    pool = null;
  };

  const run = async (
    sql: string,
    params: unknown[] | undefined = undefined
  ) => {
    if (!pool) {
      // TODO! proper error!
      throw new Error('please connect db first');
    }

    if (params?.length) {
      params = params?.map((value) =>
        typeof value === 'boolean' ? (value ? '1' : '0') : value
      );
    }

    return (await pool.query(sql, params)).rows;
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

  const raw: DatabaseAdapterType['raw'] = pool;

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

export { PostGreAdapter };
