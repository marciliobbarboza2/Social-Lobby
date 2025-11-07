import { API_ENDPOINTS, getAuthHeader, API_CONFIG } from '../config/api';

// API request wrapper with retry logic
const fetchWithRetry = async (url, options, retries = API_CONFIG.RETRY_ATTEMPTS) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    const response = await fetch(url, {
      ...options,
      credentials: API_CONFIG.CREDENTIALS,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }
    
    return await response.json();
  } catch (error) {
    if (retries > 0 && !error.name === 'AbortError') {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const authService = {
  // Register new user
  register: async (userData) => {
    return fetchWithRetry(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
  },

  // Login user
  login: async (credentials) => {
    return fetchWithRetry(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
  },

  // Logout user
  logout: async () => {
    return fetchWithRetry(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
      headers: {
        ...getAuthHeader()
      }
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return fetchWithRetry(API_ENDPOINTS.AUTH.ME, {
      method: 'GET',
      headers: {
        ...getAuthHeader()
      }
    });
  },

  // Delete account
  deleteAccount: async () => {
    return fetchWithRetry(API_ENDPOINTS.USERS.ME, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      }
    });
  }
};