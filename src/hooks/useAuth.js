import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

/**
 * Custom hook for managing user authentication.
 * @returns {object} - An object containing authentication state and handler functions.
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return true;
    
    try {
      const decoded = jwt_decode(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }, []);

  // Auto logout on token expiry
  useEffect(() => {
    const checkTokenExpiry = () => {
      if (isLoggedIn && isTokenExpired()) {
        handleLogout();
      }
    };

    const tokenCheckInterval = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(tokenCheckInterval);
  }, [isLoggedIn, isTokenExpired]);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired()) {
      authService.getCurrentUser()
        .then(data => {
          if (data.success) {
            setIsLoggedIn(true);
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, [isTokenExpired]);

  const handleLogin = async (email, password) => {
    const emailToLogin = email || loginEmail;
    const passwordToLogin = password || loginPassword;

    if (!emailToLogin || !passwordToLogin) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login({
        email: emailToLogin,
        password: passwordToLogin
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setCurrentUser(null);
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.deleteAccount();
      if (data.success) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
      } else {
        setError('Failed to delete account');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    currentUser,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    handleLogout,
    handleDeleteAccount,
    isLoading,
    error,
    setError
  };
};