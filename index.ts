import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import App from './src/components/App';

LogBox.ignoreLogs([
  'Warning: componentWillMount has been renamed',
  'Warning: componentWillReceiveProps has been renamed',
]);

export default registerRootComponent(App);
