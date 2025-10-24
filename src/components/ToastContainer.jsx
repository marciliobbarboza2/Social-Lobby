import React from 'react';
import { useSocialLobbyContext } from '../SocialLobbyContext';
import Toast from '../Toast';

const ToastContainer = () => {
  const { toastProps } = useSocialLobbyContext();
  const { toasts, removeToast } = toastProps;

  return (
    <div className="toast-container">
      {toasts.map(toast => <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />)}
    </div>
  );
};

export default ToastContainer;