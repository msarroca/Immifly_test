module.exports = {
  root: true,
  extends: [
    '@react-native', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:prettier/recommended', 
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
   
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        semi: true,
        printWidth: 100,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/react-in-jsx-scope': 'off',
  },
};
