import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../layout';
import './Enneagram.css';
import { getAssetUrl } from '../../../utils/assetPath';
import { enneagramQuestions } from './enneagramQuestions';
import { enneagramResults } from './enneagramResults';

// Компонент для печатания текста по словам
function TypewriterWords({ text, delay = 150, startDelay = 0, className = '' }: { text: string; delay?: number; startDelay?: number; className?: string }) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    if (startDelay > 0 && !hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimeout);
    } else if (startDelay === 0) {
      setHasStarted(true);
    }
  }, [startDelay, hasStarted]);

  useEffect(() => {
    if (hasStarted && currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedWords(words.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words, delay, hasStarted]);

  return (
    <span className={className}>
      {displayedWords.map((word, index) => (
        <span key={index}>
          {word}
          {index < displayedWords.length - 1 && ' '}
        </span>
      ))}
      {hasStarted && currentIndex < words.length && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

const robotImageUrl = getAssetUrl('_assets/images/robot_img_2.png');
const enneagramDiagramUrl = getAssetUrl('_assets/images/enneagram_img.png');
const enneagramBubbleBackground = getAssetUrl('_assets/images/borders/eneagrama_border.png');
const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');

export function EnneagramPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isShownResult, setIsShownResult] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('auto');
  const [isSaved, setIsSaved] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  
  // Проверяем, есть ли сохраненный результат для показа
  useEffect(() => {
    const state = location.state as { showSavedResult?: boolean; savedResult?: any };
    if (state?.showSavedResult && state?.savedResult) {
      // Если перешли из профиля с сохраненным результатом, показываем его сразу
      setIsShownResult(true);
      setIsSaved(true);
      // Прокручиваем к результатам
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 200);
    }
  }, [location.state]);

  const generalQuestions = enneagramQuestions.length;
  const speechBubbleStyle = { backgroundImage: `url(${enneagramBubbleBackground})` };

  useEffect(() => {
    if (isShownResult && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isShownResult]);

  useEffect(() => {
    const handleNavigationAttempt = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const href = customEvent.detail;
      setPendingNavigation(href);
      setShowLeaveModal(true);
    };

    window.addEventListener('navigation-attempt', handleNavigationAttempt as EventListener);

    return () => {
      window.removeEventListener('navigation-attempt', handleNavigationAttempt as EventListener);
    };
  }, []);

  const handleSubmit = (answer: 'так' | 'ні' | 'так і ні') => {
    if (currentQuestion >= generalQuestions) {
      return;
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));

    if (currentQuestion < generalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleGetResult = () => {
    if (currentQuestion === generalQuestions - 1 && userAnswers[currentQuestion]) {
      setIsShownResult(true);
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 200);
    }
  };

  // Calculate result
  const types: { [key: number]: number[] } = {
    1: [3, 15, 16, 36, 37, 49, 58, 59, 60, 69],
    2: [6, 7, 8, 18, 19, 39, 40, 51, 62, 82],
    3: [4, 5, 17, 38, 50, 61, 70, 71, 81, 83],
    4: [9, 10, 20, 41, 52, 63, 64, 72, 73, 86],
    5: [1, 2, 13, 14, 35, 48, 68, 77, 84, 88],
    6: [11, 12, 21, 22, 42, 43, 53, 65, 74, 75],
    7: [23, 24, 29, 30, 44, 45, 54, 55, 66, 76],
    8: [25, 26, 31, 32, 46, 56, 67, 78, 85, 89],
    9: [27, 28, 33, 34, 47, 57, 79, 80, 87, 90],
  };

  const scores: { [key: number]: number } = {};
  for (const type in types) {
    const typeNum = Number(type);
    scores[typeNum] = types[typeNum].reduce(
      (sum, questionNum) => sum + (userAnswers[questionNum - 1] === 'так' ? 1 : 0),
      0,
    );
  }

  // Проверяем, есть ли сохраненный результат
  const state = location.state as { showSavedResult?: boolean; savedResult?: any };
  let savedType: number | null = null;
  
  if (state?.showSavedResult && state?.savedResult) {
    // Извлекаем тип из score (например "Тип 1" -> 1)
    const scoreMatch = state.savedResult.score?.match(/Тип\s*(\d+)/i);
    if (scoreMatch) {
      savedType = parseInt(scoreMatch[1], 10);
    }
  }

  const resultType = savedType !== null 
    ? String(savedType)
    : Object.keys(scores).reduce((a, b) =>
        scores[Number(a)] > scores[Number(b)] ? a : b,
      );

  const enneagramResultData = enneagramResults.find((result) => result.type === Number(resultType));

  useEffect(() => {
    if (enneagramResultData) {
      const imagePath = getAssetUrl(
        `_assets/images/enneagrama_answers/${enneagramResultData.type}.svg`,
      );
      setImageSrc(imagePath);
    } else {
      // Если есть сохраненный результат, но enneagramResultData еще не найден
      const state = location.state as { showSavedResult?: boolean; savedResult?: any };
      if (state?.showSavedResult && state?.savedResult) {
        const scoreMatch = state.savedResult.score?.match(/Тип\s*(\d+)/i);
        if (scoreMatch) {
          const type = parseInt(scoreMatch[1], 10);
          const savedResultData = enneagramResults.find((result) => result.type === type);
          if (savedResultData) {
            const imagePath = getAssetUrl(
              `_assets/images/enneagrama_answers/${savedResultData.type}.svg`,
            );
            setImageSrc(imagePath);
          }
        }
      }
    }
  }, [enneagramResultData, location.state]);

  const isFinished = currentQuestion === generalQuestions - 1 && userAnswers[currentQuestion];
  const currentQuestionData = enneagramQuestions[currentQuestion];
  
  // Рассчитываем прогресс: если есть ответ на текущий вопрос, считаем его завершенным
  const answeredQuestions = userAnswers[currentQuestion] ? currentQuestion + 1 : currentQuestion;
  const progress = Math.min(100, Math.round((answeredQuestions / generalQuestions) * 100));
  
  // Проверяем, есть ли сохраненный результат для показа (используем state, объявленный выше)
  const isShowingSavedResult = state?.showSavedResult && state?.savedResult;

  return (
    <div className="enneagram-page">
      <Sidebar />
      <main className="enneagram-main">
        <div className="enneagram-content">
          {/* Вводная секция - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="enneagram-intro-section">
            <h1 className="enneagram-title">Енеаграма</h1>
            <div className="enneagram-description">
              <p>
                <strong>Еннеаграма</strong> (з грецької ennea – дев'ять і grammos – фігура) – це психологічна модель, що описує 9 глибинних мотивів, які керують нами на підсвідомому рівні.
              </p>
            </div>
          </section>
          )}

          {/* Секция с роботом, бордером и диаграммой - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="enneagram-main-section">
            <div className="enneagram-robot-image">
              <img src={robotImageUrl} alt="Robot" />
            </div>
            <div className="enneagram-speech-bubble" style={speechBubbleStyle}>
              <p>
                <TypewriterWords 
                  text="Кожен із 9 мотивів породжує цілком певний характер, з властивими йому розумовими стратегіями, емоційними реакціями та життєвими установками."
                  delay={100}
                />
                <br />
                <strong>
                  <TypewriterWords 
                    text="Щоб визначити свій еннеа-тип, пройди тестування"
                    delay={120}
                    startDelay={3500}
                  />
                </strong>
              </p>
            </div>
            <div className="enneagram-diagram-container">
              <img src={enneagramDiagramUrl} alt="Енеаграма" className="enneagram-diagram" />
            </div>
            {/* Текст для мобильной версии */}
            <div className="enneagram-mobile-text">
              <p>
                Кожен із 9 мотивів породжує цілком певний характер, з властивими йому розумовими стратегіями, емоційними реакціями та життєвими установками.
              </p>
              <p>
                <strong>Щоб визначити свій еннеа-тип, пройди тестування</strong>
              </p>
            </div>
          </section>
          )}

          {/* Секция с вопросами - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="enneagram-question-section-wrapper">
            <div className="enneagram-header">
              <button className="enneagram-back-button" onClick={() => setShowLeaveModal(true)}>
                Назад
              </button>
              <div className="enneagram-counter">
                <span>
                  Питання {answeredQuestions} / {generalQuestions} ({progress}%)
                </span>
                <div
                  className="enneagram-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="enneagram-question-section">
              {isFinished ? (
                <button onClick={handleGetResult} className="enneagram-get-result-button">
                  <span>Дізнатися результат</span>
                  <svg
                    className="enneagram-arrow-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 11"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.219168 0.375342C0.564178 -0.0559202 1.19347 -0.125842 1.62473 0.219168L11 7.71941L20.3753 0.219168C20.8066 -0.125842 21.4359 -0.0559202 21.7809 0.375342C22.1259 0.806604 22.056 1.4359 21.6247 1.78091L11 10.2807L0.375342 1.78091C-0.0559202 1.4359 -0.125842 0.806604 0.219168 0.375342Z"
                      fill="#347AEC"
                    />
                  </svg>
                </button>
              ) : (
                <p className="enneagram-question-text">{currentQuestionData?.text}</p>
              )}
            </div>

            {!isFinished && (
              <div className="enneagram-buttons">
                <button
                  className="enneagram-answer-button"
                  onClick={() => handleSubmit('так')}
                  disabled={currentQuestion >= generalQuestions}
                >
                  Так
                </button>
                <button
                  className="enneagram-answer-button enneagram-answer-button-middle"
                  onClick={() => handleSubmit('так і ні')}
                  disabled={currentQuestion >= generalQuestions}
                >
                  І Так, і ні
                </button>
                <button
                  className="enneagram-answer-button"
                  onClick={() => handleSubmit('ні')}
                  disabled={currentQuestion >= generalQuestions}
                >
                  Ні
                </button>
              </div>
            )}

            {currentQuestion > 0 && !isFinished && (
              <div className="enneagram-navigation">
                <button
                  className="enneagram-prev-button"
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion((prev) => prev - 1);
                    }
                  }}
                >
                  <svg
                    className="enneagram-prev-arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Попереднє питання
                </button>
              </div>
            )}
          </section>
          )}

          {isShownResult && enneagramResultData && (
            <>
              {isShowingSavedResult && (
                <div className="enneagram-saved-result-header" style={{ 
                  marginBottom: '2rem',
                  marginTop: '30px',
                  width: '100%',
                  maxWidth: '842px',
                  marginLeft: '-50px',
                  marginRight: 'auto'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      const currentPath = location.pathname;
                      if (currentPath.startsWith('/ua/')) {
                        navigate('/ua/my-profile');
                      } else if (currentPath.startsWith('/en/')) {
                        navigate('/en/my-profile');
                      } else {
                        navigate('/my-profile');
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#347AEC',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontFamily: 'Montserrat, sans-serif',
                      marginBottom: '0.5rem',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      padding: 0
                    }}
                  >
                    ← Назад до профілю
                  </button>
                  <h1 style={{
                    fontFamily: 'Unbounded, sans-serif',
                    fontSize: '40px',
                    fontWeight: 400,
                    color: '#262626',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.2'
                  }}>
                    Енеаграма
                  </h1>
                  {state?.savedResult?.completedAt && (
                    <p style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '16px',
                      color: '#666',
                      margin: 0
                    }}>
                      Дата проходження: {(() => {
                        const date = new Date(state.savedResult.completedAt);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}/${month}/${year}`;
                      })()}
                    </p>
                  )}
                </div>
              )}
              <div ref={contentRef} className="enneagram-result" style={{ maxHeight: height }}>
                <div className="enneagram-result-content">
                <div className="enneagram-result-image">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={`Тип ${enneagramResultData.type}`}
                      className="enneagram-result-img"
                    />
                  )}
                </div>
                <div className="enneagram-result-text">
                  <h1 className="enneagram-result-title">{enneagramResultData.title}</h1>
                  <p className="enneagram-result-type">{resultType} тип</p>
                  <p className="enneagram-result-description">{enneagramResultData.description}</p>
                  <p className="enneagram-result-field">
                    <span className="enneagram-result-label">Життєве кредо:</span>{' '}
                    {enneagramResultData.lifeCreed}
                  </p>
                  <p className="enneagram-result-field">
                    <span className="enneagram-result-label">Ключове слово:</span>{' '}
                    {enneagramResultData.keyword}
                  </p>
                  <p className="enneagram-result-field">
                    <span className="enneagram-result-label">Кар'єрні орієнтації:</span>{' '}
                    {enneagramResultData.careerOrientations}
                  </p>
                  <p className="enneagram-result-field">
                    <span className="enneagram-result-label">Можливі професії:</span>{' '}
                    {enneagramResultData.possibleProfessions}
                  </p>
                  {/* Кнопка "Зберегти результат" - скрываем если показываем сохраненный результат */}
                  {!isShowingSavedResult && (
                    <>
                      <button 
                        className={`enneagram-save-result-button ${isSaved ? 'enneagram-save-result-button--saved' : ''}`}
                        onClick={async () => {
                      if (isSaved || !enneagramResultData) return;
                      
                      try {
                        const authToken = localStorage.getItem('authToken');
                        if (!authToken) {
                          alert('Будь ласка, увійдіть в систему для збереження результату');
                          return;
                        }

                        await axios.post(
                          `http://localhost:3000/api/test-results/`,
                          {
                            testName: 'Енеаграма',
                            testType: 'enneagram',
                            result: enneagramResultData.title,
                            score: `Тип ${enneagramResultData.type}`,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${authToken}`,
                            },
                          }
                        );

                        setIsSaved(true);
                        console.log('Result saved successfully');
                      } catch (error: any) {
                        console.error('Error saving result:', error);
                        const errorMessage = error.response?.data?.detail || error.message || 'Помилка при збереженні результату';
                        alert(`Помилка: ${errorMessage}`);
                      }
                        }}
                      >
                        Зберегти результат
                      </button>
                      {isSaved && (
                        <p className="enneagram-save-message">
                          Результат збережено в особистому кабінеті
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            </>
          )}
        </div>
      </main>

      {/* Модальное окно подтверждения выхода */}
      {showLeaveModal && (
        <div className="enneagram-modal-overlay" onClick={() => {
          setShowLeaveModal(false);
          setPendingNavigation(null);
        }}>
          <div className="enneagram-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="enneagram-modal-close"
              onClick={() => {
                setShowLeaveModal(false);
                setPendingNavigation(null);
              }}
            >
              ×
            </button>
            <div className="enneagram-modal-body">
              <div className="enneagram-modal-robot">
                <img src={sadRobotImageUrl} alt="Sad Robot" />
              </div>
              <div className="enneagram-modal-text-content">
                <h2 className="enneagram-modal-title">Ви впевнені?</h2>
                <p className="enneagram-modal-message">
                  Якщо ви залишите сторінку зараз, ми не зможемо зберегти ваші результати. Продовжити?
                </p>
                <div className="enneagram-modal-buttons">
                  <button
                    className="enneagram-modal-button enneagram-modal-button-outline"
                    onClick={() => {
                      const href = pendingNavigation || '/tests';
                      setShowLeaveModal(false);
                      setPendingNavigation(null);
                      navigate(href);
                    }}
                  >
                    Залишити сторінку
                  </button>
                  <button
                    className="enneagram-modal-button enneagram-modal-button-primary"
                    onClick={() => {
                      setShowLeaveModal(false);
                      setPendingNavigation(null);
                    }}
                  >
                    Продовжити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
