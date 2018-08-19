import { Dimensions, Platform } from 'react-native';

function isIphoneX() {
  if (Platform.OS === 'web') {
    return false;
  }
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export default isIphoneX();
