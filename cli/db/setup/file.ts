import pkg from '../../../package.json';

const getPath = (dev: boolean, path: string) => `'${dev ? path : pkg.name}'`;

const config = (
  dev: boolean
) => `import type {OrmConfigType} from ${getPath(dev, '../src/@types/orm.config')}
import { User } from  ${getPath(dev, './src/model')}

const CONFIG:OrmConfigType= {
  engine: 'sqlite',
  path: 'sqlite.db',
  models:[
    User
  ]
  migrations: {
    dir: '.migrations'
  }
}

export default CONFIG
`;

const model = (
  dev: boolean
) => `import {Model} from ${getPath(dev, '../../src/main')}

const User = Model('users', {
  uname: { type: 'string', min: 2, unique: true, required: true },
  email: { type: 'email', unique: true, required: true },
  password: { type: 'string', required: false, select: false },
  age: {
    type: 'number',
    default: 11,
    min: 10,
    max: 100,
    required: true,
  },
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

export { User };
`;

export { config, model };
