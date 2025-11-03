// // src/orm/connection.ts
// import settings from "./settings";
// import { SQLiteAdapter } from "./adapters/sqlite";
// import { PostgresAdapter } from "./adapters/postgres";
// import { MongoAdapter } from "./adapters/mongodb";
// // Add other imports (MySQL, MariaDB, etc.)

import type { DatabaseAdapter } from './adapters/base.adapter';
import { SQLiteAdapter } from './adapters/sqlite.adapter';

// let activeAdapter: any = null;

// export async function getConnection() {
// 	if (activeAdapter) return activeAdapter;

// 	const { dialect } = settings.database;
// 	switch (dialect) {
// 		case "sqlite":
// 			activeAdapter = new SQLiteAdapter(settings.database);
// 			break;
// 		case "postgres":
// 			activeAdapter = new PostgresAdapter(settings.database);
// 			break;
// 		case "mysql":
// 			const { MySQLAdapter } = await import("./adapters/mysql");
// 			activeAdapter = new MySQLAdapter(settings.database);
// 			break;
// 		case "mariadb":
// 			const { MariaDBAdapter } = await import("./adapters/mariadb");
// 			activeAdapter = new MariaDBAdapter(settings.database);
// 			break;
// 		case "pglite":
// 			const { PGLiteAdapter } = await import("./adapters/pglite");
// 			activeAdapter = new PGLiteAdapter(settings.database);
// 			break;
// 		case "mongodb":
// 			activeAdapter = new MongoAdapter(settings.database);
// 			break;
// 		default:
// 			throw new Error(`❌ Unsupported dialect: ${dialect}`);
// 	}

// 	await activeAdapter.connect();
// 	return activeAdapter;
// }

let activeAdapter: DatabaseAdapter | null = null;

const getConnection = (): DatabaseAdapter => {
  if (activeAdapter) return activeAdapter;

  activeAdapter = SQLiteAdapter();

  return activeAdapter;
};

const db = getConnection();

export { db };
