const indent = (depth, replacer = ' ', spacesCount = 2) => replacer.repeat(depth * (spacesCount + 2) - 2);

const stringify = (value, depth = 1) => {
  if (!(value instanceof Object)) {
    return String(value);
  }

  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const prop = value[key];

    return `${indent(depth)}  ${key}: ${stringify(prop, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${indent(depth - 1)}}`;
};

const buildTree = (nodes) => {
  const iter = (node, depth = 1) => {
    const {
      key,
      type,
      value,
      children,
      removedValue,
      addedValue,
    } = node;

    switch (type) {
      case 'nested': {
        return `\n${indent(depth)}  ${key}: {${children.map((child) => iter(child, depth + 1)).join('')}\n${indent(depth)}  }`;
      }
      case 'deleted': {
        return `\n${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
      }
      case 'added': {
        return `\n${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
      }
      case 'changed': {
        const removed = `\n${indent(depth)}- ${key}: ${stringify(removedValue, depth + 1)}`;
        const added = `\n${indent(depth)}+ ${key}: ${stringify(addedValue, depth + 1)}`;
        return `${removed}${added}`;
      }
      case 'unchanged': {
        return `\n${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
      }
      default:
        return null;
    }
  };

  return iter(nodes);
};

const stylish = (tree) => {
  const result = tree.map((node) => buildTree(node));

  return `{${result.join('')}\n}`;
};

export default stylish;
