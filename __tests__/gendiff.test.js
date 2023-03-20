/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each(['.json', '.yaml', '.yml'])('diff', (ext) => {
  const filepath1 = getFixturePath(`file1${ext}`);
  const filepath2 = getFixturePath(`file2${ext}`);

  expect(genDiff(filepath1, filepath2)).toEqual(readFile('stylish.txt'));
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(readFile('stylish.txt'));
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(readFile('plain.txt'));
  expect(genDiff(filepath1, filepath2, 'json')).toBe(readFile('json.txt'));
});
