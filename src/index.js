import { readFileSync } from 'fs';
import _ from 'lodash'

const genDiff = (data1, data2) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const keys = _.union(keys1, keys2);

    const result = {};
    for (const key of keys) {
        if (!_.has(data1, key)) {
            result[key] = 'added';
          } else if (!_.has(data2, key)) {
            result[key] = 'deleted';
          } else if (data1[key] !== data2[key]) {
            result[key] = 'changed';
          } else {
            result[key] = 'unchanged';
          }
        }
        return result
}

export default (filepath1, filepath2) => {
const formatedData1 = readFileSync(filepath1, 'utf-8');
const formatedData2 = readFileSync(filepath2, 'utf-8');
const parsedData1 = JSON.parse(formatedData1);
const parsedData2 = JSON.parse(formatedData2);


console.log(genDiff(parsedData1, parsedData2))
};


