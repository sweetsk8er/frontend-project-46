import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortKeys = _.sortBy(keys);
  const result = sortKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];
    if ((val1 !== undefined) && !val2) {
      return `- ${key}: ${val1}`;
    } if (!val1 && (val2 !== undefined)) {
      return `+ ${key}: ${val2}`;
    } if (val1 && val2 && (val1 === val2)) {
      return `  ${key}: ${val1}`;
    }
    return (`- ${key}: ${val1}\n+ ${key}: ${val2}`);
  });
  return `{\n${result.join('\n')}\n}`;
};

export default (filepath1, filepath2) => {
  const formatedData1 = readFileSync(filepath1, 'utf-8');
  const formatedData2 = readFileSync(filepath2, 'utf-8');
  const parsedData1 = JSON.parse(formatedData1);
  const parsedData2 = JSON.parse(formatedData2);

  return genDiff(parsedData1, parsedData2);
};
