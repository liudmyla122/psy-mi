"use client";
import { Alert, Modal, Select } from 'antd';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

type Lang = {
  locale: string;
  backend_locale: string;
  login_page: any;
};

const success = (lang: Lang) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <div className="text-left">
        <p className="text-[16px] mb-[10px] font-unbounded">
          {lang.login_page.created_profile.success_modal.register_text}
        </p>
        <a className="ant-btn ant-btn-primary ml-[50px] md:ml-[40px]" href={`/${lang.locale}/my-profile`}>
          <span className="text-white">{lang.login_page.created_profile.success_modal.link}</span>
        </a>
      </div>
    ),
    closable: true,
    centered: true,
    footer: null,
  });
};

const errorModal = (messageError: string, lang: Lang) => {
  Modal.error({
    title: lang.login_page.created_profile.error_modal.title,
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

export function Form({ lang }: { lang: Lang }) {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [scope, setScope] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [messageError, setMessageError] = useState('');

  const onCloseErrorAlert = () => setMessageError('');

  // Обработка автозаполнения браузера - синхронизация состояния React с автозаполнением
  useEffect(() => {
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;

    if (emailInput && passwordInput) {
      // Функция для синхронизации значений из DOM в состояние React
      const syncValues = () => {
        // Небольшая задержка, чтобы браузер успел заполнить поля
        setTimeout(() => {
          if (emailInput.value && emailInput.value !== email) {
            setEmail(emailInput.value);
          }
          if (passwordInput.value && passwordInput.value !== password) {
            setPassword(passwordInput.value);
          }
        }, 100);
      };

      // Для формы входа - более агрессивная проверка автозаполнения
      let checkInterval: NodeJS.Timeout | null = null;
      if (isLoginForm) {
        // Проверяем сразу при монтировании формы входа
        checkInterval = setInterval(() => {
          if (emailInput.value && emailInput.value !== email) {
            setEmail(emailInput.value);
          }
          if (passwordInput.value && passwordInput.value !== password) {
            setPassword(passwordInput.value);
          }
        }, 200);

        // Останавливаем проверку через 3 секунды (браузер обычно заполняет сразу)
        setTimeout(() => {
          if (checkInterval) {
            clearInterval(checkInterval);
          }
        }, 3000);
      }

      // Слушаем события, которые могут указывать на автозаполнение
      emailInput.addEventListener('input', syncValues);
      passwordInput.addEventListener('input', syncValues);
      
      // Проверяем при фокусе (браузер может заполнить поля при фокусе)
      emailInput.addEventListener('focus', syncValues);
      passwordInput.addEventListener('focus', syncValues);

      // Также проверяем при загрузке страницы (на случай, если браузер уже заполнил поля)
      syncValues();

      return () => {
        if (checkInterval) {
          clearInterval(checkInterval);
        }
        emailInput.removeEventListener('input', syncValues);
        passwordInput.removeEventListener('input', syncValues);
        emailInput.removeEventListener('focus', syncValues);
        passwordInput.removeEventListener('focus', syncValues);
      };
    }
  }, [isLoginForm, email, password]);

  // Очистка полей при переключении между формами
  useEffect(() => {
    if (isLoginForm) {
      // При переключении на форму входа - не очищаем, чтобы браузер мог заполнить
      // Но сбрасываем ошибки
      setMessageError('');
    } else {
      // При переключении на форму регистрации - очищаем пароль
      setPassword('');
      setRepeatedPassword('');
      setMessageError('');
    }
  }, [isLoginForm]);

  const handleSubmitLogin = async () => {
    const data = { email, password };
    try {
      const loginResponse = await axios.post(
        `http://localhost:3000/api/auth/token/login/`,
        data
      );
      if (loginResponse.data.auth_token) {
        localStorage.setItem('authToken', loginResponse.data.auth_token);
        window.location.href = `/${lang.locale}/my-profile`;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.data) {
        const fieldError = Object.values(error.response.data)[0] as string[] | undefined;
        if (Array.isArray(fieldError) && fieldError.length > 0) {
          errorModal(fieldError[0], lang);
        } else {
          const errorMessage = error.response.data.detail || error.response.data.message || 'Помилка входу. Перевірте email та пароль.';
          errorModal(errorMessage, lang);
        }
      } else {
        errorModal('Помилка підключення до сервера. Спробуйте пізніше.', lang);
      }
    }
  };

  const handleSubmitRegister = async () => {
    const data = {
      first_name: firstName,
      password: password,
      re_password: repeatedPassword,
      email: email,
      scope: scope,
    };
    try {
      await axios.post(`http://localhost:3000/api/auth/users/`, data);
      const loginResponse = await axios.post(
        `http://localhost:3000/api/auth/token/login/`,
        { email: data.email, password: data.password }
      );
      if (loginResponse.data.auth_token) {
        localStorage.setItem('authToken', loginResponse.data.auth_token);
        // Показываем модальное окно успеха
        success(lang);
        // Даем браузеру время предложить сохранить пароль перед редиректом
        setTimeout(() => {
          window.location.href = `/${lang.locale}/my-profile`;
        }, 1500);
      }
    } catch (error: any) {
      const fieldError = Object.values(error.response?.data ?? {})[0] as string[] | undefined;
      if (Array.isArray(fieldError) && fieldError.length > 0) {
        errorModal(fieldError[0], lang);
      }
    }
  };

  const handleRegistrationButton = () => {
    if (email === '') return setMessageError(lang.login_page.handle_errors.email_empty);
    if (firstName === '') return setMessageError(lang.login_page.handle_errors.email_empty);
    if (password === '') return setMessageError(lang.login_page.handle_errors.password_empty);
    if (password !== repeatedPassword)
      return setMessageError(lang.login_page.handle_errors.password_match_error);
    if (scope === '') return setMessageError(lang.login_page.handle_errors.scope_empty);
    setMessageError('');
    handleSubmitRegister();
  };

  const handleLoginButton = () => {
    if (email === '') return setMessageError(lang.login_page.handle_errors.email_empty);
    if (password === '') return setMessageError(lang.login_page.handle_errors.password_empty);
    setMessageError('');
    handleSubmitLogin();
  };

  return (
    <div className="mb-[50px] md:mb-0 w-full md:w-[350px] bg-white flex flex-col items-center pt-[25px] px-[30px] pb-[30px] rounded-[15px] shadow-sm">
      <h2 className="text-center text-[#347AEC] font-unbounded text-[24px] font-normal mb-[25px]">
        {!isLoginForm ? lang.login_page.form.header_sign_up : lang.login_page.form.header_login}
      </h2>

      <form 
        ref={formRef}
        className="w-full max-w-[280px] flex flex-col items-center gap-[15px]" 
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoginForm) {
            handleRegistrationButton();
          } else {
            handleLoginButton();
          }
        }}
        id={isLoginForm ? "login-form" : "register-form"}
        autoComplete={isLoginForm ? "on" : "off"}
        method="post"
        action={isLoginForm ? "/api/auth/token/login/" : "/api/auth/users/"}
      >
        <input
          ref={emailRef}
          type="email"
          name="email"
          id={isLoginForm ? "login-email" : "register-email"}
          autoComplete={isLoginForm ? "username" : "email"}
          data-form-type={isLoginForm ? "login" : "signup"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
          placeholder={`${lang.login_page.form.email}*`}
          required
        />

        {!isLoginForm && (
          <input
            type="text"
            name="first_name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
            placeholder={`${lang.login_page.form.first_name}*`}
            required
          />
        )}

        <input
          ref={passwordRef}
          type="password"
          name="password"
          id={isLoginForm ? "login-password" : "register-password"}
          autoComplete={isLoginForm ? "current-password" : "new-password"}
          data-form-type={isLoginForm ? "login" : "signup"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
          placeholder={`${lang.login_page.form.password}*`}
          required
        />

        {!isLoginForm && (
          <>
            <input
              type="password"
              name="re_password"
              autoComplete="new-password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
              placeholder={`${lang.login_page.form.re_password}*`}
              required
            />
            <Select
              className="scope-select-antd"
              placeholder={lang.login_page.form.scope_placeholder ?? 'Field of Activity*'}
              value={scope || undefined}
              onChange={(value) => setScope(value)}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: 'CEO & Founder', label: 'CEO & Founder' },
                { value: 'CEO', label: 'CEO' },
                { value: 'C-Level спеціаліст', label: 'C-Level спеціаліст' },
                { value: 'Junior спеціаліст', label: 'Junior спеціаліст' },
                { value: 'Middle спеціаліст', label: 'Middle спеціаліст' },
                { value: 'Senior спеціаліст', label: 'Senior спеціаліст' },
                { value: 'Lead спеціаліст', label: 'Lead спеціаліст' },
                { value: 'Team Lead', label: 'Team Lead' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Project Manager', label: 'Project Manager' },
                { value: 'Product Manager', label: 'Product Manager' },
                { value: 'Director', label: 'Director' },
                { value: 'VP', label: 'VP' },
                { value: 'Founder', label: 'Founder' },
                { value: 'Co-Founder', label: 'Co-Founder' },
                { value: 'HRD', label: 'HRD' },
                { value: 'HRG', label: 'HRG' },
                { value: 'HR Manager', label: 'HR Manager' },
                { value: 'HR Specialist', label: 'HR Specialist' },
                { value: 'CTO', label: 'CTO' },
                { value: 'CFO', label: 'CFO' },
                { value: 'CMO', label: 'CMO' },
                { value: 'COO', label: 'COO' },
                { value: 'Head of', label: 'Head of' },
                { value: 'Department Head', label: 'Department Head' },
                { value: 'Executive', label: 'Executive' },
                { value: 'Consultant', label: 'Consultant' },
                { value: 'Freelancer', label: 'Freelancer' },
                { value: 'Entrepreneur', label: 'Entrepreneur' },
                { value: 'Business Owner', label: 'Business Owner' },
                { value: 'Student', label: 'Student' },
                { value: 'Intern', label: 'Intern' },
                { value: 'Trainee', label: 'Trainee' },
                { value: 'Other', label: 'Other' },
              ]}
            />
          </>
        )}

        {!isLoginForm && (
          <div className="w-full bg-[#FFF8E1] border border-[#FFB74D] rounded-lg p-4 mt-[28px]">
            <ul className="space-y-2 text-[14px]">
              <li className={`flex items-start ${/^.{8,16}$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 mt-1 ${/^.{8,16}$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                </span>
                <span className={/^.{8,16}$/.test(password) ? 'line-through' : ''}>
                  {lang.login_page.handle_errors.alert_modal.password_length}
                </span>
              </li>
              <li className={`flex items-start ${/^\S*$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 mt-1 ${/^\S*$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                </span>
                <span className={/^\S*$/.test(password) ? 'line-through' : ''}>
                  {lang.login_page.handle_errors.alert_modal.password_spacing}
                </span>
              </li>
              <li className={`flex items-start ${/^(?=.*[A-Z]).*$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 mt-1 ${/^(?=.*[A-Z]).*$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                </span>
                <span className={/^(?=.*[A-Z]).*$/.test(password) ? 'line-through' : ''}>
                  {lang.login_page.handle_errors.alert_modal.password_uppercase}
                </span>
              </li>
              <li className={`flex items-start ${/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 mt-1 ${/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password) ? 'text-green-600' : 'text-red-600'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                </span>
                <span className={/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password) ? 'line-through' : ''}>
                  {lang.login_page.handle_errors.alert_modal.password_spec_key} (!@#$%^&*)
                </span>
              </li>
              <li className={`flex items-start ${password === repeatedPassword && repeatedPassword !== '' ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-2 mt-1 ${password === repeatedPassword && repeatedPassword !== '' ? 'text-green-600' : 'text-red-600'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="5" />
                  </svg>
                </span>
                <span className={password === repeatedPassword && repeatedPassword !== '' ? 'line-through' : ''}>
                  {lang.login_page.handle_errors.alert_modal.passwords_match}
                </span>
              </li>
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="font-unbounded w-[calc(100%-40px)] h-[45px] text-[14px] font-normal rounded-full bg-[#347AEC] hover:bg-[#6764E7] text-white transition-colors mt-[23px] mx-auto"
        >
          {!isLoginForm
            ? lang.login_page.created_profile.register_btn
            : lang.login_page.created_profile.login_btn}
        </button>

        {isLoginForm && (
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="font-unbounded text-[#347AEC] hover:text-[#6764E7] text-[12px] mt-2 underline w-full"
          >
            Забули пароль?
          </button>
        )}
      </form>
      <div className="text-center mt-[26px] text-[18px]">
        {!isLoginForm ? (
          <div className="flex flex-col items-center">
            <span className="font-unbounded text-[#347AEC] text-[16px]">Already have an account?</span>
            <button
              className="font-unbounded text-[#347AEC] hover:text-[#6764E7] duration-500 font-medium text-[16px] mt-1"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              Log in
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-[#347AEC]">Need an account?</span>
            <button
              className="text-[#347AEC] hover:text-[#6764E7] duration-500 font-medium mt-1"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
      {messageError && (
        <Alert
          className="mt-[30px] md:mt-[15px] rounded-[0px]"
          message={messageError}
          type="info"
          closable
          onClose={onCloseErrorAlert}
        />
      )}
    </div>
  );
}


