import { readFileSync } from 'fs';
import path from 'path';
import parse from './parses.js';
import buildTree from './buildTree.js';
import chooseFormat from './formatters/index.js';

const fullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).substring(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const getData = (filepath) => {
    const patch = fullPath(filepath);
    return parse(readFileSync(patch), extractFormat(filepath));
  };
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildTree(data1, data2);
  return chooseFormat(tree, format);
};

export default genDiff;
