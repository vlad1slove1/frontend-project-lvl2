import { test, expect } from '@jest/globals';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedOutput = readFile('flatOutput.txt');

test('gediff test .json', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedOutput);
});

test('gendiff test .yml', () => {
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(expectedOutput);
});
