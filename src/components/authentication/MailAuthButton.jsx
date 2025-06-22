import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export const MailAuthButton = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const MAILRU_CLIENT_ID = import.meta.env.VITE_MAILRU_CLIENT_ID || '890ea7b9c21d4fe98aeccd1a457dc9fc';

    const handleMailruAuth = useCallback((userData) => {
        if (userData) {
            axios.post('/auth/mailru', { 
                email: userData.email,
                access_token: userData.token
            })
            .then(response => {
                login(response.data.access_token);
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Mail.ru auth failed:', error);
                navigate('/login?error=mailru_auth');
            });
        }
    }, [login, navigate]);

    useEffect(() => {
        // Динамически загружаем скрипт SDK
        const script = document.createElement('script');
        script.src = 'https://oauth.mail.ru/sdk/v0.18.0/oauth.js';
        script.async = true;
        
        script.onload = () => {
            if (window.MR) {
                window.MR.init({
                    clientId: MAILRU_CLIENT_ID,
                    onlogin: (state) => {
                        if (state.user) {
                            handleMailruAuth({
                                email: state.user.email,
                                token: state.access_token
                            });
                        }
                    },
                    onlogout: () => {
                        console.log('Вы вышли из Mail.ru');
                    }
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [MAILRU_CLIENT_ID, handleMailruAuth]);

    return (
        <div 
            className="mailru-login-button" 
            data-ui="login_as userpic" 
            data-type="login" 
            style={{ width: 300, height: 48, cursor: 'pointer' }}
            onClick={() => window.MR && window.MR.login()}
        ></div>
    );
};
