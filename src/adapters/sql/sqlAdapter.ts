import type { DatabaseAdapterType } from '../../@types/adapter';
import type { BuilderType } from '../../@types/builder';

const SQLAdapter = ({
  builder,
  run,
}: {
  run(sql: string, params: unknown[] | undefined): unknown[];
  builder: BuilderType;
}): Pick<DatabaseAdapterType, 'find' | 'create' | 'destroy' | 'update'> => {
  const find: DatabaseAdapterType['find'] = async (
    table,
    filter,
    projection = {},
    options
  ) => {
    const [sql, params] = builder.find(table, filter, projection, options);

    return run(sql, params) as any;
  };

  const create: DatabaseAdapterType['create'] = async (
    table,
    data,
    projection = {}
  ) => {
    const [sql, params] = builder.create(table, data, projection);

    return run(sql, params) as any;
  };

  const update: DatabaseAdapterType['update'] = async (
    table,
    filter,
    data,
    projection
    // TODO!
    // options
  ) => {
    const [sql, params] = builder.update(
      table,
      filter,
      data,
      projection
      // options
    );

    return run(sql, params) as any;
  };

  const destroy: DatabaseAdapterType['destroy'] = async (
    table,
    filter,
    options
  ) => {
    const [sql, params] = builder.destroy(table, filter, options);

    return run(sql, params) as any;
  };

  return {
    create,
    update,
    destroy,
    find,
  };
};

export { SQLAdapter };
