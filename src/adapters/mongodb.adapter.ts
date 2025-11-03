// import type Database from 'better-sqlite3';
// import settings from '../settings';
// import type { DatabaseAdapter } from './base.adapter';

// const SQLiteAdapter = (): DatabaseAdapter => {
//   const db: Database.Database | null = null;

//   const getDb = () => {
//     if (db) {
//       return db;
//     }
//     // 	db = this.client = new MongoClient(this.config.uri || `mongodb://${this.config.host}:${this.config.port}`);
//     // await this.client.connect();
//     // this.db = this.client.db(this.config.database);
//     return db;
//   };

//   const connect = async () => {
//     getDb();
//   };

//   const disconnect = async () => {
//     if (db) {
//       // db.close();
//     }
//   };

//   return {
//     connect,
//     disconnect,
//   };
// };

// export { SQLiteAdapter };
// // // src/orm/adapters/mongodb.ts
// // import { MongoClient, Db } from 'mongodb';
// // import { DatabaseAdapter } from './base';

// // export class MongoAdapter implements DatabaseAdapter {
// //   private client!: MongoClient;
// //   private db!: Db;

// //   constructor(private config: any) {}

// //   async connect() {
// //     this.client = new MongoClient(this.config.uri || `mongodb://${this.config.host}:${this.config.port}`);
// //     await this.client.connect();
// //     this.db = this.client.db(this.config.database);
// //   }

// //   async disconnect() {
// //     await this.client.close();
// //   }

// //   async query(collectionName: string, filter: any = {}): Promise<any[]> {
// //     return this.db.collection(collectionName).find(filter).toArray();
// //   }

// //   async raw(command: string) {
// //     return this.db.command(JSON.parse(command));
// //   }
// // }
