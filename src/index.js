import { readFileSync } from 'fs';
import _ from 'lodash'

const genDiff = (data1, data2) => {
    const keys = Object.keys({ ...data1, ...data2 });
    const sortKeys = _.sortBy(keys);
    const diff = {};
      for (const key of sortKeys) {
        const val1 = data1[key];
        const val2 = data2[key];
        if ((val1 !== undefined) && !val2) {
          diff[`- ${key}`] = val1;
        } 
        else if (!val1 && (val2 !== undefined)) {
          diff[`+ ${key}`] = val2;
        }
        else if (val1 && val2 && (val1 === val2)) {
          diff[`  ${key}`] = val1;
        } 
        else if (val1 && val2 && (val1 !== val2)) {
          diff[`- ${key}`] = val1;
          diff[`+ ${key}`] = val2; 
        }
      }
      const result = JSON.stringify(diff)
        .replaceAll('"', '')
        .replaceAll(',', `\n  `)
        .replaceAll('{', `{\n  `)
        .replaceAll('}', '\n}');
    
      return result;
    };

export default (filepath1, filepath2) => {
const formatedData1 = readFileSync(filepath1, 'utf-8');
const formatedData2 = readFileSync(filepath2, 'utf-8');
const parsedData1 = JSON.parse(formatedData1);
const parsedData2 = JSON.parse(formatedData2);


console.log(genDiff(parsedData1, parsedData2))
};


