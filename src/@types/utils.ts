type Prettify<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: Obj[Key];
} & {};

export type { Prettify };
