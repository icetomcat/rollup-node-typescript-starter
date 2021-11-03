const { resolve } = require('path')
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['jest', 'eslint-comments'],
  env: {
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'standard'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.eslint.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: { BigInt: true, console: true, WebAssembly: true, __buildDate__: 'readonly', __buildVersion__: 'readonly' },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'eslint-comments/disable-enable-pair': [
      'error',
      { allowWholeFile: true }
    ],
    'eslint-comments/no-unused-disable': 'error',
    'import/order': [
      'error',
      { 'newlines-between': 'always', alphabetize: { order: 'asc' } }
    ],
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true, ignoreCase: true }
    ]
  }
}