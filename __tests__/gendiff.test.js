/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(readFile('stylish.txt'));
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('stylish.txt'));
});

test('yaml/yml', () => {
  const filepath1 = getFixturePath('filepath1.yaml');
  const filepath2 = getFixturePath('filepath2.yml');

  expect(genDiff(filepath1, filepath2)).toEqual(readFile('stylish.txt'));
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('stylish.txt'));
});
