import type { Prettify, SchemaType } from './utils';

type OptionsModelType<S extends SchemaType> = Prettify<
  Partial<{
    limit: number;
    skip: number;
    orderBy: Partial<Record<keyof S, 'ASC' | 'DESC'>>;
  }>
>;

export type { OptionsModelType };
