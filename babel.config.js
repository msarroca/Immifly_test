module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './src/app',
          '@features': './src/features',
          '@screens': './src/screens',
          '@components': './src/components',
          '@lib': './src/lib',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@models': './src/models',
        },
      },
    ],
  ],
};
