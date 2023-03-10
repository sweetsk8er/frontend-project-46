import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path'

const genDiff = (data1, data2) => {
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

export default (filepath1, filepath2) => {
  const fullpath1 = path.resolve(process.cwd(), filepath1);
  const fullpath2 = path.resolve(process.cwd(), filepath2);
  const parsedData1 = JSON.parse(readFileSync(fullpath1, 'utf-8'));
  const parsedData2 = JSON.parse(readFileSync(fullpath2, 'utf-8'));

  return genDiff(parsedData1, parsedData2);
};
