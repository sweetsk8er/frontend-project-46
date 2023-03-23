import { readFileSync } from 'fs';
import path from 'path';
import parse from './parses.js';
import buildTree from './buildTree.js';
import chooseFormat from './formatters/index.js';

const fullPath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).substring(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // получили путь
  const pathfile1 = fullPath(filepath1);
  const pathfile2 = fullPath(filepath2);
  // прочитали файл
  const dataFile1 = readFileSync(pathfile1);
  const dataFile2 = readFileSync(pathfile2);
  // прочитали формат
  const formatFile1 = extractFormat(filepath1);
  const formatFile2 = extractFormat(filepath2);

  const tree = buildTree(
    parse(dataFile1, formatFile1),
    parse(dataFile2, formatFile2),
  );
  return chooseFormat(tree, format);
};

export default genDiff;
