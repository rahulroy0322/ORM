import type { FilterInferSchemaType } from '../@types/model';
import type { Schema } from '../@types/schema';

type DatabaseCompiler = {
  columns: (obj: Record<string, unknown>) => [string[], string[], string[]];

  where: <S extends Schema>(
    where: Partial<FilterInferSchemaType<S>>
  ) => [string, string[]];

  select: (fields?: Record<string, boolean>) => string;

  options: (
    whereParamsLength: number,
    options: Partial<{
      limit: number;
      offset: number;
      orderBy: [string, 'ASC' | 'DESC'];
    }>
  ) => [string, unknown[]];
};

export type { DatabaseCompiler };
