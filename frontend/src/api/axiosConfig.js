import axios from 'axios';

let accessToken = '';

export const setAccessToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  // Dynamically switch between local and production backend
  baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api' 
    : 'https://storybase-q754.onrender.com/api',
  withCredentials: true, // Enable cookie support
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and we haven't already retried this request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.post(`${api.defaults.baseURL}/auth/refresh-token`, {}, {
          withCredentials: true
        });
        
        const { access_token } = response.data;
        setAccessToken(access_token);

        // Update the header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, clear access token and redirect to login
        setAccessToken('');
        
        // Only redirect if not already on login or landing page
        if (!['/login', '/signup', '/'].includes(window.location.pathname)) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
