import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';
import isPlainObject from 'lodash/isPlainObject.js';
import has from 'lodash/has.js';
import isEqual from 'lodash/isEqual.js';

const genTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = sortBy(union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (isPlainObject(value1) && isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: genTree(value1, value2),
      };
    }
    if (!has(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    if (!has(data1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (!isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        value1,
        value2,
      };
    }

    return {
      key,
      type: 'unchanged',
      value: value1,
    };
  });

  return result;
};

const buildTree = (data1, data2) => ({ type: 'root', children: genTree(data1, data2) });

export default buildTree;
