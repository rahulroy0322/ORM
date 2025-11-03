import type { Schema } from './schema';
import type { Prettify } from './utils';

type FieldType<F> = F extends { type: 'string' | 'email' }
  ? string
  : F extends { type: 'number' }
    ? number
    : F extends { type: 'bool' }
      ? boolean
      : F extends { type: 'timestamp' }
        ? Date
        : F extends { type: 'enum'; values: infer V }
          ? V extends readonly string[]
            ? V[number]
            : never
          : never;

type RequiredFields<S extends Schema> = {
  [Key in keyof S as S[Key] extends {
    required: boolean;
  }
    ? S[Key]['required'] extends true
      ? S[Key] extends {
          default: unknown;
        }
        ? never
        : Key
      : never
    : never]: FieldType<S[Key]>;
};

type OptionalFields<S extends Schema> = {
  [Key in keyof S as S[Key] extends {
    required: boolean;
  }
    ? S[Key]['required'] extends true
      ? never
      : Key
    : Key]?: FieldType<S[Key]>;
};

type ExcludedFields<S extends Schema> = {
  [Key in keyof S]: S[Key] extends {
    select?: boolean;
  }
    ? S[Key]['select'] extends false
      ? Key
      : never
    : never;
}[keyof S];

type StrFilterType =
  | {
      in: string[];
    }
  | {
      nin: string[];
    }
  | {
      eq: string;
    }
  | {
      ne: string;
    }
  | {
      startsWith: string;
    }
  | {
      endsWith: string;
    }
  | {
      like: string;
    }
  | {
      ilike: string;
    }
  | string;

type NumDateFilterType<T extends number | Date> =
  | {
      in: T[];
    }
  | {
      nin: T[];
    }
  | {
      bt: [T, T];
    }
  | {
      gt: T;
    }
  | {
      lt: T;
    }
  | {
      gte: T;
    }
  | {
      lte: T;
    }
  | T;

type NumFilterType = NumDateFilterType<number>;

type DateFilterType = NumDateFilterType<number | Date>;

type InferSchemaFieldType<F> = F extends {
  type: string;
}
  ? F extends {
      type: 'email' | 'string';
    }
    ? StrFilterType
    : F extends {
          type: 'number';
        }
      ? NumFilterType
      : F extends {
            type: 'bool';
          }
        ? boolean
        : F extends {
              type: 'timestamp';
            }
          ? DateFilterType
          : F extends {
                type: 'enum';
                values: string[];
              }
            ? F['values'][number]
            : never
  : never;

type InferSchemaType<S extends Schema> = {
  [K in keyof S]: FieldType<S[K]>;
};

type FilterInferSchemaType<S extends Schema> = Partial<
  Prettify<
    { [K in keyof S]: InferSchemaFieldType<S[K]> } & {
      OR: Partial<FilterInferSchemaType<S>>[];
      AND: Partial<FilterInferSchemaType<S>>[];
    }
  >
>;

type CreateInputType<S extends Schema> = Partial<InferSchemaType<S>> &
  RequiredFields<S> &
  OptionalFields<S>;

type ProjectionType<S extends Schema> = Partial<
  Record<keyof FilterInferSchemaType<S>, boolean>
>;

type ResType<
  S extends Schema,
  P extends ProjectionType<S> | undefined,
> = P extends ProjectionType<S>
  ? {
      [Key in keyof P as P[Key] extends true
        ? Key
        : never]: Key extends keyof InferSchemaType<S>
        ? InferSchemaType<S>[Key]
        : never;
    }
  : Omit<InferSchemaType<S>, ExcludedFields<S>>;

type CheckForSelect<S extends Schema> = {
  [Key in keyof S as S[Key] extends {
    select?: boolean;
  }
    ? S[Key]['select'] extends true
      ? Key
      : never
    : never]: FieldType<S[Key]>;
};

type CheckForDefault<S extends Schema> = {
  [Key in keyof S as S[Key] extends {
    default?: unknown;
  }
    ? Key
    : never]: FieldType<S[Key]>;
};

type CheckForRequired<S extends Schema> = {
  [Key in keyof S as S[Key] extends {
    required?: boolean;
  }
    ? S[Key]['required'] extends true
      ? Key
      : never
    : never]: FieldType<S[Key]>;
};

type CreateResType<S extends Schema> = CheckForSelect<S> &
  CheckForRequired<S> &
  CheckForDefault<S>;

type FieldKeysType =
  | 'in'
  | 'nin'
  | 'eq'
  | 'ne'
  | 'startsWith'
  | 'endsWith'
  | 'like'
  | 'ilike'
  | 'bt'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte';

export type {
  CreateInputType,
  ProjectionType,
  ResType,
  CreateResType,
  InferSchemaType,
  StrFilterType,
  FieldKeysType,
  FilterInferSchemaType,
};
