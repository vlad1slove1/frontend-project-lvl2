import { resolve } from 'path';
import { readFileSync } from 'fs';

const genPath = (filepath) => {
  const absolutePath = resolve(process.cwd(), filepath);
  const readFile = readFileSync(absolutePath, 'utf-8');

  return JSON.parse(readFile);
};

export default genPath;
