import type {
  FieldKeysType,
  FilterInferSchemaType,
  InferSchemaType,
} from '../@types/model';
import type { Schema } from '../@types/schema';
import type { DatabaseCompiler } from './base.compiler';

const whereImpl = <S extends Schema>(
  filter: Partial<FilterInferSchemaType<S>>,
  params: string[] = []
): [string, string[]] => {
  const parts: string[] = [];

  const eq = (key: string, value: string) => {
    parts.push(`${key} = $${params.length + 1}`);
    params.push(value);
  };

  const entries = Object.entries(filter);

  for (const [key, entry] of entries) {
    if (key === 'OR' || key === 'AND') {
      const op = key === 'OR' ? 'OR' : 'AND';

      const sub = (entry as unknown as InferSchemaType<Schema>[]).map(
        (v) => `(${whereImpl(v, params)[0]})`
      );

      parts.push(sub.join(` ${op} `));
      continue;
    }

    if (typeof entry === 'object') {
      for (const [key2, op] of Object.entries(entry)) {
        switch (key2 as FieldKeysType) {
          case 'in':
            parts.push(
              `${key} IN (${(op as unknown[]).map((value) => {
                params.push(value as string);
                return `$${params.length}`;
              })})`
            );
            break;
          case 'nin':
            parts.push(
              `${key} NOT IN (${(op as unknown[]).map((value) => {
                params.push(value as string);
                return `$${params.length}`;
              })})`
            );
            break;
          case 'eq':
            eq(key, op as string);
            break;
          case 'ne':
            parts.push(`${key} != $${params.length + 1}`);
            params.push(op as string);
            break;
          case 'startsWith':
            parts.push(`${key} LIKE $${params.length + 1}`);
            params.push(`%${op}`);
            break;
          case 'endsWith':
            parts.push(`${key} LIKE $${params.length + 1}`);
            params.push(`${op}%`);
            break;
          case 'like':
          case 'ilike':
            parts.push(`${key} LIKE $${params.length + 1}`);
            params.push(`%${op}%`);
            break;
          case 'bt':
            parts.push(
              `${key} BETWEEN $${params.length + 1} AND $${params.length + 1}`
            );
            params.push(...(op as []));
            break;
          case 'gt':
            parts.push(`${key} > $${params.length + 1}`);
            params.push(op as string);
            break;
          case 'lt':
            parts.push(`${key} < $${params.length + 1}`);
            params.push(op as string);
            break;
          case 'gte':
            parts.push(`${key} >= $${params.length + 1}`);
            params.push(op as string);
            break;
          case 'lte':
            parts.push(`${key} <= $${params.length + 1}`);
            params.push(op as string);
            break;
          default:
            throw new Error(`Unknown operator: ${op}`);
        }
      }

      continue;
    }

    // the end case
    eq(key, entry as unknown as string);
  }

  return [parts.join(' AND '), params];
};

const SQLCompiler = (): DatabaseCompiler => {
  const where: DatabaseCompiler['where'] = (filter) => {
    return whereImpl(filter);
  };

  const select: DatabaseCompiler['select'] = (fields = {}) => {
    const entries = Object.entries(fields);

    if (!entries.length) {
      return '*';
    }

    const keys: string[] = [];

    for (const [key, entry] of entries) {
      if (entry) {
        keys.push(key);
      }
    }

    return keys.join(',');
  };

  const options: DatabaseCompiler['options'] = (whereParamsLength, options) => {
    const parts: string[] = [];
    const params: (string | number)[] = [];

    if (options.orderBy) {
      parts.push(
        `ORDER BY $${whereParamsLength + params.length + 1} $${params.length + 2}`
      );
      params.push(options.orderBy[0], options.orderBy[1]);
    }

    if (options.limit) {
      parts.push(`LIMIT $${whereParamsLength + params.length + 1}`);
      params.push(options.limit);
    }

    if (options.offset) {
      parts.push(`OFFSET $${whereParamsLength + params.length + 1}`);
      params.push(options.offset);
    }

    return [parts.join(' '), params];
  };

  const columns: DatabaseCompiler['columns'] = (obj) => {
    const keys: string[] = [];
    const placeHolder: string[] = [];

    const params: string[] = [];

    const entries = Object.entries(obj);

    for (const [key, entry] of entries) {
      keys.push(key);
      placeHolder.push(`$${params.length + 1}`);
      params.push(entry as string);
    }

    return [keys, placeHolder, params];
  };

  return {
    where,
    select,
    options,
    columns,
  };
};

export { SQLCompiler };
