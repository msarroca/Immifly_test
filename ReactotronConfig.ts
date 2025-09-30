import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({ name: 'Immfly_test' }) // opcional: pon el nombre de tu app
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
