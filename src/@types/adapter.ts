import type { InferSchemaModelType } from './field';
import type { FilterModelType } from './filter';
import type { CreateInputType } from './input';
import type { OptionsModelType } from './options';
import type { ProjectionType } from './projection';
import type { SchemaType, WithId } from './utils';

type DatabaseAdapterType = {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  // run(sql: string, params?: unknown[]): Promise<unknown[]>;
  // query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  // transaction?(fn: (trx: DatabaseAdapter) => Promise<any>): Promise<any>;
  // raw(command: string): Promise<any>;
  // migrate?(sql: string): Promise<void>;

  raw: unknown;

  find: <T extends SchemaType>(
    table: string,
    filter: FilterModelType<SchemaType>,
    projection?: ProjectionType<SchemaType>,
    options?: OptionsModelType<SchemaType>
  ) => Promise<WithId<T>[]>;

  create: <T extends SchemaType>(
    table: string,
    data: CreateInputType<SchemaType>[],
    projection?: ProjectionType<SchemaType>
  ) => Promise<WithId<T>[]>;

  update: <T extends SchemaType>(
    table: string,
    filter: FilterModelType<SchemaType>,
    data: Partial<InferSchemaModelType<SchemaType>>,
    projection?: ProjectionType<SchemaType>,
    options?: OptionsModelType<SchemaType>
  ) => Promise<WithId<T>[]>;

  destroy: <T extends SchemaType>(
    table: string,
    filter: FilterModelType<SchemaType>,
    options?: OptionsModelType<SchemaType>
  ) => Promise<WithId<T>[]>;
};

export type { DatabaseAdapterType };
