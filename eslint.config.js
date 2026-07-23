const js = require('@eslint/js');
const cypress = require('eslint-plugin-cypress');

module.exports = [
  js.configs.recommended,
  cypress.configs.globals,
  cypress.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
    },
  },
  {
    ignores: ['node_modules/', 'cypress/reports/', 'cypress/screenshots/', 'cypress/videos/', 'cypress/downloads/'],
  },
];
