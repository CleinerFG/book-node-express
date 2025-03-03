module.exports = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      process: 'readonly',
      jest: 'readonly',
    },
  },

  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    eqeqeq: ['error', 'always'],
    'no-unused-vars': ['error'],
  },
};
