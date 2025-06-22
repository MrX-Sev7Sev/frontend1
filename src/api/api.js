import axios from 'axios';

const API_URL = 'https://eventmaster2.onrender.com'; // URL твоего backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавление токена в заголовки запросов (для авторизованных запросов)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Добавляем Bearer
    console.log('Токен добавлен в заголовок:', token); // Логируем
  }
  return config;
});

export default api;
