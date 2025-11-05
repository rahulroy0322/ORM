type SQLiteConfigType = {
  database: 'sqlite';
  path: string;
};

type MySQLConfigType = {
  database: 'mysql';
} & (
  | {
      host: string;
      port?: number;
      user: string;
      password: string;
    }
  | {
      url: string;
    }
);

type PostGreConfigType = {
  database: 'postgre';
  host: string;
  port?: number;
  user: string;
  password: string;
};

type DbConfigType = SQLiteConfigType | MySQLConfigType;

export type { SQLiteConfigType, DbConfigType ,PostGreConfigType};
