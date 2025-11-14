import type { FilterModelType } from '../filter';
import type { SchemaType } from '../utils';

type DatabaseCompiler = {
  filter<S extends SchemaType>(
    where: Partial<FilterModelType<S>>,
    params?: unknown[]
  ): Partial<FilterModelType<S>>;
};

export type { DatabaseCompiler };
