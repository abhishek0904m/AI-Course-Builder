import axios from 'axios';

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || '/api';
  // Remove trailing slashes for consistency
  url = url.replace(/\/+$/, '');
  
  // Ensure /api suffix if it's an absolute URL
  if (url.startsWith('http') && !url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseURL()
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
