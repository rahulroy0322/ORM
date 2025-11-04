import type {
  DefaultFieldsType,
  ExcludedFieldsModelType,
  InferSchemaModelType,
  RequiredFieldsType,
} from './field';
import type { ProjectionType } from './projection';
import type { SchemaType } from './utils';

type CreateResType<S extends SchemaType> = RequiredFieldsType<S> &
  DefaultFieldsType<S>;

type ResWithProjectionType<
  S extends SchemaType,
  P extends ProjectionType<S> | undefined,
> = P extends ProjectionType<S>
  ? {
      [Key in keyof P as P[Key] extends true
        ? Key
        : never]: Key extends keyof InferSchemaModelType<S>
        ? InferSchemaModelType<S>[Key]
        : never;
    }
  : Omit<InferSchemaModelType<S>, ExcludedFieldsModelType<S>>;

export type { CreateResType, ResWithProjectionType };
