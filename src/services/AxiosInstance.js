import axios from 'axios';
import { Logout } from '../store/actions/AuthActions';
import { useNavigate } from 'react-router-dom';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://back-end.anginat.com/api/', // replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

// Response interceptor to handle tokens and errors
api.interceptors.response.use(
  async (response) => {
    // Check if accessToken is in the response and save it
    if (response.data?.data?.accessToken) {
      const newToken = response.data.data.accessToken;
      localStorage.setItem('accessToken', `Bearer ${newToken}`);
      
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for "Invalid or expired token" message in the response
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === 'Invalid or expired token'
    ) {
      try {
        console.log(document.cookie)
        // Hit the refresh-token endpoint
        const refreshResponse = await api.post('auth/refresh-token');
        
        // Save the new token to localStorage
        const newToken = refreshResponse.data.data.accessToken;
        localStorage.setItem('accessToken', `Bearer ${newToken}`);

        // Update the Authorization header for the original request
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Handle token refresh failure (e.g., logout user)
        console.error('Token refresh failed:', refreshError);
        // Optionally, you could redirect to login page here
        const navigate = useNavigate();
        Logout(navigate)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
