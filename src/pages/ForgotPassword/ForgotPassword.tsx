"use client";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'antd';
import { Authorization } from '../SignUp/Authorization';
import './ForgotPassword.css';

const ua = {
  locale: 'ua',
  backend_locale: 'ua',
  login_page: {
    form: {
      email: 'Email',
    },
    handle_errors: {
      email_empty: 'Email обов\'язковий',
    },
  },
};

const errorModal = (messageError: string) => {
  Modal.error({
    title: 'Помилка',
    content: (
      <div className="text-left">
        <p className="text-[16px] mb-[10px] font-unbounded">{messageError}</p>
      </div>
    ),
    closable: true,
    centered: true,
    footer: null,
  });
};

const successModal = () => {
  Modal.success({
    title: 'Успіх',
    content: (
      <div className="text-left">
        <p className="text-[16px] mb-[10px] font-unbounded">
          Якщо користувач з таким email існує, ми надіслали інструкції для відновлення пароля на вашу пошту.
        </p>
      </div>
    ),
    closable: true,
    centered: true,
    footer: null,
  });
};

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError('');

    if (!email) {
      setMessageError(ua.login_page.handle_errors.email_empty);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/api/auth/password/reset/', { email });
      successModal();
      setTimeout(() => {
        navigate('/register');
      }, 2000);
    } catch (error: any) {
      console.error('Password reset error:', error);
      const errorMessage = error.response?.data?.detail || 'Помилка при відправці запиту на відновлення пароля';
      errorModal(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <Authorization lang={ua}>
        <div className="forgot-password-form-container">
          <h2 className="forgot-password-title">Відновлення пароля</h2>
          <p className="forgot-password-description">
            Введіть ваш email, і ми надішлемо вам інструкції для відновлення пароля.
          </p>
          
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input"
              placeholder={`${ua.login_page.form.email}*`}
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="forgot-password-button"
            >
              {isLoading ? 'Відправка...' : 'Відправити'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="forgot-password-back-button"
            >
              Назад до входу
            </button>
          </form>

          {messageError && (
            <div className="forgot-password-error">
              {messageError}
            </div>
          )}
        </div>
      </Authorization>
    </div>
  );
}



