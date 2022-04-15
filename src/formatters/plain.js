const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }

  return typeof (value) === 'string' ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (node, path = '') => {
    const {
      key,
      type,
      value,
      children,
      value1,
      value2,
    } = node;

    switch (type) {
      case 'root': {
        const result = children.flatMap((child) => iter(child, key));
        return result.join('\n');
      }
      case 'nested': {
        const result = children.flatMap((child) => iter(child, `${path}${key}.`));
        return result.join('\n');
      }
      case 'deleted': {
        return `Property '${path}${key}' was removed`;
      }
      case 'added': {
        return `Property '${path}${key}' was added with value: ${stringify(value)}`;
      }
      case 'changed': {
        return `Property '${path}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      }
      case 'unchanged': {
        return [];
      }
      default:
        throw new Error(`Unknown type: '${type}' of node!`);
    }
  };

  return iter(tree);
};

export default plain;
