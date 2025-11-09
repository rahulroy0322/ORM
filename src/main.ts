import { log } from 'node:console';
import type { ModelType } from './@types/main';
import { builder } from './adapters/builder';
import { db } from './adapters/main';

const main = async () => {
  await db.connect();
  log(
    await User.find(
      {},
      {

      },
      {
        limit: 2,
        skip: 2,
        orderBy: {
          age: 'DESC',
          uname: 'ASC',
        },
      }
    )
  );

  /*
   */
};

const Model: ModelType = (table, _schema) => {
  if (!table.endsWith('s')) {
    table = table.concat('s');
  }

  return {
    create(data, projection) {
      return db.run(...builder.create(table, data as any, projection)) as any;
    },
    find(filter, projection, options) {
      return db.run(
        ...builder.find(table, filter as any, projection, options)
      ) as any;
    },
    destroy(filter, projection) {
      return db.run(
        ...builder.destroy(table, filter as any, projection)
      ) as any;
    },
    update(filter, data, projection) {
      return db.run(
        ...builder.update(table, filter as any, data, projection)
      ) as any;
    },
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
