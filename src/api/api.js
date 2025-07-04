import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eventmaster2.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Интерсептор для автоматической подстановки токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Интерсептор для обработки 401 ошибки
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Вместо перезагрузки:
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'; // или используйте навигацию React Router
      }
    }
    return Promise.reject(error);
  }
);

export default api;
