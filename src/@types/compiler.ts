import type { FilterModelType } from './filter';
import { OptionsModelType } from './options';
import type { SchemaType } from './utils';

type DatabaseCompiler = {
  columns(obj: Record<string, unknown>): string;

  filter<S extends SchemaType>(
    where: Partial<FilterModelType<S>>,
    params?: unknown[]
  ): [string, string[]];

  select(fields?: Record<string, boolean>): string;

  values(data: Record<string, unknown>[]): [string[][], unknown[]];

  options(
    whereParamsLength: number,
    options: OptionsModelType<SchemaType>
  ): [string, unknown[]];

  update(data: Record<string, unknown>): [string, unknown[]];
};

export type { DatabaseCompiler };
