import { readFile, getFormat } from './utils.js';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const data1 = parse(fileContent1, getFormat(filepath1));
  const data2 = parse(fileContent2, getFormat(filepath2));

  const tree = buildTree(data1, data2);

  return format(tree, formatName);
};

export default genDiff;
