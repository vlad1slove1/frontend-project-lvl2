const indent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

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

const stylish = (tree) => {
  const iter = (node, depth = 0) => {
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
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `{\n${result.join('\n')}\n}`;
      }
      case 'nested': {
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `${indent(depth)}  ${key}: {\n${result.join('\n')}\n${indent(depth)}  }`;
      }
      case 'deleted': {
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'added': {
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'changed': {
        const removed = `${indent(depth)}- ${key}: ${stringify(value1, depth)}`;
        const added = `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`;
        return `${removed}\n${added}`;
      }
      case 'unchanged': {
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      }
      default:
        throw new Error(`Unknown type: '${type}' of node!`);
    }
  };

  return iter(tree);
};

export default stylish;
