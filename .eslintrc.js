module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
  },
};
