#! /usr/bin/env node
import { migration } from './db/migration/main';
import { setup } from './db/setup/main';
import { help } from './help';
import { error } from './logger';
import type { CommandType } from './types';

const commands = {
  help,
  'db:migration': migration,
  'db:setup': setup,
} as unknown as Record<string, CommandType>;

const processCommand = async (args: string[]) => {
  // const options = args.slice(3);

  const command = args[2] as keyof typeof commands;

  if (!(command in commands)) {
    error(`Unknown Command "${command}"`);
    help();
    process.exit(1);
  }

  await commands[command]?.();
};

const main = async () => {
  const args = process.argv;

  if (args.length === 2) {
    args.push('help');
  }

  try {
    return await processCommand(args);
  } catch (e) {
    return error((e as Error).message);
  }
};

main().finally(() => {
  process.exit(0);
});
