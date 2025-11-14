type Prettify<Obj extends Record<string, unknown>> = {
  readonly [Key in keyof Obj]: Obj[Key];
} & {};

type SchemaType = Record<string, Record<string, unknown>>;

type WithId<T extends Record<string, unknown>> = Prettify<T & { _id: string }>;

export type { Prettify, SchemaType, WithId };
