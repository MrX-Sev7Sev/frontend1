import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export default function MailruCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const authenticate = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const handleMailruLogin = () => {
            // Генерация state
            const state = Math.random().toString(36).substring(2);
            localStorage.setItem('oauth_state', state);
        
            // Формирование URL
            const authUrl = `https://oauth.mail.ru/login?client_id=890ea7b9c21d4fe98aeccd1a457dc9fc&response_type=code&state=${state}&redirect_uri=${encodeURIComponent('https://table-games.netlify.app/auth/callback')}`;
            
            // Перенаправление
            window.location.href = authUrl;
          };
        
          return (
            <button 
              onClick={handleMailruLogin}
              className="mailru-auth-button"
            >
              Войти с Mail.ru
            </button>
          );
        };
            
            if (!code) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post('/auth/mailru', { code });
                login(response.data.access_token);
                navigate('/dashboard');
            } catch (error) {
                console.error('Mail.ru auth failed:', error);
                navigate('/login?error=mailru_auth');
            }
        };

        authenticate();
    }, [navigate, login]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Авторизация через Mail.ru...</p>
            </div>
        </div>
    );
}
