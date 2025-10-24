import React, { useEffect, useState, useMemo } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const icons = useMemo(() => ({
    success: <FaCheckCircle />,
    error: <FaTimesCircle />,
    info: <FaInfoCircle />,
  }), []);

  const handleClose = () => {
    setIsFadingOut(true);
  };

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Trigger the actual close after the fade-out animation
  useEffect(() => {
    if (isFadingOut) {
      const fadeOutTimer = setTimeout(onClose, 300); // Match animation duration
      return () => clearTimeout(fadeOutTimer);
    }
  }, [isFadingOut, onClose]);

  return (
    <div className={`toast toast-${type} ${isFadingOut ? 'toast-fade-out' : ''}`} onClick={handleClose}>
      <div className="toast-icon">
        {icons[type]}
      </div>
      <div className="toast-message">{message}</div>
      <div 
        className="toast-progress" 
        style={{ animationDuration: `${duration}ms` }}></div>
    </div>
  );
};

export default Toast;