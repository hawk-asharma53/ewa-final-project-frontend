import { store } from 'react-notifications-component';

export const toastMsg = (msg, error = false, autoClose = 2000) => {
  if (error) {
    store.addNotification({
      title: 'Error',
      message: msg,
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: autoClose,
        //   onScreen: true,
        showIcon: true,
      },
    });
  } else {
    store.addNotification({
      title: 'Success',
      message: msg,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: autoClose,
        //   onScreen: true,
        showIcon: true,
      },
    });
  }
};
