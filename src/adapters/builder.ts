import { SQLBuilder } from './sql/builder';

const getBuilder = () => {
  return SQLBuilder();
};

const builder = getBuilder();

export { builder };
