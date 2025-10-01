const actualNav = jest.requireActual('@react-navigation/native');

module.exports = {
  ...actualNav,
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  }),
};
