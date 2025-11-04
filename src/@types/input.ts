import type {
  InferSchemaModelType,
  OptionalFieldsType,
  RequiredFieldsType,
} from './field';
import type { Prettify, SchemaType } from './utils';

type CreateInputType<S extends SchemaType> = Prettify<
  Partial<InferSchemaModelType<S>> &
    RequiredFieldsType<S> &
    OptionalFieldsType<S>
>;

export type { CreateInputType };
