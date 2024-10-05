import {showMessage} from 'react-native-flash-message';

export const showErrorNotifcation = (message: string) => {
  showMessage({
    message: message,
    type: 'danger',
  });
};
