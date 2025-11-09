import type { Pool } from 'mysql2/promise';
import type { DatabaseAdapterType } from '../../../@types/adapter';
import type { MySQLConfigType } from '../../../@types/db.config';
import { query } from './query';

const MySqlAdapter = (
  config: Omit<MySQLConfigType, 'engine'>
): DatabaseAdapterType => {
  let pool: Pool | null = null;

  const connect: DatabaseAdapterType['connect'] = async () => {
    if (pool) {
      return;
    }
    const { createPool } = await import('mysql2/promise');

    if ('url' in config) {
      pool = createPool(config.url as string);
    } else {
      pool = createPool({
        ...config,
        waitForConnections: true,
        connectionLimit: 10,
      });
    }
  };

  const disconnect: DatabaseAdapterType['disconnect'] = async () => {
    if (pool) {
      await pool.end();
    }
    pool = null;
  };

  // biome-ignore lint/style/noNonNullAssertion: it will be there
  const exec = (sql: string, values: unknown[]) => pool!.query(sql, values);

  const run: DatabaseAdapterType['run'] = async (
    sql,
    params = [],
    internal = false
  ) => {
    if (!pool) {
      // TODO! proper error!
      throw new Error('please connect db first');
    }
    sql = sql.replace(/\$\d+/gi, '?');

    if (internal) {
      return await pool.execute(sql, params);
    }

    const queryData = query(sql, params as string[]);

    if (!queryData) {
      throw new Error(`invalid sql format!`);
    }

    const {
      queries: [firstQuery, secondQuery],
      invert,
    } = queryData;

    if (invert) {
      if (secondQuery) {
        const secondReturn = await exec(secondQuery.sql, secondQuery.values);

        await exec(firstQuery.sql, firstQuery.values);

        return secondReturn;
      }
      const error = new Error('some thing went wrong in invert query!');

      (error as any).metaData = queryData;

      throw error;
    }

    const firstReturn = await exec(firstQuery.sql, firstQuery.values);

    if (!secondQuery) {
      return firstReturn;
    }

    return await exec(secondQuery.sql, secondQuery.values);
  };

  const raw: DatabaseAdapterType['raw'] = (command) =>
    (pool as Pool).execute(command);

  return {
    connect,
    disconnect,
    run,
    raw,
  };
};

export { MySqlAdapter };
