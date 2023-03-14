import { readFileSync } from 'fs';
import path from 'path';
import parse from './parses.js';
import buildTree from './buildTree.js';
import formatStylish from './formatters/stylish.js';

const fullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath);
const getData = (filepath) => {
  const patch = fullPath(filepath);
  return parse(readFileSync(patch), extractFormat(filepath));
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const tree = buildTree(data1, data2);
  return formatStylish(tree);
};

export default genDiff;
