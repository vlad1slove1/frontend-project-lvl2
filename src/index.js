import readFile from './readFile.js';
import parse from './parsers.js';
import genTree from './genTree.js';
import formattedTree from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const parsedFile1 = parse(fileContent1, filepath1.split('.')[1]);
  const parsedFile2 = parse(fileContent2, filepath2.split('.')[1]);

  const tree = genTree(parsedFile1, parsedFile2);

  return formattedTree(tree, formatName);
};

export default genDiff;
