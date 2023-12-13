// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['plugin:svelte/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte'],
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      files: ['*.svelte.ts'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      files: ['*.svelte.js'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
      },
    },
  ],
}

module.exports = config
