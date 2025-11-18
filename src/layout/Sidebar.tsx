import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const socialLinks: { name: string; href: string; svg: ReactNode }[] = [
  {
    name: 'instagram',
    href: 'https://www.instagram.com/mi___agency/',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
        <rect width="19" height="18" rx="9" fill="#4485ED" />
        <path
          d="M9.5 5.313C10.759 5.313 10.931 5.313 11.446 5.313c.458 0 .687.109.859.163.229.108.4.162.572.325.172.162.286.325.343.542.057.162.114.379.172.813 0 .487 0 .596 0 1.843 0 1.247 0 1.356 0 1.844 0 .434-.115.651-.172.814-.114.217-.172.379-.343.542-.172.162-.343.271-.572.325-.172.054-.401.108-.859.162-.515 0-.63 0-1.946 0-1.316 0-1.431 0-1.946 0-.458 0-.687-.109-.859-.163-.229-.108-.401-.163-.572-.325a1.23 1.23 0 0 1-.343-.542c-.057-.163-.114-.379-.171-.813 0-.488 0-.596 0-1.843 0-1.247 0-1.355 0-1.843 0-.487.114-.813.229-1.084.114-.271.286-.542.572-.813.286-.271.515-.379.859-.542.286-.109.63-.163 1.145-.217.515 0 .687 0 1.946 0ZM9.5 4.5c-1.316 0-1.431 0-1.946 0-.515 0-.859.109-1.145.217-.286.108-.572.271-.859.542-.286.271-.4.488-.572.813-.115.271-.172.596-.229 1.084 0 .488 0 .65 0 1.843 0 1.247 0 1.356 0 1.844 0 .488.114.813.229 1.084.115.271.286.542.572.813.286.271.515.379.859.542.286.108.63.162 1.145.217.515 0 .687 0 1.946 0 1.259 0 1.431 0 1.946 0 .515 0 .859-.109 1.145-.217.286-.108.572-.271.859-.542.286-.271.4-.488.572-.813.114-.271.172-.596.172-1.084 0-.488 0-.65 0-1.843 0-1.193 0-1.355 0-1.843 0-.488-.114-.813-.229-1.084-.114-.271-.286-.542-.572-.813-.286-.271-.515-.379-.859-.542-.286-.108-.63-.162-1.145-.217-.515 0-.63 0-1.946 0Z"
          fill="white"
        />
        <path
          d="M9.5 6.669c-1.373 0-2.46 1.03-2.46 2.331 0 1.302 1.087 2.332 2.46 2.332s2.461-1.03 2.461-2.332c0-1.3-1.088-2.331-2.461-2.331Zm0 3.85c-.858 0-1.602-.65-1.602-1.519 0-.812.687-1.517 1.602-1.517.859 0 1.603.651 1.603 1.519 0 .813-.744 1.517-1.603 1.517Z"
          fill="white"
        />
        <path
          d="M12.018 7.157c.316 0 .572-.243.572-.542 0-.3-.256-.543-.572-.543-.316 0-.572.243-.572.543 0 .299.256.542.572.542Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'telegram',
    href: 'https://t.me/mi_agency',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect width="18" height="18" rx="9" fill="#4485ED" />
        <path
          d="M12.6 5.671 11.248 12.731s-.19.49-.709.255L7.418 10.509l-.014-.007c.421-.392 3.69-3.435 3.832-3.573.222-.214.085-.341-.171-.18L6.235 9.924 4.373 9.275s-.293-.108-.322-.343c-.029-.235.331-.362.331-.362l7.593-3.085s.624-.284.624.186Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'facebook',
    href: 'https://www.facebook.com/HRmiagency',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
        <rect width="19" height="18" rx="9" fill="#4485ED" />
        <path
          d="M10.287 9.164h1.768l.278-1.712h-2.046V6.517c0-.712.243-1.342.94-1.342H12.35V3.68c-.197-.025-.614-.08-1.401-.08-1.644 0-2.608.828-2.608 2.713v1.139h-1.69v1.712h1.69v4.705c.335.048.674.08 1.022.08.315 0 .622-.027.925-.066V9.164Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/miagency-ua/',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
        <rect width="19" height="18" rx="9" fill="#4485ED" />
        <path
          d="M13.3 9.335v2.482h-1.534V9.486c0-.575-.223-.968-.766-.968-.416 0-.671.272-.767.514-.032.091-.064.212-.064.364v2.422H8.635S8.667 7.882 8.635 7.489H10.169v.605c.192-.303.575-.726 1.374-.726.99 0 1.757.636 1.757 1.967ZM7.038 5.4c-.511 0-.863.333-.863.757 0 .424.319.757.831.757.543 0 .862-.333.862-.757.032-.454-.288-.757-.83-.757ZM6.271 11.817H7.805V7.489H6.271v4.328Z"
          fill="white"
        />
      </svg>
    ),
  },
];

const getNavItems = (currentLang: 'ua' | 'en'): NavItem[] => {
  const labels = {
    ua: {
      about: 'Про проєкт',
      tests: 'Пройти тестування',
      articles: 'Наші статті',
    },
    en: {
      about: 'About project',
      tests: 'Pass the tests',
      articles: 'Our articles',
    },
  };

  const langLabels = labels[currentLang];

  return [
    {
      label: langLabels.about,
      href: '/about',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
          <path
            d="M4 11V7.19602C4 6.84587 4.26863 6.56202 4.6 6.56202H6.4C6.73137 6.56202 7 6.84587 7 7.19602V11M5.15229 1.11732L1.25229 4.04779C1.09401 4.16672 1 4.35925 1 4.56447V10.049C1 10.5742 1.40294 11 1.9 11H9.1C9.59706 11 10 10.5742 10 10.049V4.56447C10 4.35925 9.90599 4.16672 9.74771 4.04779L5.84771 1.11732C5.63954 0.960894 5.36046 0.960894 5.15229 1.11732Z"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: langLabels.tests,
      href: '/tests',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path
            d="M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C7.36292 1 8.17943 1.19873 8.90625 1.55291M10.9688 3.0625L6.15625 7.875L4.78125 6.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: langLabels.articles,
      href: '/articles',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
          <path
            d="M7.23084 1V3.0625C7.23084 3.4422 7.54078 3.75 7.92313 3.75H10M3.42324 3.75H4.80782M3.42324 5.8125H7.57698M3.42324 7.875H7.57698M8.96156 2.03125C8.65345 1.75748 8.33372 1.43277 8.13188 1.22188C7.99757 1.08155 7.81199 1 7.61704 1H2.38464C1.61996 1 1.00006 1.6156 1.00005 2.37499L1 10.625C0.999995 11.3844 1.61989 12 2.38458 12L8.61522 12C9.37989 12 9.99979 11.3844 9.99981 10.625L9.99999 3.33626C10 3.16047 9.93247 2.99148 9.80961 2.86492C9.58242 2.63089 9.20304 2.24582 8.96156 2.03125Z"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];
};

type UserData = {
  first_name?: string;
  email?: string;
};

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ua' | 'en'>(() => {
    const savedLang = localStorage.getItem('appLanguage');
    return (savedLang === 'ua' || savedLang === 'en' ? savedLang : 'ua') as 'ua' | 'en';
  });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    localStorage.setItem('appLanguage', currentLang);
  }, [currentLang]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    const handleScroll = () => {
      // Проверяем, что экран меньше или равен 480px
      const mobile = window.innerWidth <= 480;
      setIsMobile(mobile);
      
      if (!mobile) {
        setIsScrolled(false);
        return;
      }

      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Показываем логотип только когда находимся в самом верху страницы (scrollY <= 5)
      // Скрываем при любой прокрутке вниз
      if (currentScrollY <= 5) {
        setIsScrolled(false); // Показываем логотип
      } else {
        setIsScrolled(true); // Скрываем логотип
      }
    };

    const handleResize = () => {
      checkMobile();
      handleScroll();
    };

    // Проверяем начальное состояние
    checkMobile();
    
    // Используем passive для лучшей производительности
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    handleScroll(); // Проверяем начальное состояние прокрутки

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const backendLocale = currentLang === 'ua' ? 'ua' : 'en';
        const response = await axios.get(
          `https://psymi.com.ua/${backendLocale}/api/auth/users/me/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [authToken, currentLang]);

  const handleLanguageChange = (lang: 'ua' | 'en') => {
    setCurrentLang(lang);
  };

  const navItems = getNavItems(currentLang);
  const isAuthenticated = !!authToken;
  const userName = userData?.first_name || 'Anonymous';
  const greeting = currentLang === 'ua' ? 'Привіт' : 'Hello';
  const profileButtonText = currentLang === 'ua' ? 'мій профіль →' : 'my profile →';

  return (
    <aside className="w-full md:w-[248px] md:h-[654px] flex flex-col items-center md:items-start gap-6">
      <a 
        href="/" 
        className={`flex items-center justify-center self-center md:mt-[40px] ${isScrolled && isMobile ? 'logo-hidden' : ''}`}
      >
        <img
          src="/_assets/images/icons/psyMI_logo.png"
          alt="PSY MI"
          width={186.33}
          height={59.71}
          style={{ width: '186.33px', height: '59.71px' }}
          loading="lazy"
          className="mobile-logo-image"
        />
      </a>

      <div className="w-full md:h-full bg-white shadow-lg rounded-[15px] md:rounded-[15px] px-6 py-6 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-[67px] h-[67px] rounded-[16px] bg-gradient-to-br from-[#508FFF] to-[#6E63F5] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 24.375c-6.723 0-12.188 3.677-12.188 8.208V33.75c0 3.086 5.465 5.615 12.188 5.615s12.188-2.529 12.188-5.615v-1.167c0-4.531-5.465-8.208-12.188-8.208Z"
                fill="#fff"
              />
              <path
                d="M20 5c-4.93 0-8.964 3.996-8.964 8.889 0 4.893 4.035 8.889 8.964 8.889 4.93 0 8.964-3.996 8.964-8.889C28.964 8.996 24.93 5 20 5Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="flex-1 flex flex-col">
            {isLoading ? (
              <p className="font-unbounded font-[500] text-[12px] text-[#5E5E5E] mb-[5px]">Loading...</p>
            ) : (
              <p className="font-[500] text-[12px] text-[#5E5E5E] mb-[5px]">
                <span className="font-montserrat">{greeting}, </span>
                <span className="font-unbounded">{isAuthenticated ? userName : 'Anonymous'}</span>
              </p>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/my-profile')}
                className="font-unbounded flex items-center justify-between w-auto min-w-[110px] h-[20px] px-[6px] py-[3px] rounded-[8px] bg-[#347AEC] hover:bg-[#6764E7] text-white text-[12px] font-normal duration-500"
              >
                {profileButtonText}
              </button>
            ) : (
              <button
                onClick={() => navigate('/register')}
                className="font-montserrat flex items-center justify-between w-[110px] h-[20px] px-[6px] py-[3px] rounded-[8px] bg-[#347AEC] hover:bg-[#6764E7] text-white text-[12px] font-normal duration-500"
              >
                {currentLang === 'ua' ? 'Увійти' : 'Login'}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M7.5 4.5 12 9l-4.5 4.5M12 9H3"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <hr className="border-0 h-px bg-[#E9ECF3]" />

        <div>
          <p className="font-unbounded text-[#5E5E5E] text-[10px] mb-4">Discover yourself</p>
          <nav>
            <ul className="flex flex-col gap-5">
              {navItems.map((item, index) => {
                const isActive = 
                  (item.href === '/tests' && (location.pathname === '/tests' || location.pathname === '/ua/tests' || location.pathname === '/en/tests')) ||
                  (item.href === '/about' && (location.pathname === '/about' || location.pathname === '/ua/about' || location.pathname === '/en/about')) ||
                  (item.href === '/articles' && (location.pathname === '/articles' || location.pathname === '/ua/articles' || location.pathname === '/en/articles' || location.pathname === '/news' || location.pathname === '/ua/news' || location.pathname === '/en/news'));
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.href.startsWith('/')) {
                          navigate(item.href);
                        } else {
                          window.location.href = item.href;
                        }
                      }}
                      className={`flex items-center gap-3 !text-[12px] font-unbounded font-normal transition-colors w-full text-left text-[#1F2937] mobile-nav-button`}
                    >
                      <span
                        className={`w-[21px] h-[21px] rounded-full flex items-center justify-center border mobile-nav-icon-span ${
                          isActive
                            ? 'bg-[#E3EDFF] border-[#347AEC] text-[#347AEC]'
                            : 'bg-[#EEF2F7] border-[#E2E6F0] text-[#5D5D5D]'
                        }`}
                      >
                        {isActive && index === 1 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path
                              d="M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C7.36292 1 8.17943 1.19873 8.90625 1.55291M10.9688 3.0625L6.15625 7.875L4.78125 6.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          item.icon
                        )}
                      </span>
                      <span className="mobile-nav-label-text">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Флаг для переключения языка в мобильной навигации */}
        <div className="mobile-flag-container">
          <button
            type="button"
            onClick={() => handleLanguageChange(currentLang === 'ua' ? 'en' : 'ua')}
            className="flex flex-col items-center justify-center gap-0.25rem p-0.5rem"
          >
            <span className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center text-2xl">
              {currentLang === 'ua' ? '🇺🇦' : '🇬🇧'}
            </span>
          </button>
        </div>

        <div className="mt-[195px] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLanguageChange('ua')}
              className={`w-[32px] h-[32px] rounded-full overflow-hidden focus:outline-none transition-all ${
                currentLang === 'ua'
                  ? 'border-2 border-[#347AEC]'
                  : 'border-2 border-[#6B7280]'
              }`}
            >
              <img
                src="/_assets/images/lang/UA.png"
                alt="UA"
                width={32}
                height={32}
                loading="lazy"
                className={currentLang !== 'ua' ? 'grayscale' : ''}
              />
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-[32px] h-[32px] rounded-full overflow-hidden focus:outline-none transition-all ${
                currentLang === 'en'
                  ? 'border-2 border-[#347AEC]'
                  : 'border-2 border-[#6B7280]'
              }`}
            >
              <img
                src="/_assets/images/lang/ENG.png"
                alt="EN"
                width={32}
                height={32}
                loading="lazy"
                className={currentLang !== 'en' ? 'grayscale' : ''}
              />
            </button>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center transition-transform hover:-translate-y-0.5"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}


