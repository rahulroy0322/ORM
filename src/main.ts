import { log } from 'node:console';
import type { ModelType } from './@types/main';

const main = () => {
  const user = User.find({}, undefined, {
    limit: 0,
    orderBy: {
      age: 'ASC',
      email: 'DESC',
    },
  });

  log(user);
};

const Model: ModelType = (table, _schema) => {
  if (!table.endsWith('s')) {
    table = table.concat('s');
  }

  return {
    create() {
      return Promise.resolve([]);
    },
    find() {
      return Promise.resolve([]);
    },
    destroy() {
      return Promise.resolve([]);
    },
    update() {
      return Promise.resolve([]);
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
