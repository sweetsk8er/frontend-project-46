import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parses.js';

const fullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath);
const getData = (filepath) => {
  const patch = fullPath(filepath);
  return parse(readFileSync(patch), extractFormat(filepath));
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const keys = Object.keys({ ...data1, ...data2 });
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];
    if ((val1 !== undefined) && !val2) {
      return `  - ${key}: ${val1}`;
    } if (!val1 && (val2 !== undefined)) {
      return `  + ${key}: ${val2}`;
    } if (val1 && val2 && (val1 === val2)) {
      return `    ${key}: ${val1}`;
    }
    return (`  - ${key}: ${val1}\n  + ${key}: ${val2}`);
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
