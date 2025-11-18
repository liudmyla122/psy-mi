"use client";
import { Alert, Modal } from 'antd';
import axios from 'axios';
import { useRef, useState } from 'react';

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
        <a className="ant-btn ant-btn-primary ml-[50px] md:ml-[40px]" href={`/${lang.locale}/get-tested`}>
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
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [scope, setScope] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [messageError, setMessageError] = useState('');

  const onCloseErrorAlert = () => setMessageError('');

  const handleSubmitLogin = async () => {
    const data = { email, password };
    try {
      const loginResponse = await axios.post(
        `https://psymi.com.ua/${lang.backend_locale}/api/auth/token/login/`,
        data
      );
      if (loginResponse.data.auth_token) {
        localStorage.setItem('authToken', loginResponse.data.auth_token);
        window.location.href = `/tests`;
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
      await axios.post(`https://psymi.com.ua/${lang.backend_locale}/api/auth/users/`, data);
      const loginResponse = await axios.post(
        `https://psymi.com.ua/${lang.backend_locale}/api/auth/token/login/`,
        { email: data.email, password: data.password }
      );
      if (loginResponse.data.auth_token) {
        localStorage.setItem('authToken', loginResponse.data.auth_token);
        window.location.href = `/tests`;
        success(lang);
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

      <form className="w-full max-w-[280px] flex flex-col items-center gap-[15px]" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={emailRef}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
          placeholder={`${lang.login_page.form.email}*`}
        />

        {!isLoginForm && (
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
            placeholder={`${lang.login_page.form.first_name}*`}
          />
        )}

        <input
          ref={passwordRef}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
          placeholder={`${lang.login_page.form.password}*`}
        />

        {!isLoginForm && (
          <>
            <input
              type="password"
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="font-unbounded w-full text-[11px] placeholder:text-[11px] placeholder:text-gray-500 bg-gray-50 rounded-lg h-[35px] px-4 focus:outline-none focus:bg-white"
              placeholder={`${lang.login_page.form.re_password}*`}
            />
            <div className="relative w-full">
              <select
                className="font-unbounded w-full text-[11px] h-[35px] px-4 pr-10 bg-gray-50 rounded-lg focus:outline-none focus:bg-white appearance-none cursor-pointer"
                onChange={(e) => setScope(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  {lang.login_page.form.scope_placeholder ?? 'Field of Activity*'}
                </option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Education">Education</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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
          onClick={!isLoginForm ? handleRegistrationButton : handleLoginButton}
          className="font-unbounded w-[calc(100%-40px)] h-[45px] text-[14px] font-normal rounded-full bg-[#347AEC] hover:bg-[#6764E7] text-white transition-colors mt-[23px] mx-auto"
        >
          {!isLoginForm
            ? lang.login_page.created_profile.register_btn
            : lang.login_page.created_profile.login_btn}
        </button>
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


