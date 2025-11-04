import type { DbConfigType } from './db.config';

type DatabaseAdapterType = {
  connect(config: DbConfigType): Promise<void>;
  disconnect(): Promise<void>;
  // query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  // transaction?(fn: (trx: DatabaseAdapter) => Promise<any>): Promise<any>;
  // raw?(command: string): Promise<any>;
  // migrate?(sql: string): Promise<void>;
};

export type { DatabaseAdapterType };
