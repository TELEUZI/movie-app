module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'warn',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            overrides: {
              accessors: 'explicit',
              constructors: 'no-public',
              properties: 'explicit',
              parameterProperties: 'explicit',
            },
          },
        ],
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
          },
        ],
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.html'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'lf',
          },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
  ],
};
