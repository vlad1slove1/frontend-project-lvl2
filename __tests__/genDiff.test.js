import { test, expect } from '@jest/globals';
import readFile from '../src/readFile.js';
import genDiff from '../src/genDiff.js';

const expectedStylishOutput = readFile('stylishOutput.txt');
const expectedPlainOutput = readFile('plainOutput.txt');

test('gendiff stylish .json test', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedStylishOutput);
});

test('gendiff stylish .yml and .yaml test', () => {
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(expectedStylishOutput);
});

test('gendiff plain .json test', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlainOutput);
});

test('gendiff plain .yml and .yaml test', () => {
  expect(genDiff('file1.yml', 'file2.yaml', 'plain')).toEqual(expectedPlainOutput);
});
