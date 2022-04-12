const json = (tree, spacesCount = 2) => JSON.stringify(tree, null, ' '.repeat(spacesCount));

export default json;
