import React, { useEffect } from 'react';
import { useAuth } from '@context/AuthContext';
import api from '@api/api';
import axios from 'axios';

export const MailAuthButton = () => {
    const { login } = useAuth();
    const MAILRU_CLIENT_ID = import.meta.env.VITE_MAILRU_CLIENT_ID || '890ea7b9c21d4fe98aeccd1a457dc9fc';

    useEffect(() => {
        const handleMailruAuth = async (userData) => {
            try {
                const response = await axios.post(
                    'https://eventmaster2.onrender.com/api/auth/mailru', 
                    {
                        code: userData.code,
                        email: userData.email
                    }
                );
                login(response.data.access_token);
            } catch (error) {
                console.error('Mail.ru auth failed:', error);
            }
        };

        const script = document.createElement('script');
        script.src = 'https://oauth.mail.ru/sdk/v0.18.0/oauth.js';
        script.async = true;
        
        script.onload = () => {
          if (window.MR) {
            window.MR.init({
              clientId: import.meta.env.VITE_MAILRU_CLIENT_ID || '890ea7b9c21d4fe98aeccd1a457dc9fc',
              redirectUri: 'https://table-games.netlify.app/auth/mailru-callback', // Точный адрес
              scope: 'userinfo',
              onlogin: (response) => {
                if (response.code) handleAuth(response.code);
              }
            });
          }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [login, MAILRU_CLIENT_ID]);

    return null; // Этот компонент теперь только инициализирует SDK
};
