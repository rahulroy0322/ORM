import Database from 'better-sqlite3';
import settings from '../settings';
import type { DatabaseAdapter } from './base.adapter';

const SQLiteAdapter = (): DatabaseAdapter => {
  let db: Database.Database | null = null;

  const getDb = () => {
    if (db) {
      return db;
    }
    db = new Database(settings.database.file);
    return db;
  };

  const connect = async () => {
    getDb();
  };

  const disconnect = async () => {
    if (db) {
      db.close();
    }
  };

  return {
    connect,
    disconnect,
  };
};

export { SQLiteAdapter };

// export class SQLiteAdapter implements DatabaseAdapter {
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
