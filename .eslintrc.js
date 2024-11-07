// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    // `expo` must come after `standard` or its globals configuration will be overridden
    'expo',
    // `jsx-runtime` must come after `expo` or it will be overridden
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: ['prettier', 'unused-imports', 'simple-import-sort'],
  ignorePatterns: ['/dist/*'],
  rules: {
    'prettier/prettier': 'error',
    // typescript-eslint
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-wrapper-object-types': 'off',
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: true,
      },
    ], // Ensure `import type` is used when it's necessary
    // eslint
    'no-use-before-define': 0,
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // Prefer named exports from 'react' instead of importing `React`
          {
            name: 'react',
            importNames: ['default'],
            message: "Import named exports from 'react' instead.",
          },
        ],
      },
    ],
    'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
    'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // react
    'react/prop-types': 0,
    // react-native
    'react-native/no-raw-text': 0,
    // eslint-config-standard overrides
    'comma-dangle': 0,
    'no-global-assign': 0,
    'quotes': 0,
    'space-before-function-paren': 0,
    'react-hooks/exhaustive-deps': 'off',
    'camelcase': 'off',
  },
  overrides: [
    {
      files: ['test/setup.ts', '**/tests/**/*', '**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
      rules: {
        'unused-imports/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}
