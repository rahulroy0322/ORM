import type { DatabaseCompiler } from './base.compiler';
import { SQLCompiler } from './sql.compiler';

const getCompiler = (): DatabaseCompiler => {
  return SQLCompiler();
};

const compiler = getCompiler();

export { compiler };
