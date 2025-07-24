import axios from 'axios';

// This is the crucial change.
// It reads the REACT_APP_API_URL environment variable you set on Vercel.
// If it can't find it (like when you are running the app locally),
// it will default to your local backend server address.
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const API = axios.create({
  baseURL: API_URL,
});

// This part of your file was already correct.
// It automatically adds the authentication token to every API request.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
