import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import type { EnumSchemaType } from '../../../src/@types/schema';
import type {
  ColumnSchemaType,
  IndexSchemaType,
  MigrationType,
  StateType,
  TableSchemaType,
} from '../../types';

const loadManeger = async (MANEGER_FILE: string): Promise<StateType> => {
  if (existsSync(MANEGER_FILE)) {
    const content = await readFile(MANEGER_FILE);
    return JSON.parse(content.toString()) as StateType;
  }
  return {
    at: 0,
    tables: [],
    migrations: [],
  } satisfies StateType;
};

const getNewState = (
  models: ReturnType<Required<MigrationType>['migration']>[],
  migrations: string[],
  name?: string
): StateType => {
  const tables = models.map(({ schema, table }) =>
    Object.entries(schema as Record<string, EnumSchemaType<unknown>>).reduce(
      (acc, [key, { type, unique, required, default: d, values }]) => {
        acc.columns.push({
          type,
          key,
          default: d,
          required,
          values,
        });

        if (unique || type === 'pk') {
          acc.indexes.push({
            key,
            name: `idx-${table}:${key}`,
            unique: true,
            pk: type === 'pk',
          });
        }

        return acc;
      },
      {
        table,
        columns: [] as ColumnSchemaType[],
        indexes: [] as IndexSchemaType[],
      } satisfies TableSchemaType
    )
  );

  const at = Date.now();

  if (!name) {
    name = at.toString();
  }

  migrations.push(name);

  return {
    tables,
    at,
    migrations,
  } satisfies StateType;
};

export { loadManeger, getNewState };
