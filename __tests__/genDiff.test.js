import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  {
    filepath1: 'file1.json', filepath2: 'file2.json', output: 'stylishOutput.txt', format: 'stylish',
  },
  {
    filepath1: 'file1.yml', filepath2: 'file2.yaml', output: 'stylishOutput.txt', format: 'stylish',
  },
  {
    filepath1: 'file1.json', filepath2: 'file2.json', output: 'plainOutput.txt', format: 'plain',
  },
  {
    filepath1: 'file1.yml', filepath2: 'file2.yaml', output: 'plainOutput.txt', format: 'plain',
  },
];

test.each(tests)('gendiff stylish and plain tests', ({
  filepath1, filepath2, output, format,
}) => {
  const file1 = getFixturePath(filepath1);
  const file2 = getFixturePath(filepath2);
  const expected = readFile(output);
  const result = genDiff(file1, file2, format);
  expect(result).toEqual(expected);
});

test('format check at null', () => {
  expect(genDiff('file1.json', 'file2.json', 'format')).toBeNull();
});

test('format corectness check', () => {
  expect(() => genDiff('file1.xml', 'file2.json')).toThrow('Incorrect file format');
});
