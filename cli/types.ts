import type { DefaultSchemaType, FieldSchemaType } from '../src/@types/schema';

type CommandType = () => Promise<void>;

type MigrationFieldType =
  | FieldSchemaType<unknown>
  | ({
      type: 'pk';
    } & DefaultSchemaType);

type ColumnSchemaType = {
  key: string;
  type: MigrationFieldType['type'];
  required?: boolean;
  default?: unknown;
  values?: unknown[];
};

type IndexSchemaType = {
  name: string;
  key: string;
  unique: boolean;
  pk: boolean;
};

type TableSchemaType = {
  table: string;
  columns: ColumnSchemaType[];
  indexes: IndexSchemaType[];
};

type StateType = {
  at: number;
  tables: TableSchemaType[];
  migrations: string[];
};

type MigrationType = {
  migration?: () => {
    schema: Record<string, MigrationFieldType>;
    table: string;
  };
};

export type {
  CommandType,
  MigrationType,
  StateType,
  TableSchemaType,
  IndexSchemaType,
  ColumnSchemaType,
  MigrationFieldType,
};
