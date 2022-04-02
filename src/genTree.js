import union from 'lodash/union.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';

const tree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sortedKeys = sortBy(union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (typeof (value1) === 'object' && typeof (value2) === 'object') {
      return {
        key,
        type: 'nested',
        children: tree(value1, value2),
      };
    }
    if (!has(file2, key)) {
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    if (!has(file1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        removedValue: value1,
        addedValue: value2,
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

const genTree = (file1, file2) => ({ type: 'root', children: tree(file1, file2) });

export default genTree;
