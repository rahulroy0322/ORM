type DefaultSchemaType = {
  unique?: boolean;
  select?: boolean;
  required?: boolean;
  default?: unknown;
};

type MinMaxSchemaType = {
  min?: number;
  max?: number;
};

type StrSchemaType = {
  type: 'string' | 'email';
  default?: string;
} & MinMaxSchemaType;

type NumSchemaType = {
  type: 'number';
  default?: number;
} & MinMaxSchemaType;

type BoolSchemaType = {
  type: 'bool';
  default?: boolean;
};

type TimestampSchemaType = {
  type: 'timestamp';
  default?: 'now' | Date;
  onupdate?: true;
};

type EnumSchemaType<F> = F extends {
  type: 'enum';
  values: infer Values extends readonly string[];
}
  ? {
      type: 'enum';
      values: Values;
      default?: Values[number];
    }
  : never;

type Schema = Record<string, unknown>;

type FieldsType<F> =
  | StrSchemaType
  | BoolSchemaType
  | NumSchemaType
  | TimestampSchemaType
  | EnumSchemaType<F>;

type FieldSchemaType<F> = DefaultSchemaType & FieldsType<F>;

export type {
  FieldSchemaType,
  Schema,
  FieldsType,
  NumSchemaType,
  StrSchemaType,
  EnumSchemaType,
};
