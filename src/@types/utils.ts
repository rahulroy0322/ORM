type Prettify<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: Obj[Key];
} & {};

type SchemaType = Record<string, Record<string, unknown>>;

export type { Prettify, SchemaType };
