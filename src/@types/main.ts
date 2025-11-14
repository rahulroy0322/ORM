import type { InferSchemaModelType } from './field';
import type { FilterModelType } from './filter';
import type { CreateInputType } from './input';
import type { OptionsModelType } from './options';
import type { ProjectionType } from './projection';
import type { CreateResType, ResWithProjectionType } from './res';
import type { FieldSchemaType } from './schema';
import type { Prettify, WithId } from './utils';

type ModelType = <const S extends Record<keyof S, FieldSchemaType<S[keyof S]>>>(
  table: string,
  schema: S,
  options?: {
    timestamp?: boolean;
  }
) => {
  create: <P extends ProjectionType<S> | undefined = undefined>(
    data: CreateInputType<S>[],
    projection?: P
  ) => Promise<
    WithId<
      P extends ProjectionType<S>
        ? ResWithProjectionType<S, P>
        : CreateResType<S>
    >[]
  >;

  find: <P extends ProjectionType<S> | undefined = undefined>(
    filter: FilterModelType<S>,
    projection?: P,
    options?: OptionsModelType<S>
  ) => Promise<WithId<Prettify<ResWithProjectionType<S, P>>>[]>;

  update: <P extends ProjectionType<S> | undefined = undefined>(
    filter: FilterModelType<S>,
    // TODO! atleast
    data: Partial<InferSchemaModelType<S>>,
    projection?: P,
    options?: OptionsModelType<S>
  ) => Promise<WithId<Prettify<ResWithProjectionType<S, P>>>[]>;

  destroy: (
    filter: FilterModelType<S>,
    options?: OptionsModelType<S>
  ) => Promise<WithId<S>[]>;
};

export type { ModelType };
