import api from './api';

export const UsersAPI = {
  // Регистрация
  register: async (username, email, password) => {
    try {
      const response = await api.post('/auth/signup', { username, email, password });
      if (!response.data?.access_token) {
        throw new Error("Токен не получен");
      }
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Авторизация
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (!response.data?.access_token) {
        throw new Error("Токен не получен");
      }
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Получение профиля
  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      throw error;
    }
  },

  // Обновление профиля (Я ВЕРНУЛ ЭТОТ МЕТОД!)
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/me', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Выход
  logout: () => {
    localStorage.removeItem('token');
  }
};
