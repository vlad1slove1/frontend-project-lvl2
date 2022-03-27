const indent = (depth, replacer = ' ', spacesCount = 2) => replacer.repeat(depth * (spacesCount + 2) - 2);

const stringify = (value, depth = 1) => {
  if (!(value instanceof Object)) {
    return String(value);
  }

  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const prop = value[key];

    return `${indent(depth + 1)}  ${key}: ${stringify(prop, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};

const stylish = (nodes) => {
  const iter = (node, depth = 0) => {
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
        return `${children.map((child) => iter(child, depth + 1)).join('')}`;
      }
      case 'nested': {
        return `\n${indent(depth)}  ${key}: {${children.map((child) => iter(child, depth + 1)).join('')}\n${indent(depth)}  }`;
      }
      case 'deleted': {
        return `\n${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'added': {
        return `\n${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'changed': {
        const removed = `\n${indent(depth)}- ${key}: ${stringify(removedValue, depth)}`;
        const added = `\n${indent(depth)}+ ${key}: ${stringify(addedValue, depth)}`;
        return `${removed}${added}`;
      }
      case 'unchanged': {
        return `\n${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      }
      default:
        return null;
    }
  };

  return `{${iter(nodes)}\n}`;
};

export default stylish;
