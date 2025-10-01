export const createNativeStackNavigator = jest.fn(() => {
  return {
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  };
});
