import type { DatabaseCompiler } from '../../../@types/compiler';
import { SQLCompiler } from './sql';

const getCompiler = (): DatabaseCompiler => {
  return SQLCompiler();
};

const compiler = getCompiler();

export { compiler };
