type DatabaseAdapterType = {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  run(sql: string, params?: unknown[]): Promise<unknown[]>;
  // query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  // transaction?(fn: (trx: DatabaseAdapter) => Promise<any>): Promise<any>;
  // raw?(command: string): Promise<any>;
  // migrate?(sql: string): Promise<void>;
};

export type { DatabaseAdapterType };
