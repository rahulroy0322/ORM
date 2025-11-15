import type { DbConfigType } from './db.config';
import type { ModelType } from './main';

type OrmConfigType = DbConfigType & {
  models: ReturnType<ModelType>[];
  migrations: {
    dir: string;
  };
};

export type { OrmConfigType };
