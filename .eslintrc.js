module.exports = {
  // Environment settings
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  // Parser settings
  parser: '@typescript-eslint/parser',
  // Optional parser settings
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  // Extension and rule settings
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  // Plugin settings
  plugins: ['react', '@typescript-eslint', 'prettier', 'jest', 'simple-import-sort', 'unused-imports'],
  // Rule settings
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', // Disables checking for explicit return types
    '@typescript-eslint/ban-types': 'warn', // Warning for banning certain types
    '@typescript-eslint/ban-ts-comment': 'off', // Disables @ts-ignore comments
    '@typescript-eslint/no-explicit-any': 'warn', // Warning for calling functions with an argument of type any
    '@typescript-eslint/no-unused-vars': 'off', // Disables declarations of unused variables in TS files
    'react/no-array-index-key': 'error', // Error for array index keys in JSX
    'react/function-component-definition': [
      'error',
      {namedComponents: 'arrow-function', unnamedComponents: 'arrow-function'},
    ],
    'react/react-in-jsx-scope': 'off', // Disables the requirement to import React in JSX files
    'react/jsx-props-no-spreading': 'warn', // Warning for spreading props to components
    'unused-imports/no-unused-imports': 'error', // Error for unused imports
    'simple-import-sort/imports': ['warn', {groups: [['^react'], ['^@?\\w'], ['@/(.*)'], ['^[./]']]}], // Warning for import sorting
  },
  // Additional configuration
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
};
