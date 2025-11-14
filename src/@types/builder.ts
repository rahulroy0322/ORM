import type { InferSchemaModelType } from './field';
import type { FilterModelType } from './filter';
import type { CreateInputType } from './input';
import type { OptionsModelType } from './options';
import type { ProjectionType } from './projection';
import type { SchemaType } from './utils';

type BuilderType = {
  create<P extends ProjectionType<SchemaType> | undefined = undefined>(
    table: string,
    data: CreateInputType<SchemaType>[],
    projection?: P
  ): [string, unknown[]];

  find<P extends ProjectionType<SchemaType> | undefined = undefined>(
    table: string,
    filter: FilterModelType<SchemaType>,
    projection?: P,
    options?: OptionsModelType<SchemaType>
  ): [string, unknown[]];

  update<P extends ProjectionType<SchemaType> | undefined = undefined>(
    table: string,
    filter: FilterModelType<SchemaType>,
    data: Partial<InferSchemaModelType<SchemaType>>,
    projection?: P
    // options?: OptionsModelType<S>
  ): [string, unknown[]];

  destroy(
    table: string,
    filter: FilterModelType<SchemaType>,
    options?: OptionsModelType<SchemaType>
  ): [string, unknown[]];
};

export type { BuilderType };
