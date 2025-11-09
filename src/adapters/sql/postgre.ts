import type { Pool, PoolConfig } from 'pg';
import type { DatabaseAdapterType } from '../../@types/adapter';
import type { PostGreConfigType } from '../../@types/db.config';

const PostGreAdapter = (
  config: Omit<PostGreConfigType, 'engine'>
): DatabaseAdapterType => {
  let pool: Pool | null = null;

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
  };

  const disconnect: DatabaseAdapterType['disconnect'] = async () => {
    if (pool) {
      pool.end();
    }
    pool = null;
  };

  const run: DatabaseAdapterType['run'] = async (sql, params = undefined) => {
    if (!pool) {
      // TODO! proper error!
      throw new Error('please connect db first');
    }

    return (await pool.query(sql, params)).rows;
  };

  return {
    connect,
    disconnect,
    run,
  };
};

export { PostGreAdapter };
