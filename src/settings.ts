export default {
  database: {
    dialect: 'sqlite', // sqlite | mysql | postgres | mariadb | pglite | mongodb
    file: './db.sqlite',
    // host: 'localhost',
    // port: 5432,
    // user: 'admin',
    // password: 'secret',
    // database: 'test_db',
    // // optional for SQLite
    // filename: './dev.sqlite',
    // // optional flags
    // pool: {
    //   min: 1,
    //   max: 10
    // }
  },
} satisfies SettingsType;

type SettingsType = {
  database: {
    dialect: 'sqlite'; // sqlite | mysql | postgres | mariadb | pglite | mongodb
    file: string;
    // host: 'localhost',
    // port: 5432,
    // user: 'admin',
    // password: 'secret',
    // database: 'test_db',
    // // optional for SQLite
    // filename: './dev.sqlite',
    // // optional flags
    // pool: {
    //   min: 1,
    //   max: 10
    // }
  };
};
