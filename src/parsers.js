import { load } from 'js-yaml';

const parse = (filename, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(filename);
    case '.yml':
      return load(filename);
    case '.yaml':
      return load(filename);
    default:
      console.log('Incorrect file format');
  }

  return format;
};

export default parse;
