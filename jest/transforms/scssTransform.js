/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const camelCase = require('lodash.camelcase');

// This is a custom Jest transformer turning SCSS modules into proxies
// that supplies the class name with a prefix.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process (src, filename) {
    const camelCaseFilename = camelCase(path.parse(filename).name);

    return {
      code: `
        const handler = {
          get(target, prop, receiver) {
            return '${camelCaseFilename}.' + prop.toString();
          },
        };

        module.exports = {
          __esModule: true,
          default: new Proxy({}, handler),
        };
      `,
    };
  },
};
