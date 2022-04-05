import { load } from 'js-yaml';

const parse = (data, formatName) => {
  switch (formatName) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return load(data);
    case 'yaml':
      return load(data);
    default:
      throw new Error(`Unknown format to parse: '${formatName}'!`);
  }
};

export default parse;
