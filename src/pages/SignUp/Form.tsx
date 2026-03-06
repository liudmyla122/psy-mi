"use client";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Alert, Select, Radio, Space } from 'antd';
import { getAssetUrl } from '../../utils/assetPath';
import { apiClient } from '../../api/client';
import './Form.css';
const psyLogoUrl = getAssetUrl('_assets/images/icons/psyMI_logo.png');

const strelkaIkonkaUrl = getAssetUrl('_assets/images/pro proekt img/strelka ikonka.svg');
type Lang = {

  locale: string;
  backend_locale: string;
  login_page: any;
};
export function Form({ lang }: { lang: Lang }) {

  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [scope, setScope] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [messageError, setMessageError] = useState('');
  const [showScopeSelection, setShowScopeSelection] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [usageIntent, setUsageIntent] = useState('');
  const [position, setPosition] = useState('');
  const [hiringVolume, setHiringVolume] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCloseErrorAlert = () => setMessageError('');

  const handleGoogleLogin = () => {
    // Google OAuth login logic
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
    
    if (!GOOGLE_CLIENT_ID) {
      alert('Google Client ID не налаштовано. Будь ласка, додайте VITE_GOOGLE_CLIENT_ID у файл .env');
      return;
    }

    console.log('Google OAuth Redirect URI:', REDIRECT_URI); // Для проверки в консоли

    const targetUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=email%20profile`;
    
    window.location.href = targetUrl;
  };

  const handleRegistrationButton = async () => {
    console.log('Register button clicked');
    console.log('Current state:', { email, firstName, password: password ? '***' : '', repeatedPassword: repeatedPassword ? '***' : '', isLoginForm });
    
    if (email === '') {
      console.log('Validation failed: Email empty');
      return setMessageError(lang.login_page.handle_errors.email_empty);
    }
    if (firstName === '') {
      console.log('Validation failed: First Name empty');
      return setMessageError(lang.login_page.handle_errors.first_name_empty || 'Name is required');
    }
    if (password === '') {
      console.log('Validation failed: Password empty');
      return setMessageError(lang.login_page.handle_errors.password_empty);
    }
    if (password !== repeatedPassword) {
      console.log('Validation failed: Passwords do not match');
      return setMessageError(lang.login_page.handle_errors.password_match_error);
    }
    
    console.log('Validation passed, sending request...');
    setMessageError('');
    setIsLoading(true);

    try {
      await apiClient.post('auth/users/', {
        email,
        password,
        re_password: repeatedPassword,
        first_name: firstName,
        scope: usageIntent === 'recruiter' || usageIntent === 'company' ? position : (scope || 'Personal'), // Default to 'Personal' if scope is empty
        usageIntent,
        avatar,
        hiringVolume: usageIntent === 'recruiter' ? hiringVolume : undefined, // Добавляем объем найма
        companyName: usageIntent === 'company' ? companyName : undefined, // Добавляем название компании
        teamSize: usageIntent === 'company' ? teamSize : undefined, // Добавляем размер команды
      });

      // Auto-login after successful registration
      try {
        const loginRes = await apiClient.post('auth/token/login/', {
          email,
          password,
        });

        const { auth_token } = loginRes.data;
        if (auth_token) {
          localStorage.setItem('access_token', auth_token);
          // Fetch user profile
          const userRes = await apiClient.get('auth/users/me/', {
            headers: { Authorization: `Token ${auth_token}` }
          });
          localStorage.setItem('user', JSON.stringify(userRes.data));
          
          navigate(`/${lang.locale}/my-profile/about`);
        } else {
          success(lang);
          setIsLoginForm(true);
          setEmail('');
          setPassword('');
          setRepeatedPassword('');
          setFirstName('');
          setScope('');
        }
      } catch (loginError: any) {
        console.error("Auto-login failed:", loginError);
        // Show specific error if auto-login fails
        let errorMessage = "Registration successful, but auto-login failed. Please log in manually.";
        if (loginError.response && loginError.response.data && loginError.response.data.detail) {
          errorMessage += ` Error: ${loginError.response.data.detail}`;
        }
        
        Modal.warning({
          title: 'Registration Successful',
          content: errorMessage,
          onOk: () => {
            setIsLoginForm(true);
            setEmail('');
            setPassword('');
            setRepeatedPassword('');
            setFirstName('');
            setScope('');
          }
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (typeof data === 'string') {
          setMessageError(data);
        } else if (data.email) {
          setMessageError(Array.isArray(data.email) ? data.email[0] : data.email);
        } else if (data.password) {
          setMessageError(Array.isArray(data.password) ? data.password[0] : data.password);
        } else if (data.detail) {
          setMessageError(data.detail);
        } else {
          setMessageError(JSON.stringify(data));
        }
      } else if (error.request) {
        // Запрос был сделан, но ответ не получен (ошибка сети)
        setMessageError('Server is not responding. Please check your internet connection.');
      } else {
        // Произошла ошибка при настройке запроса
        setMessageError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginButton = async () => {
    if (email === '') return setMessageError(lang.login_page.handle_errors.email_empty);
    if (password === '') return setMessageError(lang.login_page.handle_errors.password_empty);
    
    setMessageError('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('auth/token/login/', {
        email,
        password,
      });

      const { auth_token } = response.data;
      if (auth_token) {
        localStorage.setItem('access_token', auth_token);
        // Also fetch user profile to verify and get user data if needed
        try {
          const userRes = await apiClient.get('auth/users/me/', {
            headers: { Authorization: `Token ${auth_token}` }
          });
          localStorage.setItem('user', JSON.stringify(userRes.data));
        } catch (e) {
          console.error("Failed to fetch user profile", e);
        }
        
        // Перенаправляем на профиль
        navigate(`/${lang.locale}/my-profile/about`);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.non_field_errors) {
          setMessageError(Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors);
        } else if (data.detail) {
          setMessageError(data.detail);
        } else {
          setMessageError('Login failed. Please check your credentials.');
        }
      } else {
        setMessageError('Network error. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка загрузки фото
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessageError('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setMessageError(''); // Clear error if successful
      };
      reader.readAsDataURL(file);
    }
  };

  if (!showEmailForm && isLoginForm && !showScopeSelection && !showProfileSetup) {
    return (
      <div className="auth-card">
        <div className="auth-card-logo">
          <img src={psyLogoUrl} alt="PSY MI" />
        </div>
        
        <h2 className="auth-card-title">
          {lang.login_page.google_provider.header}
        </h2>

        <div className="auth-card-actions">
          <button className="auth-btn auth-btn-google" onClick={handleGoogleLogin}>
            <span className="auth-btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.24l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
            </span>
            {lang.login_page.google_provider.google_btn}
          </button>

          <button className="auth-btn auth-btn-email" onClick={() => {
            setShowEmailForm(true);
            setIsLoginForm(true);
            // Даем время на рендер формы, чтобы фокус сработал
            setTimeout(() => {
              if (emailRef.current) {
                emailRef.current.focus();
              }
            }, 100);
          }}>
            {lang.login_page.google_provider.email_btn}
          </button>
        </div>

        <div className="auth-card-footer">
          <p className="auth-footer-link">
            {lang.login_page.google_provider.no_account}
            <button onClick={() => {
              setIsLoginForm(false);
              setShowScopeSelection(true);
            }}>
              {lang.login_page.google_provider.register_link}
            </button>
          </p>

          <div className="auth-support">
            <p>{lang.login_page.google_provider.support_text}</p>
            <a href={`mailto:${lang.login_page.google_provider.support_email}`}>
              {lang.login_page.google_provider.support_email}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Экран выбора цели использования
  if (showScopeSelection && !isLoginForm && !showProfileSetup) {
    return (
      <div className="auth-card scope-selection-card">
        <div className="auth-card-logo">
          <img src={psyLogoUrl} alt="PSY MI" />
        </div>
        
        <h2 className="auth-card-title">
          Як плануєте використовувати<br/>
          <span style={{ color: '#347AEC' }}>PSY MI?</span>
        </h2>

        <div className="scope-selection-options">
          <Radio.Group 
            onChange={(e) => setUsageIntent(e.target.value)} 
            value={usageIntent}
            className="scope-radio-group"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Radio.Button value="personal" className="scope-radio-button">
                Я хочу пройти тести для себе / своєї практики
              </Radio.Button>
              <Radio.Button value="recruiter" className="scope-radio-button">
                Я рекрутер / HR / консультант
              </Radio.Button>
              <Radio.Button value="company" className="scope-radio-button">
                Я представляю компанію / команду
              </Radio.Button>
            </Space>
          </Radio.Group>
        </div>

        <div className="scope-selection-actions" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button 
            className="auth-btn-secondary" 
            onClick={(e) => e.preventDefault()}
            style={{ cursor: 'not-allowed', opacity: 0.8 }}
          >
            ПРОПУСТИТИ
          </button>
          <button 
            className="auth-btn-primary" 
            onClick={() => {
              if (usageIntent) {
                setShowScopeSelection(false);
                setShowProfileSetup(true);
              }
            }}
            style={{ 
              opacity: usageIntent ? 1 : 0.5,
              cursor: usageIntent ? 'pointer' : 'not-allowed'
            }}
            disabled={!usageIntent}
          >
            ПРОДОВЖИТИ
          </button>
        </div>
      </div>
    );
  }

  // Экран "Давайте знайомитись"
  if (showProfileSetup && !isLoginForm) {
    return (
      <div className="auth-card scope-selection-card">
        <div className="auth-card-logo">
          <img src={psyLogoUrl} alt="PSY MI" />
        </div>
        
        <h2 className="auth-card-title">
          Давайте знайомитись!
        </h2>

        <div className="auth-form" style={{ marginTop: '10px' }}>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <label style={{ 
              fontFamily: 'Unbounded, sans-serif', 
              fontSize: '14px', 
              fontWeight: 700, 
              color: '#262626',
              marginBottom: '8px',
              display: 'block'
            }}>
              Ім'я<span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              name="first_name"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="auth-input"
              style={{ backgroundColor: '#EEF2F6' }}
              required
            />
          </div>

          {usageIntent === 'company' && (
            <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
              <label style={{ 
                fontFamily: 'Unbounded, sans-serif', 
                fontSize: '14px', 
                fontWeight: 700, 
                color: '#262626',
                marginBottom: '8px',
                display: 'block'
              }}>
                Назва компанії<span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                name="company_name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="auth-input"
                style={{ backgroundColor: '#EEF2F6' }}
                required
              />
            </div>
          )}

          <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
            <label style={{ 
              fontFamily: 'Unbounded, sans-serif', 
              fontSize: '14px', 
              fontWeight: 700, 
              color: '#262626',
              marginBottom: '8px',
              display: 'block'
            }}>
              Додати фото
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 2
                }}
              />
              <div style={{
                width: '100%',
                height: '48px',
                backgroundColor: avatar ? '#FFFFFF' : '#F9FAFB',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: avatar ? '#10B981' : '#6B7280',
                fontFamily: 'Unbounded, sans-serif',
                fontSize: '14px',
                border: '1px solid #E5E7EB'
              }}>
                {avatar ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Фото завантажено
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img 
                      src={strelkaIkonkaUrl} 
                      alt="upload" 
                      width={20} 
                      height={20} 
                    />
                    Завантажити з пристрою
                  </span>
                )}
              </div>
            </div>
          </div>

          {usageIntent === 'company' && (
            <>
              <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
                <label style={{ 
                  fontFamily: 'Unbounded, sans-serif', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: '#262626',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Розмір команди
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['1-10', '11-50', '51-200', '200+'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: `1px solid ${teamSize === size ? '#347AEC' : '#E5E7EB'}`,
                        backgroundColor: teamSize === size ? '#F0F5FF' : 'white',
                        color: teamSize === size ? '#347AEC' : '#374151',
                        fontFamily: 'Unbounded, sans-serif',
                        fontSize: '14px',
                        fontWeight: teamSize === size ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
                <label style={{ 
                  fontFamily: 'Unbounded, sans-serif', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: '#262626',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Ваша посада
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Owner / Founder', 'HR', 'Manager', 'Psychologist / Consultant'].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: `1px solid ${position === pos ? '#347AEC' : '#E5E7EB'}`,
                        backgroundColor: position === pos ? '#F0F5FF' : 'white',
                        color: position === pos ? '#347AEC' : '#374151',
                        fontFamily: 'Unbounded, sans-serif',
                        fontSize: '14px',
                        fontWeight: position === pos ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {usageIntent === 'recruiter' && (
            <div style={{
              animation: 'slideDown 0.3s ease-out',
              transformOrigin: 'top'
            }}>
              <style>{`
                @keyframes slideDown {
                  from { opacity: 0; transform: translateY(-10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
                <label style={{  
                  fontFamily: 'Unbounded, sans-serif', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: '#262626',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Посада
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Recruiter', 'HR Consultant', 'Psychologist', 'Manager'].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: `1px solid ${position === pos ? '#347AEC' : '#E5E7EB'}`,
                        backgroundColor: position === pos ? '#F0F5FF' : 'white',
                        color: position === pos ? '#347AEC' : '#374151',
                        fontFamily: 'Unbounded, sans-serif',
                        fontSize: '14px',
                        fontWeight: position === pos ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
                <label style={{ 
                  fontFamily: 'Unbounded, sans-serif', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: '#262626',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Об'єм прийому
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['до 10 кандидатів / місяць', '10-50 кандидатів / місяць', 'більше 50 кандидатів / місяць'].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setHiringVolume(vol)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1px solid ${hiringVolume === vol ? '#347AEC' : '#E5E7EB'}`,
                        backgroundColor: hiringVolume === vol ? '#F0F5FF' : 'white',
                        color: hiringVolume === vol ? '#347AEC' : '#374151',
                        fontFamily: 'Unbounded, sans-serif',
                        fontSize: '14px',
                        fontWeight: hiringVolume === vol ? 500 : 400,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="scope-selection-actions" style={{ marginTop: '20px', width: '100%' }}>
          <button 
            className="auth-btn-primary" 
            onClick={() => {
              if (usageIntent === 'recruiter') {
                if (firstName && position && hiringVolume) {
                  setShowProfileSetup(false);
                }
              } else if (usageIntent === 'company') {
                if (firstName && companyName && teamSize && position) {
                  setShowProfileSetup(false);
                }
              } else {
                if (firstName) {
                  setShowProfileSetup(false);
                }
              }
            }}
            style={{ 
              width: '186px',
              margin: '0 auto',
              opacity: (
                (usageIntent === 'recruiter' && (firstName && position && hiringVolume)) ||
                (usageIntent === 'company' && (firstName && companyName && teamSize && position)) ||
                (usageIntent !== 'recruiter' && usageIntent !== 'company' && firstName)
              ) ? 1 : 0.5,
              cursor: (
                (usageIntent === 'recruiter' && (firstName && position && hiringVolume)) ||
                (usageIntent === 'company' && (firstName && companyName && teamSize && position)) ||
                (usageIntent !== 'recruiter' && usageIntent !== 'company' && firstName)
              ) ? 'pointer' : 'not-allowed'
            }}
            disabled={
              (usageIntent === 'recruiter' && (!firstName || !position || !hiringVolume)) ||
              (usageIntent === 'company' && (!firstName || !companyName || !teamSize || !position)) ||
              (usageIntent !== 'recruiter' && usageIntent !== 'company' && !firstName)
            }
          >
            ПРОДОВЖИТИ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-card-logo">
        <img src={psyLogoUrl} alt="PSY MI" />
      </div>
      
      <h2 className="auth-card-title">
        {!isLoginForm ? lang.login_page.form.header_sign_up : lang.login_page.form.header_login}
      </h2>

      <form 
        ref={formRef}
        className="auth-form" 
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted via event');
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
          className="auth-input"
          placeholder={`${lang.login_page.form.email}*`}
          required
        />
        
        {/* Поле имени перенесено на предыдущий шаг, здесь оно скрыто или убрано */}

        <div style={{ position: 'relative' }}>
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            id={isLoginForm ? "login-password" : "register-password"}
            autoComplete={isLoginForm ? "current-password" : "new-password"}
            data-form-type={isLoginForm ? "login" : "signup"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            placeholder={`${lang.login_page.form.password}*`}
            required
            style={{ paddingRight: '40px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>

        {!isLoginForm && (
          <div style={{ position: 'relative' }}>
            <input
              type={showRepeatedPassword ? "text" : "password"}
              name="re_password"
              autoComplete="new-password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className="auth-input"
              placeholder={`${lang.login_page.form.re_password}*`}
              required
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              {showRepeatedPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Password hints removed */}

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Зачекайте...' : (!isLoginForm
            ? lang.login_page.created_profile.register_btn
            : lang.login_page.created_profile.login_btn)}
        </button>

        {isLoginForm && (
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="auth-forgot-password"
          >
            Забули пароль?
          </button>
        )}
      </form>
      
      <div className="auth-card-footer">
        <p className="auth-footer-link">
          {!isLoginForm ? (
            <>
              {lang.login_page.form.logged_in.includes('?') 
                ? `${lang.login_page.form.logged_in.split('?')[0]}? ` 
                : `${lang.login_page.form.logged_in.split(' ')[0]} `}
              <button onClick={() => setIsLoginForm(true)}>
                {lang.login_page.form.logged_in.includes('?')
                  ? lang.login_page.form.logged_in.split('?')[1]
                  : lang.login_page.form.logged_in.split(' ').slice(1).join(' ')}
              </button>
            </>
          ) : (
            <>
              {lang.login_page.form.registered.includes('?')
                ? `${lang.login_page.form.registered.split('?')[0]}? `
                : `${lang.login_page.form.registered.split(' ')[0]} `}
              <button onClick={() => {
                setIsLoginForm(false);
                setShowScopeSelection(true);
              }}>
                {lang.login_page.form.registered.includes('?')
                  ? lang.login_page.form.registered.split('?')[1]
                  : lang.login_page.form.registered.split(' ').slice(1).join(' ')}
              </button>
            </>
          )}
        </p>
      </div>

      {messageError && (
        <Alert
          className="auth-alert"
          message={messageError}
          type="info"
          closable
          onClose={onCloseErrorAlert}
        />
      )}
    </div>
  );
}

// Helper components for success and error modals...
const success = (lang: Lang) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <div className="text-left">
        <p className="text-[16px] mb-[10px] font-unbounded">
          {lang.login_page.created_profile.success_modal.register_text}
        </p>
        <a className="ant-btn ant-btn-primary ml-[50px] md:ml-[40px]" href={`/${lang.locale}/my-profile/about`}>
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


