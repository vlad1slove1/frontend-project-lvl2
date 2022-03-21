import { test, expect } from '@jest/globals';
import readFile from '../src/readFile.js';
import genDiff from '../src/genDiff.js';

const expectedStylishOutput = readFile('stylishOutput.txt');
const expectedPlainOutput = readFile('plainOutput.txt');
const expectedJsonOutput = readFile('jsonOutput.txt');

test('gendiff stylish .json test', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedStylishOutput);
  expect(() => genDiff('file1.xml', 'file2.json')).toThrow('Incorrect file format');
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

test('gendiff .json to JSON test', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJsonOutput);
});

test('gendiff .yml and .yaml to JSON test', () => {
  expect(genDiff('file1.yml', 'file2.yaml', 'json')).toEqual(expectedJsonOutput);
});

test('format check at null', () => {
  expect(genDiff('file1.json', 'file2.json', 'format')).toBeNull();
});
