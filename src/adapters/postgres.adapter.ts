// import { Pool } from 'pg';
// import settings from '../settings';
// import type { DatabaseAdapter } from './base.adapter';

// const PostgresAdapter = (): DatabaseAdapter => {
//   let db: Pool | null = null;

//   const getDb = () => {
//     if (db) {
//       return db;
//     }
//     db = new Pool({
//       // host: this.config.host,
//       // port: this.config.port,
//       // user: this.config.user,
//       // password: this.config.password,
//       // database: this.config.database,
//       // max: this.config.pool?.max || 10,
//     });
//     return db;
//   };

//   const connect = async () => {
//     getDb();
//   };

//   const disconnect = async () => {
//     if (db) {
//       db.end();
//     }
//   };

//   return {
//     connect,
//     disconnect,
//   };
// };

// // export class PostgresAdapter implements DatabaseAdapter {
// //   private pool!: Pool;

// //   constructor(private config: any) {}

// //   async connect() {
// //     this.pool = new Pool({
// //       host: this.config.host,
// //       port: this.config.port,
// //       user: this.config.user,
// //       password: this.config.password,
// //       database: this.config.database,
// //       max: this.config.pool?.max || 10
// //     });
// //   }

// //   async disconnect() {
// //     await this.pool.end();
// //   }

// //   async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
// //     const res = await this.pool.query(sql, params);
// //     return res.rows;
// //   }

// //   async transaction(fn: (trx: DatabaseAdapter) => Promise<any>) {
// //     const client = await this.pool.connect();
// //     try {
// //       await client.query('BEGIN');
// //       const trxAdapter = {
// //         ...this,
// //         query: (sql: string, params?: any[]) => client.query(sql, params).then(r => r.rows)
// //       };
// //       const result = await fn(trxAdapter);
// //       await client.query('COMMIT');
// //       return result;
// //     } catch (err) {
// //       await client.query('ROLLBACK');
// //       throw err;
// //     } finally {
// //       client.release();
// //     }
// //   }
// // }

// export { PostgresAdapter };
