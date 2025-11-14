import type { DbConfigType } from './@types/db.config';

const env = process.env;

const SETTINGS = {
  db: {
    engine: 'mongo',
    db: env.DB as string,
    uri: env.MONGO_URI as string,
  },
} satisfies {
  db: DbConfigType;
};

export default SETTINGS;
