import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const MailAuthButton = ({ onAuthSuccess }) => {
    const navigate = useNavigate();
    const MAILRU_CLIENT_ID = import.meta.env.VITE_MAILRU_CLIENT_ID;
    const MAILRU_REDIRECT_URI = import.meta.env.VITE_MAILRU_REDIRECT_URI;

    const handleMailruLogin = async () => {
        try {
            const authUrl = `https://oauth.mail.ru/login?client_id=${MAILRU_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(MAILRU_REDIRECT_URI)}&scope=userinfo`;
            window.location.href = authUrl;
        } catch (error) {
            console.error('Mail.ru auth error:', error);
        }
    };

    return (
        <button 
            onClick={handleMailruLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            <span className="inline-block mr-2">@</span>
            Войти через Mail.ru
        </button>
    );
};
