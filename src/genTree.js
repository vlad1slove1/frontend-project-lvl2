import _ from 'lodash';

const genTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sortedKeys = _.union(keys1, keys2).sort();

  const result = sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (typeof (value1) === 'object' && typeof (value2) === 'object') {
      return {
        key,
        type: 'nested',
        children: genTree(value1, value2),
      };
    }
    if (!Object.hasOwn(file2, key)) {
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    if (!Object.hasOwn(file1, key)) {
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

export default genTree;