module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['@typescript-eslint', 'testing-library', 'jest', 'no-type-assertion', 'custom-rules'],
  extends: ['universe/native', 'plugin:testing-library/react', 'plugin:jest/recommended'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        name: 'redux-mock-store',
        message: 'Dont create your own store, please use test/store/testStore.tsx',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'import/named': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'node/handle-callback-err': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/consistent-test-it': ['error', {fn: 'it', withinDescribe: 'it'}],
    'jest/expect-expect': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-commented-out-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/valid-expect': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/no-wait-for-multiple-assertions': 'warn',
    'testing-library/no-unnecessary-act': 'error',
    'testing-library/no-wait-for-side-effects': 'warn',
    'no-type-assertion/no-type-assertion': 'off',
    'custom-rules/restrict-setup-action-mock-store': 'off',
    'custom-rules/restrict-create-action-mock-store': 'off',
  },
  overrides: [
    {
      files: ['test/store/testStore.tsx'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['*.spec.*', '*.test.*'],
      rules: {
        'no-type-assertion/no-type-assertion': 'error',
        'custom-rules/restrict-setup-action-mock-store': 'error',
        'custom-rules/restrict-create-action-mock-store': 'error',
      },
    },
  ],
};
