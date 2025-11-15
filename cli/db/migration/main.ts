import path from 'node:path';
import type { OrmConfigType } from '../../../src/@types/orm.config';
import type { CommandType } from '../../types';
import { cwd } from '../utils';
import { make } from './make';

const migration: CommandType = async () => {
  const { models, migrations } = (
    await import(
      path.join(
        cwd,
        // TODO! centralized
        'orm.config.ts'
      )
    )
  ).default as OrmConfigType;

  await make(models, migrations);
};

export { migration };
