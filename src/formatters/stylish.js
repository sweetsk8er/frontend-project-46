import _ from 'lodash';

const spacesCount = 4;
const signSpace = 2;
const replacer = ' ';

const getSpaces = (depth, isFull = true) => {
  const indentSize = depth * spacesCount;
  return isFull ? replacer.repeat(indentSize) : replacer.repeat(indentSize - signSpace);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getSpaces(depth)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getSpaces(depth, false)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${getSpaces(depth, false)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${getSpaces(depth, false)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${getSpaces(depth, false)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${getSpaces(depth)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getSpaces(depth)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${getSpaces(depth)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});

const formatStylish = (tree) => {
  const result = iter(tree);
  return `{\n${result.join('\n')}\n}`;
};
export default formatStylish;
