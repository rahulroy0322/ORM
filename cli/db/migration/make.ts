import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import type { OrmConfigType } from '../../../src/@types/orm.config';
import { info } from '../../logger';
import type { MigrationType } from '../../types';
import { cwd } from '../utils';
import { generate } from './generate';

const make = async (
  _models: MigrationType[],
  migrations: OrmConfigType['migrations'],
  migrationName?: string
) => {
  const SQL_DIR = path.relative(
    process.cwd(),
    path.join(cwd, migrations.dir, 'sql')
  );

  const models = [...new Set(_models)]
    .map(({ migration }) => migration?.())
    .filter((model) => model !== undefined);

  if (!existsSync(SQL_DIR)) {
    await mkdir(SQL_DIR, { recursive: true });
  }
  const migration = await generate(models, migrations, migrationName);

  if (!migration) {
    info(chalk.magentaBright`nothing to be migrate`);
    return;
  }

  info(
    `migrations created for ${chalk.magenta(migration.tables)} table${migration.tables > 1 ? 's' : ''}`
  );

  info(`"${migration.migration}" -> ${chalk.green`created`}`);
};

export { make };
