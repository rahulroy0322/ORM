import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { info } from '../../logger';
import type { CommandType } from '../../types';
import { cwd, isDev } from '../utils';
import { config, model } from './file';
import { write } from './operations';

const setup: CommandType = async () => {
  info('creating config...');
  await write(cwd, 'orm.config.ts', config(isDev));
  info('config created succesfully...');

  info('creating Model...');
  await mkdir(path.join(cwd, 'src'), {
    recursive: true,
  });
  await write(cwd, path.join('src', 'model.ts'), model(isDev));
  info('config Model succesfully...');

  console.log(chalk.green('Done.'));
};

export { setup };
