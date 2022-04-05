const json = (tree, spacesCount = 2) => JSON.stringify(tree, null, ' '.repeat(spacesCount));

export default json;

// JSON.stringify() - this command turns the object into a JSON string
// for subsequent sending to the server.
