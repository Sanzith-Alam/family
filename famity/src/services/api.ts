import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // IMPORTANT: Replace with your actual backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor for authentication tokens (if your API uses them)
api.interceptors.request.use(
  (config) => {
    // Example: get token from localStorage or your AuthContext
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add an interceptor for response errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.error('Unauthorized access. Redirecting to login...');
      // window.location.href = '/login'; // Example redirect
    }
    return Promise.reject(error);
  }
);

export default api;