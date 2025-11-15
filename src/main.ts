import type { ModelType } from './@types/main';
import { db } from './adapters/main';

const getIdSchema = () =>
  ({
    type: 'pk',
    default: () => Math.random().toFixed(4).toString(),
  }) as const;

const Model: ModelType = (table, schema, options = {}) => {
  if (!table.endsWith('s')) {
    table = table.concat('s');
  }

  (schema as any)._id = getIdSchema();

  if (options.timestamp) {
    schema = {
      ...schema,
      createdAt: {
        type: 'timestamp',
        default: () => new Date(),
      },
      updatedAt: {
        type: 'timestamp',
        default: () => new Date(),
        onupdate: true,
      },
    };
  }

  const migration = () => ({
    schema,
    table,
  });

  return {
    create: (data, projection) =>
      db.create(table, data as any, projection) as any,

    find: (filter, projection, options) =>
      db.find(table, filter as any, projection, options) as any,

    destroy: (filter, options) =>
      db.destroy(table, filter as any, options) as any,

    update: (filter, data, projection, options) =>
      db.update(table, filter as any, data, projection, options) as any,

    migration,
  };
};

// ! todo

// type UserType = {
//   uname: string;
//   email: string;
//   password: string;
//   age: string;
//   gender: 'male' | 'female' | 'other';
//   isVerified: string;
//   verifiedAt: Date;
//   isActive: boolean;
// };
// const User = Model<UserType>('users', {

export { Model };
