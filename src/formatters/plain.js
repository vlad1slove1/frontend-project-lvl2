const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }

  return typeof (value) === 'string' ? `'${value}'` : value;
};

const plain = (nodes) => {
  const iter = (node, acc = '') => {
    const {
      key,
      type,
      value,
      children,
      removedValue,
      addedValue,
    } = node;

    switch (type) {
      case 'root': {
        return children.map((child) => iter(child, key)).join('');
      }
      case 'nested': {
        return children.map((child) => iter(child, `${acc}${key}.`)).join('');
      }
      case 'deleted': {
        return `\nProperty '${acc}${key}' was removed`;
      }
      case 'added': {
        return `\nProperty '${acc}${key}' was added with value: ${stringify(value)}`;
      }
      case 'changed': {
        return `\nProperty '${acc}${key}' was updated. From ${stringify(removedValue)} to ${stringify(addedValue)}`;
      }
      case 'unchanged': {
        return '';
      }
      default:
        return null;
    }
  };

  return iter(nodes).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

export default plain;
