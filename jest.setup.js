import 'react-native-gesture-handler/jestSetup';
import { Alert } from 'react-native';
jest.spyOn(Alert, 'alert').mockImplementation(() => {});
