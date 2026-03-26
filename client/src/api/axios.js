import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';
const finalBaseURL = baseURL.startsWith('http') && !baseURL.endsWith('/api') 
  ? `${baseURL}/api` 
  : baseURL;

const api = axios.create({
  baseURL: finalBaseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
