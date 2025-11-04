type SQLiteConfigType = {
  database: 'sqlite';
  fileName: string;
};

type MySQLConfigType =
  | ({
      database: 'mysql';
    } & {
      host: string;
      port?: number;
      user: string;
      password: string;
    })
  | {
      url: string;
    };

type DbConfigType = SQLiteConfigType | MySQLConfigType;

export type { SQLiteConfigType, DbConfigType };
