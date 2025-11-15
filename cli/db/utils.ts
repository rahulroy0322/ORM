import path from 'node:path';

let cwd = process.cwd();

const isDev = process.env.ENV?.toLocaleLowerCase() === 'dev';

if (isDev) {
  cwd = path.join(cwd, 'dist');
  require('./dev').setup(cwd);
}

export { cwd, isDev };
