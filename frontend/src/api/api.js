import axios from 'axios';

// This is the single point of truth for your API's location.
// It now points directly to your live backend server on Render.
const API = axios.create({
  baseURL: 'https://hirewise-backend-df5u.onrender.com/api',
});

// This interceptor correctly and automatically adds the authentication
// token to every request, which is essential for your live application.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
