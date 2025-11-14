import type { ModelType } from './@types/main';
import { db } from './adapters/main';

const main = async () => {
  // await db.connect();

  const _y = Math.random();

  const user = (await User.find({}))[0];

  user?._id;
};

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

  return {
    create: (data, projection) =>
      db.create(table, data as any, projection) as any,

    find: (filter, projection, options) =>
      db.find(table, filter as any, projection, options) as any,

    destroy: (filter, options) =>
      db.destroy(table, filter as any, options) as any,

    update: (filter, data, projection, options) =>
      db.update(table, filter as any, data, projection, options) as any,
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

const User = Model('users', {
  uname: { type: 'string', min: 2, default: '', unique: true, required: true },
  email: { type: 'email', unique: true, required: true },
  password: { type: 'string', required: false, select: false },
  age: { type: 'number', default: 11, min: 10, max: 100, required: true },
  gender: {
    type: 'enum',
    values: ['male', 'female', 'other'],
    default: 'female',
  },
  isVerified: { type: 'bool', default: false },
  verifiedAt: { type: 'timestamp', default: 'now' },
  isActive: {
    type: 'bool',
    default: false,
  },
});

main();
