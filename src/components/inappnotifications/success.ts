import {showMessage} from 'react-native-flash-message';
export const showSuccessNotifcation = (message: string) => {
  showMessage({
    message: message,
    type: 'success',
  });
};
