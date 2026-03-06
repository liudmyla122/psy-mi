import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetPath';
import { useLocalization } from '../context/LocalizationContext';
import './Header.css';

const psyLogoUrl = getAssetUrl('_assets/images/icons/psyMI_logo.png');

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLocalization();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
    };

    checkAuth();

    // Check on every render/navigation
  }, [location.pathname]);

  const toggleLanguage = () => {
    setLanguage(language === 'ua' ? 'en' : 'ua');
  };

  const navItems = [
    { label: t('header.about'), href: '/about' },
    { label: t('header.tests'), href: '/about#tests' },
    { label: t('header.reviews'), href: '/about#reviews' },
  ];

  const handleNavigation = (href: string) => {
    if (href === '/about#tests') {
      navigate('/about');
      setTimeout(() => {
        const testsElement = document.getElementById('tests');
        if (testsElement) {
          testsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (href === '/about#reviews') {
      navigate('/about');
      setTimeout(() => {
        const reviewsElement = document.getElementById('reviews');
        if (reviewsElement) {
          reviewsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  const handleTakeTestClick = () => {
    if (isLoggedIn) {
      navigate('/tests');
    } else {
      navigate('/register');
    }
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo" onClick={() => navigate('/')}>
          <img src={psyLogoUrl} alt="PSY MI" />
        </div>

        <nav className="header-nav">
          <ul className="header-nav-list">
            {navItems.map((item) => (
              <li key={item.href} className="header-nav-item">
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`header-nav-link ${location.pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="header-lang-switch"
            onClick={toggleLanguage}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#262626',
              marginRight: '10px',
            }}
          >
            {language}
          </button>
          <button className="header-btn-test" onClick={handleTakeTestClick}>
            {t('header.takeTest')}
          </button>
          {isLoggedIn ? (
            <button className="header-btn-login" onClick={() => navigate('/my-profile')}>
              {t('header.profile')}
            </button>
          ) : (
            <button className="header-btn-login" onClick={() => navigate('/register')}>
              {t('header.login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
