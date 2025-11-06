type SQLiteConfigType = {
  engine: 'sqlite';
  path: string;
};

type MySQLConfigType = {
  engine: 'mysql';
} & (
  | {
      host: string;
      port?: number;
      user: string;
      password: string;
      database: string;
    }
  | {
      url: string;
    }
);

type PostGreConfigType = {
  engine: 'postgre';
  database: string;
  host: string;
  port?: number;
  user: string;
  password: string;
};

type DbConfigType = SQLiteConfigType | MySQLConfigType | PostGreConfigType;

export type {
  SQLiteConfigType,
  DbConfigType,
  PostGreConfigType,
  MySQLConfigType,
};
