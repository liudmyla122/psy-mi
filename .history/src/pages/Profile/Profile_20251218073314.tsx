import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../../layout';
import axios from 'axios';
import './Profile.css';

interface TestResult {
  id: string;
  testName: string;
  testType: string;
  result: string;
  completedAt: string;
  score?: string;
}

export function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    firstName: string;
    scope: string;
    username?: string;
    image?: string;
  } | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactInput, setContactInput] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedMessenger, setSelectedMessenger] = useState<string | null>(null);
  const [showMessengers, setShowMessengers] = useState(false);

  // Скрываем кнопки мессенджеров, если поле очищено
  useEffect(() => {
    if (!contactInput.trim()) {
      setShowMessengers(false);
    }
  }, [contactInput]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      const currentPath = location.pathname;
      if (currentPath.startsWith('/ua/')) {
        navigate('/register');
      } else if (currentPath.startsWith('/en/')) {
        navigate('/register');
      } else {
        navigate('/register');
      }
      return;
    }

    loadUserInfo();

    // Слушаем событие обновления результатов тестов
    const handleTestResultSaved = () => {
      loadUserInfo();
    };

    window.addEventListener('testResultSaved', handleTestResultSaved);

    return () => {
      window.removeEventListener('testResultSaved', handleTestResultSaved);
    };
  }, [navigate, location.pathname]);

  const loadUserInfo = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) return;

      const userResponse = await axios.get(`http://localhost:3000/api/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (userResponse.data) {
        setUserInfo({
          email: userResponse.data.email || '',
          firstName: userResponse.data.first_name || '',
          scope: userResponse.data.scope || '',
          username: userResponse.data.username || '',
          image: userResponse.data.image || '',
        });
        if (userResponse.data.image) {
          setAvatarPreview(userResponse.data.image);
        }
      }

      // Загружаем результаты тестов
      try {
        const testResultsResponse = await axios.get(`http://localhost:3000/api/test-results/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (testResultsResponse.data && Array.isArray(testResultsResponse.data)) {
          setTestResults(testResultsResponse.data);
        }
      } catch (error) {
        console.log('Test results endpoint not available');
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/register');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверяем размер файла (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Розмір файлу не повинен перевищувати 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        setAvatarPreview(base64Image);

        // Отправляем изображение на сервер
        try {
          const authToken = localStorage.getItem('authToken');
          if (!authToken) return;

          await axios.patch(
            `http://localhost:3000/api/auth/users/me/`,
            { image: base64Image },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            },
          );

          // Обновляем информацию о пользователе
          loadUserInfo();

          // Отправляем событие для обновления Sidebar
          window.dispatchEvent(new Event('userUpdated'));
        } catch (error) {
          console.error('Error uploading avatar:', error);
          alert('Помилка при завантаженні зображення');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShowMessengers = () => {
    if (contactInput.trim()) {
      setShowMessengers(true);
    }
  };

  const handleContactSubmit = (messenger: string) => {
    if (contactInput.trim()) {
      const contact = contactInput.trim();
      const message = `Привіт! Я пройшов(ла) тести на сайті PSY MI і хочу отримати консультацію. Мій контакт: ${contact}`;
      const encodedMessage = encodeURIComponent(message);

      let url = '';

      switch (messenger) {
        case 'telegram':
          url = `https://t.me/k_maria_mi?text=${encodedMessage}`;
          break;
        case 'instagram':
          // Instagram не поддерживает предзаполнение сообщений через URL, открываем профиль
          url = 'https://www.instagram.com/mi___agency/';
          break;
        case 'facebook':
          // Facebook профиль
          url = `https://www.facebook.com/HRmiagency`;
          break;
        case 'linkedin':
          // LinkedIn профиль компании
          url = 'https://www.linkedin.com/company/miagency-ua/';
          break;
        default:
          return;
      }

      window.open(url, '_blank');
      setContactInput('');
      setSelectedMessenger(null);
      setShowMessengers(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  const getTestResultsByType = (testType: string) => {
    return testResults.filter((result) => result.testType.toLowerCase() === testType.toLowerCase());
  };

  const getTestPath = (testType: string) => {
    const currentPath = location.pathname;
    let basePath = '';

    switch (testType.toLowerCase()) {
      case 'enneagram':
      case 'енеаграма':
        basePath = '/test/enneagram';
        break;
      case 'adizes':
      case 'адізес':
        basePath = '/test/adizes';
        break;
      case 'mbti':
      case 'мвті':
        basePath = '/test/mbti';
        break;
      case 'emotional intelligence':
      case 'емоційний інтелект':
        basePath = '/emotional-intelligence';
        break;
      case 'mbi':
      case 'мві':
        basePath = '/test/mbi';
        break;
      case 'innovation potential':
      case 'innovation-potential':
      case 'інноваційний потенціал':
        basePath = '/test/innovation-potential/result';
        break;
      default:
        basePath = '/tests';
    }

    if (currentPath.startsWith('/ua/')) {
      return `/ua${basePath}`;
    } else if (currentPath.startsWith('/en/')) {
      return `/en${basePath}`;
    }

    return basePath;
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Sidebar />
        <main className="profile-main">
          <div className="profile-loading">Завантаження...</div>
        </main>
      </div>
    );
  }

  const enneagramResults = getTestResultsByType('enneagram');
  const adizesResults = getTestResultsByType('adizes');
  const mbiResults = getTestResultsByType('mbi');
  const mbtiResults = getTestResultsByType('mbti');
  const innovationPotentialResults = getTestResultsByType('innovation-potential');

  return (
    <div className="profile-page">
      <Sidebar />
      <main className="profile-main">
        <div className="profile-container">
          {/* Верхняя секция с аватаром и приветствием */}
          <div className="profile-top-section">
            <div className="profile-top-left">
              <div className="profile-avatar-upload" onClick={handleAvatarClick}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="profile-avatar-image" />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <span className="profile-avatar-text">Завантажити зображення</span>
                  </div>
                )}
              </div>
              <div className="profile-greeting-section">
                <div className="profile-greeting-wrapper">
                  <p className="profile-greeting-hello">Привіт,</p>
                  <p className="profile-greeting-name">{userInfo?.firstName || 'Користувач'}</p>
                </div>
                <p className="profile-description">
                  На цій сторінці зображено всі Ваші збережені результати психологічних тестувань.
                </p>
                <p className="profile-consultation-text">
                  <span className="profile-consultation-highlight">
                    Якщо Ви хочете отримати додаткову консультацію від нашого психолога
                  </span>{' '}
                  <span className="profile-consultation-rest">
                    щодо результатів, залиште свій контакт в будь-якому месенджері - ми з вами
                    зв'яжемось.
                  </span>
                </p>
                <div
                  className="profile-contact-input-wrapper"
                  style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'nowrap' }}
                >
                  <input
                    type="text"
                    className="profile-contact-input"
                    placeholder="Нік / номер телефону"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="profile-contact-submit"
                    onClick={handleShowMessengers}
                    disabled={!contactInput.trim()}
                    style={{ opacity: contactInput.trim() ? 1 : 0.5, flexShrink: 0 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3334 1.66666L9.16669 10.8333M18.3334 1.66666L12.5001 18.3333L9.16669 10.8333M18.3334 1.66666L1.66669 7.49999L9.16669 10.8333"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {showMessengers && contactInput.trim() && (
                    <div
                      className="profile-messengers-wrapper"
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMessenger('telegram');
                          handleContactSubmit('telegram');
                        }}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border:
                            selectedMessenger === 'telegram'
                              ? '2px solid #347AEC'
                              : '2px solid transparent',
                          background: selectedMessenger === 'telegram' ? '#347AEC' : '#4485ED',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          padding: 0,
                        }}
                        title="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M12.6 5.671 11.248 12.731s-.19.49-.709.255L7.418 10.509l-.014-.007c.421-.392 3.69-3.435 3.832-3.573.222-.214.085-.341-.171-.18L6.235 9.924 4.373 9.275s-.293-.108-.322-.343c-.029-.235.331-.362.331-.362l7.593-3.085s.624-.284.624.186Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMessenger('instagram');
                          handleContactSubmit('instagram');
                        }}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border:
                            selectedMessenger === 'instagram'
                              ? '2px solid #347AEC'
                              : '2px solid transparent',
                          background: selectedMessenger === 'instagram' ? '#347AEC' : '#4485ED',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          padding: 0,
                        }}
                        title="Instagram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="18"
                          viewBox="0 0 19 18"
                          fill="none"
                        >
                          <rect width="19" height="18" rx="9" fill="white" />
                          <path
                            d="M9.5 5.313C10.759 5.313 10.931 5.313 11.446 5.313c.458 0 .687.109.859.163.229.108.4.162.572.325.172.162.286.325.343.542.057.162.114.379.172.813 0 .487 0 .596 0 1.843 0 1.247 0 1.356 0 1.844 0 .434-.115.651-.172.814-.114.217-.172.379-.343.542-.172.162-.343.271-.572.325-.172.054-.401.108-.859.162-.515 0-.63 0-1.946 0-1.316 0-1.431 0-1.946 0-.458 0-.687-.109-.859-.163-.229-.108-.401-.163-.572-.325a1.23 1.23 0 0 1-.343-.542c-.057-.163-.114-.379-.171-.813 0-.488 0-.596 0-1.843 0-1.247 0-1.355 0-1.843 0-.487.114-.813.229-1.084.114-.271.286-.542.572-.813.286-.271.515-.379.859-.542.286-.109.63-.163 1.145-.217.515 0 .687 0 1.946 0ZM9.5 4.5c-1.316 0-1.431 0-1.946 0-.515 0-.859.109-1.145.217-.286.108-.572.271-.859.542-.286.271-.4.488-.572.813-.115.271-.172.596-.229 1.084 0 .488 0 .65 0 1.843 0 1.247 0 1.356 0 1.844 0 .488.114.813.229 1.084.115.271.286.542.572.813.286.271.515.379.859.542.286.108.63.162 1.145.217.515 0 .687 0 1.946 0 1.259 0 1.431 0 1.946 0 .515 0 .859-.109 1.145-.217.286-.108.572-.271.859-.542.286-.271.4-.488.572-.813.114-.271.172-.596.172-1.084 0-.488 0-.65 0-1.843 0-1.193 0-1.355 0-1.843 0-.488-.114-.813-.229-1.084-.114-.271-.286-.542-.572-.813-.286-.271-.515-.379-.859-.542-.286-.108-.63-.162-1.145-.217-.515 0-.63 0-1.946 0Z"
                            fill="#4485ED"
                          />
                          <path
                            d="M9.5 6.669c-1.373 0-2.46 1.03-2.46 2.331 0 1.302 1.087 2.332 2.46 2.332s2.461-1.03 2.461-2.332c0-1.3-1.088-2.331-2.461-2.331Zm0 3.85c-.858 0-1.602-.65-1.602-1.519 0-.812.687-1.517 1.602-1.517.859 0 1.603.651 1.603 1.519 0 .813-.744 1.517-1.603 1.517Z"
                            fill="#4485ED"
                          />
                          <path
                            d="M12.018 7.157c.316 0 .572-.243.572-.542 0-.3-.256-.543-.572-.543-.316 0-.572.243-.572.543 0 .299.256.542.572.542Z"
                            fill="#4485ED"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMessenger('facebook');
                          handleContactSubmit('facebook');
                        }}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border:
                            selectedMessenger === 'facebook'
                              ? '2px solid #347AEC'
                              : '2px solid transparent',
                          background: selectedMessenger === 'facebook' ? '#347AEC' : '#4485ED',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          padding: 0,
                        }}
                        title="Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="18"
                          viewBox="0 0 19 18"
                          fill="none"
                        >
                          <rect width="19" height="18" rx="9" fill="white" />
                          <path
                            d="M10.287 9.164h1.768l.278-1.712h-2.046V6.517c0-.712.243-1.342.94-1.342H12.35V3.68c-.197-.025-.614-.08-1.401-.08-1.644 0-2.608.828-2.608 2.713v1.139h-1.69v1.712h1.69v4.705c.335.048.674.08 1.022.08.315 0 .622-.027.925-.066V9.164Z"
                            fill="#4485ED"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMessenger('linkedin');
                          handleContactSubmit('linkedin');
                        }}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border:
                            selectedMessenger === 'linkedin'
                              ? '2px solid #347AEC'
                              : '2px solid transparent',
                          background: selectedMessenger === 'linkedin' ? '#347AEC' : '#4485ED',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          padding: 0,
                        }}
                        title="LinkedIn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="18"
                          viewBox="0 0 19 18"
                          fill="none"
                        >
                          <rect width="19" height="18" rx="9" fill="white" />
                          <path
                            d="M13.3 9.335v2.482h-1.534V9.486c0-.575-.223-.968-.766-.968-.416 0-.671.272-.767.514-.032.091-.064.212-.064.364v2.422H8.635S8.667 7.882 8.635 7.489H10.169v.605c.192-.303.575-.726 1.374-.726.99 0 1.757.636 1.757 1.967ZM7.038 5.4c-.511 0-.863.333-.863.757 0 .424.319.757.831.757.543 0 .862-.333.862-.757.032-.454-.288-.757-.83-.757ZM6.271 11.817H7.805V7.489H6.271v4.328Z"
                            fill="#4485ED"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button type="button" className="profile-logout-button-top" onClick={handleLogout}>
              Вийти
            </button>
          </div>

          {/* Секция Енеаграма */}
          {enneagramResults.length > 0 && (
            <div className="profile-test-section-wrapper">
              <h2 className="profile-test-section-title">Енеаграма</h2>
              <div className="profile-test-header">
                <span className="profile-test-header-result">Результат</span>
                <span className="profile-test-header-date">Дата проходження</span>
              </div>
              <div className="profile-test-section">
                <div className="profile-test-results-list">
                  {enneagramResults.map((result) => (
                    <div key={result.id} className="profile-test-result-row">
                      <span className="profile-test-result-name">{result.result}</span>
                      <span className="profile-test-result-date">
                        {formatDate(result.completedAt)}
                      </span>
                      <span
                        className="profile-test-details-link"
                        onClick={() =>
                          navigate(getTestPath(result.testType), {
                            state: {
                              showSavedResult: true,
                              savedResult: result,
                            },
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        Подробніше
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Секция Тест Адізеса */}
          {adizesResults.length > 0 && (
            <div className="profile-test-section-wrapper">
              <h2 className="profile-test-section-title">Тест Адізеса</h2>
              <div className="profile-test-header">
                <span className="profile-test-header-result">Результат</span>
                <span className="profile-test-header-date">Дата проходження</span>
              </div>
              <div className="profile-test-section">
                <div className="profile-test-results-list">
                  {adizesResults.map((result) => (
                    <div key={result.id} className="profile-test-result-row">
                      <span className="profile-test-result-name">{result.result}</span>
                      <span className="profile-test-result-date">
                        {formatDate(result.completedAt)}
                      </span>
                      <span
                        className="profile-test-details-link"
                        onClick={() =>
                          navigate(getTestPath(result.testType), {
                            state: {
                              showSavedResult: true,
                              savedResult: result,
                            },
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        Подробніше
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Секция Тест MBI */}
          {mbiResults.length > 0 && (
            <div className="profile-test-section-wrapper">
              <h2 className="profile-test-section-title">Тест MBI</h2>
              <div className="profile-test-header">
                <span className="profile-test-header-result">Результат</span>
                <span className="profile-test-header-date">Дата проходження</span>
              </div>
              <div className="profile-test-section">
                <div className="profile-test-results-list">
                  {mbiResults.map((result) => {
                    // Форматируем краткий результат для отображения
                    // Извлекаем значения из score (например "EE:16 D:11 PA:19")
                    let displayResult = result.result;
                    if (result.score) {
                      const scoreStr = result.score;
                      const eeMatch = scoreStr.match(/EE:(\d+)/);
                      const dMatch = scoreStr.match(/D:(\d+)/);
                      const paMatch = scoreStr.match(/PA:(\d+)/);

                      if (eeMatch && dMatch && paMatch) {
                        displayResult = `EE:${eeMatch[1]} D:${dMatch[1]} PA:${paMatch[1]}`;
                      }
                    }

                    return (
                      <div key={result.id} className="profile-test-result-row">
                        <span className="profile-test-result-name">{displayResult}</span>
                        <span className="profile-test-result-date">
                          {formatDate(result.completedAt)}
                        </span>
                        <span
                          className="profile-test-details-link"
                          onClick={() =>
                            navigate(getTestPath(result.testType), {
                              state: {
                                showSavedResult: true,
                                savedResult: result,
                              },
                            })
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          Подробніше
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Секция Тест MBTI */}
          {mbtiResults.length > 0 && (
            <div className="profile-test-section-wrapper">
              <h2 className="profile-test-section-title">Тест MBTI</h2>
              <div className="profile-test-header">
                <span className="profile-test-header-result">Результат</span>
                <span className="profile-test-header-date">Дата проходження</span>
              </div>
              <div className="profile-test-section">
                <div className="profile-test-results-list">
                  {mbtiResults.map((result) => (
                    <div key={result.id} className="profile-test-result-row">
                      <span className="profile-test-result-name">{result.result}</span>
                      <span className="profile-test-result-date">
                        {formatDate(result.completedAt)}
                      </span>
                      <span
                        className="profile-test-details-link"
                        onClick={() =>
                          navigate(getTestPath(result.testType), {
                            state: {
                              showSavedResult: true,
                              savedResult: result,
                            },
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        Подробніше
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Секция Інноваційний потенціал особистості */}
          {innovationPotentialResults.length > 0 && (
            <div className="profile-test-section-wrapper">
              <h2 className="profile-test-section-title">Інноваційний потенціал особистості</h2>
              <div className="profile-test-header">
                <span className="profile-test-header-result">Результат</span>
                <span className="profile-test-header-date">Дата проходження</span>
              </div>
              <div className="profile-test-section">
                <div className="profile-test-results-list">
                  {innovationPotentialResults.map((result) => (
                    <div key={result.id} className="profile-test-result-row">
                      <span className="profile-test-result-name">{result.result}</span>
                      <span className="profile-test-result-date">
                        {formatDate(result.completedAt)}
                      </span>
                      <span
                        className="profile-test-details-link"
                        onClick={() =>
                          navigate(getTestPath(result.testType), {
                            state: {
                              savedResult: result,
                            },
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        Подробніше
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Если нет результатов */}
          {testResults.length === 0 && (
            <div className="profile-no-results">
              <p className="profile-no-results-text">Ви ще не пройшли жодного тесту.</p>
              <button
                type="button"
                className="profile-start-test-button"
                onClick={() => {
                  const currentPath = location.pathname;
                  if (currentPath.startsWith('/ua/')) {
                    navigate('/ua/tests');
                  } else if (currentPath.startsWith('/en/')) {
                    navigate('/en/tests');
                  } else {
                    navigate('/tests');
                  }
                }}
              >
                Пройти тестування
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
