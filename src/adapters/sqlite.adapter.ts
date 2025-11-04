import type Database from 'better-sqlite3';
import type { DatabaseAdapterType } from '../@types/adapter';
import type { SQLiteConfigType } from '../@types/db.config';

const SQLiteAdapter = (): DatabaseAdapterType => {
  let db: Database.Database | null = null;

  const connect: DatabaseAdapterType['connect'] = async (
    config: SQLiteConfigType
  ) => {
    if (db) {
      return;
    }
    const Database = (await import('better-sqlite3')).default;

    db = new Database(config.fileName);
    db.pragma('foreign_keys = ON');
    return;
  };

  const disconnect: DatabaseAdapterType['disconnect'] = async () => {
    if (db) {
      db.close();
    }
    db = null;
  };

  return {
    connect,
    disconnect,
  };
};

export { SQLiteAdapter };

// export class SQLiteAdapter implements DatabaseAdapterType {
//   private db!: Database;

//   constructor(private config: any) {}

//   async disconnect() {
//     await this.db.close();
//   }

//   async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
//     return this.db.all<T>(sql, params);
//   }

//   async migrate(sql: string) {
//     await this.db.exec(sql);
//   }
// }
