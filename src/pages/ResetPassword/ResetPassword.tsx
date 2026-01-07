"use client";
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'antd';
import { Authorization } from '../SignUp/Authorization';
import './ResetPassword.css';

const ua = {
  locale: 'ua',
  backend_locale: 'ua',
  login_page: {
    form: {
      password: 'Пароль',
      re_password: 'Повторіть пароль',
    },
    handle_errors: {
      password_empty: 'Пароль обов\'язковий',
      password_match_error: 'Паролі не співпадають',
    },
    created_profile: {
      success_modal: {
        title: 'Успіх',
        register_text: 'Пароль успішно змінено. Тепер ви можете увійти з новим паролем.',
        link: 'Перейти до входу',
      },
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

const successModal = (lang: typeof ua, onSuccess: () => void) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <div className="text-left">
        <p className="text-[16px] mb-[10px] font-unbounded">
          {lang.login_page.created_profile.success_modal.register_text}
        </p>
        <a 
          className="ant-btn ant-btn-primary ml-[50px] md:ml-[40px]" 
          href="/register"
          onClick={(e) => {
            e.preventDefault();
            onSuccess();
          }}
        >
          <span className="text-white">{lang.login_page.created_profile.success_modal.link}</span>
        </a>
      </div>
    ),
    closable: true,
    centered: true,
    footer: null,
  });
};

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    if (!token) {
      setTokenError('Токен відновлення пароля відсутній. Будь ласка, перевірте посилання з email.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError('');

    if (!token) {
      setTokenError('Токен відновлення пароля відсутній.');
      return;
    }

    if (!password) {
      setMessageError(ua.login_page.handle_errors.password_empty);
      return;
    }

    if (password !== repeatedPassword) {
      setMessageError(ua.login_page.handle_errors.password_match_error);
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setMessageError('Пароль повинен містити від 8 до 16 символів.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/api/auth/password/reset/confirm/', {
        token,
        new_password: password,
        re_password: repeatedPassword,
      });
      successModal(ua, () => {
        navigate('/register');
      });
    } catch (error: any) {
      console.error('Password reset confirm error:', error);
      const errorMessage = error.response?.data?.detail || 'Помилка при зміні пароля';
      errorModal(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenError) {
    return (
      <div className="reset-password-page">
        <Authorization lang={ua}>
          <div className="reset-password-form-container">
            <div className="reset-password-error">
              {tokenError}
            </div>
            <button
              onClick={() => navigate('/forgot-password')}
              className="reset-password-back-button"
            >
              Запросити новий токен
            </button>
          </div>
        </Authorization>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <Authorization lang={ua}>
        <div className="reset-password-form-container">
          <h2 className="reset-password-title">Встановлення нового пароля</h2>
          <p className="reset-password-description">
            Введіть новий пароль для вашого облікового запису.
          </p>
          
          <form onSubmit={handleSubmit} className="reset-password-form">
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="reset-password-input"
              placeholder={`${ua.login_page.form.password}*`}
              required
              disabled={isLoading}
            />

            <input
              type="password"
              name="re_password"
              autoComplete="new-password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="reset-password-input"
              placeholder={`${ua.login_page.form.re_password}*`}
              required
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="reset-password-button"
            >
              {isLoading ? 'Зміна пароля...' : 'Змінити пароль'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="reset-password-back-button"
            >
              Назад до входу
            </button>
          </form>

          {messageError && (
            <div className="reset-password-error">
              {messageError}
            </div>
          )}
        </div>
      </Authorization>
    </div>
  );
}



