import axios from 'axios';

const APIAuthenticated = axios.create({
  baseURL: 'https://ecommerce-platform-2sjj.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add interceptor to attach token dynamically
APIAuthenticated.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const API = axios.create({
  baseURL: 'https://ecommerce-platform-2sjj.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export { APIAuthenticated, API };
