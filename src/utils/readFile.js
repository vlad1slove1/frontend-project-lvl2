import { resolve } from 'path';
import { readFileSync } from 'fs';

const getFixturePath = (filename) => resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

export default readFile;
