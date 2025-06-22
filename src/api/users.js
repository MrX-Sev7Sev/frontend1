import api from './api';

export const UsersAPI = {
  // Регистрация нового пользователя
  register: async (username, email, password) => {
    try {
      const response = await api.post('api/auth/signup', {
        username: username,
        email: email,
        password: password,
      });
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Авторизация пользователя
  login: async (email, password) => {
    try {
      const response = await api.post('api/auth/login', {
        email,
        password,
      });
    localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Получение профиля пользователя
  getProfile: async () => {
    try {
      const response = await api.get('api/users/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Обновление профиля пользователя
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('api/users/me', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
