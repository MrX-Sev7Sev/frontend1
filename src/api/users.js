import api from './api';

export const UsersAPI = {
  // Регистрация нового пользователя
  register: async (username, email, password) => {
    try {
      const response = await api.post('/auth/signup', { username, email, password });
      if (!response.data.access_token) {
        throw new Error("Токен не получен от сервера");
      } // <- Добавлена закрывающая скобка
      console.log('Токен сохранён:', response.data.access_token); 
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Авторизация пользователя
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { username, email, password });
      if (!response.data.access_token) {
        throw new Error("Токен не получен от сервера");
      } // <- Добавлена закрывающая скобка
      console.log("Отправляемые данные:", { email, password });
      console.log("Ответ сервера:", response.data);
      console.log('Токен сохранён:', response.data.access_token); 
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Получение профиля пользователя
  getProfile: async () => {
    try {
      const response = await api.get('/users/me');
      console.log(localStorage.getItem('token')); // Должен выводить JWT-токен
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token'); // Удаляем невалидный токен
      }
      throw error;
    }
  },

  // Обновление профиля пользователя
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/me', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
