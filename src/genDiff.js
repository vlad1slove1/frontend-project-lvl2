import { extname } from 'path';
import readFile from './readFile.js';
import parse from './parsers.js';
import genTree from './genTree.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);
  const file1 = parse(readFile1, extname(filepath1));
  const file2 = parse(readFile2, extname(filepath2));

  const tree = genTree(file1, file2);

  return stylish(tree);
};

export default genDiff;
