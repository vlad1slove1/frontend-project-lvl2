import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';
import buildTree from '../src/buildTree.js';
import format from '../src/formatters/index.js';
import { getFormat } from '../src/utils.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  {
    filename1: 'file1.json', filename2: 'file2.json', output: 'stylishOutput.txt', formatName: 'stylish',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.yaml', output: 'stylishOutput.txt', formatName: 'stylish',
  },
  {
    filename1: 'file1.json', filename2: 'file2.json', output: 'plainOutput.txt', formatName: 'plain',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.yaml', output: 'plainOutput.txt', formatName: 'plain',
  },
  {
    filename1: 'file1.json', filename2: 'file2.json', output: 'jsonOutput.txt', formatName: 'json',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.yaml', output: 'jsonOutput.txt', formatName: 'json',
  },
];

test.each(tests)('gendiff stylish, plain and json tests', ({
  filename1, filename2, output, formatName,
}) => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatName);
  expect(result).toEqual(expected);
});

test('generate tree with wrong format test', () => {
  const { filename1 } = tests[0];
  const { filename2 } = tests[0];
  const fileContent1 = readFile(filename1);
  const fileContent2 = readFile(filename2);
  const parsedFile1 = parse(fileContent1, getFormat(filename1));
  const parsedFile2 = parse(fileContent2, getFormat(filename2));
  const tree = buildTree(parsedFile1, parsedFile2);
  const wrongFormat = 'xml';
  expect(() => format(tree, wrongFormat)).toThrow(`Unknown format to generate a tree: '${wrongFormat}'!`);
});

test('gendiff with wrong extension test', () => {
  const filename1 = 'file1.xml';
  const { filename2 } = tests[0];
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  const wrongExtension = getFormat(filename1);
  expect(() => genDiff(filepath1, filepath2)).toThrow(`Unknown format to parse: '${wrongExtension}'!`);
});

test('build tree with wrong type of node test', () => {
  const filename = 'wrongTypeOfNode.txt';
  const fileContent = readFile(filename);
  const wrongTypeOfNode = 'undefined';
  expect(() => plain(fileContent)).toThrow(`Unknown type: '${wrongTypeOfNode}' of node!`);
  expect(() => stylish(fileContent)).toThrow(`Unknown type: '${wrongTypeOfNode}' of node!`);
});
