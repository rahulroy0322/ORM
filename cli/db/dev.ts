import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';

const setup = async (path: string) => {
  if (!path) {
    return;
  }

  if (!existsSync(path)) {
    await mkdir(path, {
      recursive: true,
    });
  }
};

export { setup };
