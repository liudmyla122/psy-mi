import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../layout';
import './MBI.css';
import { getAssetUrl } from '../../../utils/assetPath';

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
const mbiBubbleBackground = getAssetUrl('_assets/images/borders/mbi_border.png');
const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');
const mbiHighResultUrl = getAssetUrl('_assets/images/mbi_answers/high.png');
const mbiMediumResultUrl = getAssetUrl('_assets/images/mbi_answers/medium.png');
const mbiLowResultUrl = getAssetUrl('_assets/images/mbi_answers/low.png');

// 22 вопроса MBI теста
const mbiQuestions = [
  'Я відчуваю себе емоційно виснаженим через свою роботу.',
  'Після робочого дня я відчуваю себе виснаженим.',
  'Ранком, коли я прокидаюся і думаю про те, що мені потрібно йти на роботу, я відчуваю себе втомленим.',
  'Я легко розумію, що відчуваю мої клієнти/пацієнти/учні.',
  'Я відчуваю, що я сприймаю деяких клієнтів/пацієнтів/учнів як безособові об\'єкти.',
  'Я відчуваю, що робота дуже сильно виснажує мене.',
  'Я відчуваю, що я ефективно вирішую проблеми людей, з якими працюю.',
  'Я відчуваю, що робота "висушує" мене.',
  'Я відчуваю, що я впливаю позитивно на життя інших людей через свою роботу.',
  'Я стався до деяких клієнтів/пацієнтів/учнів без емоцій.',
  'Я турбуюся про те, що ця робота робить мене емоційно жорсткішим.',
  'Я відчуваю себе енергійним.',
  'Я відчуваю розчарування через свою роботу.',
  'Я відчуваю, що занадто багато працюю.',
  'Я не дбаю про те, що відбувається з деякими клієнтами/пацієнтами/учнями.',
  'Робота безпосередньо з людьми створює для мене багато стресу.',
  'Я легко можу створювати розслаблену атмосферу з моїми клієнтами/пацієнтами/учнями.',
  'Я відчуваю себе натхненним після роботи з моїми клієнтами/пацієнтами/учнями.',
  'Я досяг багатьох цілей у своїй роботі.',
  'Я відчуваю себе "вигорілим" через свою роботу.',
  'Я відчуваю, що працюю з дуже важкими клієнтами/пацієнтами/учнями.',
  'Я відчуваю себе дуже енергійним на роботі.',
];

export function MBIPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [showDetachmentDetails, setShowDetachmentDetails] = useState(false);
  const [showAchievementDetails, setShowAchievementDetails] = useState(false);

  // Проверяем, есть ли сохраненный результат для показа
  useEffect(() => {
    const state = location.state as { showSavedResult?: boolean; savedResult?: any };
    if (state?.showSavedResult && state?.savedResult) {
      // Если перешли из профиля с сохраненным результатом, показываем его сразу
      setShowResults(true);
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

  const totalBlocks = 4;
  const questionsPerBlock = 6;

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

  const handleAnswerChange = (questionIndex: number, answer: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleNextBlock = () => {
    if (currentBlock < totalBlocks) {
      setCurrentBlock(currentBlock + 1);
    }
  };

  const handlePrevBlock = () => {
    if (currentBlock > 1) {
      setCurrentBlock(currentBlock - 1);
    }
  };

  const handleSubmitTest = () => {
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showResults]);

  const getCurrentBlockQuestions = () => {
    const startIndex = (currentBlock - 1) * questionsPerBlock;
    return mbiQuestions.slice(startIndex, startIndex + questionsPerBlock);
  };

  // Проверка: все ли вопросы имеют ответ
  const totalQuestions = mbiQuestions.length;
  const answeredQuestionsCount = Object.keys(answers).length;
  const isAllQuestionsAnswered = answeredQuestionsCount >= totalQuestions;

  // Функция для восстановления результатов из сохраненных данных
  const createMBIResultFromSavedData = (savedResult: any) => {
    // Извлекаем значения из score (например "EE:18 D:5 PA:42")
    const scoreStr = savedResult.score || '';
    const eeMatch = scoreStr.match(/EE:(\d+)/);
    const dMatch = scoreStr.match(/D:(\d+)/);
    const paMatch = scoreStr.match(/PA:(\d+)/);
    
    return {
      emotionalExhaustion: eeMatch ? parseInt(eeMatch[1], 10) : 0,
      depersonalization: dMatch ? parseInt(dMatch[1], 10) : 0,
      personalAccomplishment: paMatch ? parseInt(paMatch[1], 10) : 0,
    };
  };

  // Расчет результатов по трем шкалам MBI
  const calculateResults = () => {
    // Проверяем, есть ли сохраненный результат
    const state = location.state as { showSavedResult?: boolean; savedResult?: any };
    if (state?.showSavedResult && state?.savedResult) {
      return createMBIResultFromSavedData(state.savedResult);
    }

    // Эмоциональное истощение (вопросы: 1, 2, 3, 6, 8, 13, 14, 16, 20)
    const emotionalExhaustionIndices = [0, 1, 2, 5, 7, 12, 13, 15, 19];
    const emotionalExhaustion = emotionalExhaustionIndices.reduce((sum, idx) => {
      return sum + (answers[idx] || 0);
    }, 0);

    // Деперсонализация (вопросы: 5, 10, 11, 15, 22)
    const depersonalizationIndices = [4, 9, 10, 14, 20];
    const depersonalization = depersonalizationIndices.reduce((sum, idx) => {
      return sum + (answers[idx] || 0);
    }, 0);

    // Редукция личных достижений (вопросы: 4, 7, 9, 12, 17, 18, 21, 22 - инвертированные)
    const personalAccomplishmentIndices = [3, 6, 8, 11, 16, 17, 21];
    const personalAccomplishment = personalAccomplishmentIndices.reduce((sum, idx) => {
      // Инвертируем значения (6 - ответ)
      return sum + (6 - (answers[idx] || 0));
    }, 0);

    return {
      emotionalExhaustion,
      depersonalization,
      personalAccomplishment,
    };
  };

  const getResultLevel = (score: number, scale: 'emotionalExhaustion' | 'depersonalization' | 'personalAccomplishment') => {
    if (scale === 'emotionalExhaustion') {
      if (score >= 27) return { level: 'ВИСОКИЙ', image: mbiHighResultUrl, color: '#ef4444' };
      if (score >= 17) return { level: 'СЕРЕДНІЙ', image: mbiMediumResultUrl, color: '#f59e0b' };
      return { level: 'НИЗЬКИЙ', image: mbiLowResultUrl, color: '#10b981' };
    }
    if (scale === 'depersonalization') {
      if (score >= 13) return { level: 'ВИСОКИЙ', image: mbiHighResultUrl, color: '#ef4444' };
      if (score >= 7) return { level: 'СЕРЕДНІЙ', image: mbiMediumResultUrl, color: '#f59e0b' };
      return { level: 'НИЗЬКИЙ', image: mbiLowResultUrl, color: '#10b981' };
    }
    // personalAccomplishment (инвертированная шкала)
    if (score <= 31) return { level: 'ВИСОКИЙ', image: mbiHighResultUrl, color: '#ef4444' };
    if (score <= 38) return { level: 'СЕРЕДНІЙ', image: mbiMediumResultUrl, color: '#f59e0b' };
    return { level: 'НИЗЬКИЙ', image: mbiLowResultUrl, color: '#10b981' };
  };

  const speechBubbleStyle = { backgroundImage: `url(${mbiBubbleBackground})` };

  // Проверяем, показываем ли сохраненный результат
  const state = location.state as { showSavedResult?: boolean; savedResult?: any };
  const isShowingSavedResult = state?.showSavedResult && state?.savedResult;

  return (
    <div className="mbi-page">
      <Sidebar />
      <main className="mbi-main">
        <div className="mbi-content">
          {!isShowingSavedResult && (
            <section className="mbi-intro-section">
            <h1 className="mbi-title">Тест МВІ</h1>
            <div className="mbi-description">
              <p>
                <strong>Тест МВІ</strong> розроблений для оцінки <strong>рівня вигорання</strong>. Він досліджує такі компоненти, як емоційне виснаження, відчуття відчуження та зниження особистих досягнень. Це дозволяє визначити ступінь вигорання та <strong>його вплив на людину</strong>.
              </p>
            </div>
          </section>
          )}

          {!showResults && !isShowingSavedResult && (
            <>
              <section className="mbi-question-section">
                <div className="mbi-robot-bubble-container">
                  <div className="mbi-bubble-wrapper">
                    <div className="mbi-speech-bubble" style={speechBubbleStyle}>
                      <div className="mbi-speech-bubble-content">
                        <p>
                          <TypewriterWords 
                            text="Для кожного твердження оберіть відповідь, яка найбільш точно відображає ваш поточний стан. Оцініть, як часто ви відчуваєте описане, і позначте відповідь відповідно до зазначеної шкали."
                            delay={100}
                          />
                        </p>
                        <p>
                          <strong>
                            <TypewriterWords 
                              text="Оцініть, як часто ви відчуваєте описане, і позначте відповідь відповідно до зазначеної шкали."
                              delay={120}
                              startDelay={3500}
                            />
                          </strong>
                        </p>
                      </div>
                    </div>
                    <div className="mbi-robot-image">
                      <img src={robotImageUrl} alt="Robot" />
                    </div>
                  </div>
                </div>

                {/* Answer Options Section */}
                <div className="mbi-answer-options-section">
                  <h2 className="mbi-answer-options-title">Варіанти відповідей</h2>
                  <div className="mbi-answer-options-grid">
                    {/* Left Column */}
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Ніколи</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">0</span>
                      </div>
                    </div>
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Декілька разів на рік</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">1</span>
                      </div>
                    </div>
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Один раз на місяць</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">2</span>
                      </div>
                    </div>
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Декілька разів на місяць</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">3</span>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Один раз на тиждень</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">4</span>
                      </div>
                    </div>
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Декілька разів на тиждень</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">5</span>
                      </div>
                    </div>
                    <div className="mbi-answer-option-row">
                      <div className="mbi-answer-option-box">
                        <span className="mbi-answer-option-label">Кожен день</span>
                      </div>
                      <div className="mbi-answer-option-number-box">
                        <span className="mbi-answer-option-number">6</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mbi-back-button"
                    onClick={() => {
                      setPendingNavigation('/tests');
                      setShowLeaveModal(true);
                    }}
                  >
                    Назад
                  </button>
                </div>

                <div className="mbi-questions-block">
                  <div className="mbi-questions-content">
                    <div className="mbi-questions-main">
                      <div className="mbi-questions-header">
                        <div className="mbi-questions-numbers">
                          {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                            <span key={num} className="mbi-question-number">
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mbi-questions-list">
                        {getCurrentBlockQuestions().map((question, blockIndex) => {
                          const questionIndex = (currentBlock - 1) * questionsPerBlock + blockIndex;
                          return (
                            <div key={questionIndex} className="mbi-question-item">
                              <div className="mbi-question-text-wrapper">
                                <p className="mbi-question-text">{question}</p>
                              </div>
                              <div className="mbi-question-answers-wrapper">
                                <div className="mbi-question-answers">
                                  {[0, 1, 2, 3, 4, 5, 6].map((value) => (
                                    <label key={value} className="mbi-radio-label">
                                      <input
                                        type="radio"
                                        name={`question-${questionIndex}`}
                                        value={value}
                                        checked={answers[questionIndex] === value}
                                        onChange={() => handleAnswerChange(questionIndex, value)}
                                        className="mbi-radio-input"
                                      />
                                      <span className="mbi-radio-custom"></span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mbi-progress-block">
                      <div className="mbi-progress-wrapper">
                        <div className="mbi-progress-container">
                          <div className="mbi-progress-info">
                            <span className="mbi-progress-label">Пройдено</span>
                            <span className="mbi-progress-number">
                              {currentBlock}/{totalBlocks}
                            </span>
                            <span className="mbi-progress-text">блоків</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mbi-navigation-buttons">
                    <button
                      type="button"
                      className="mbi-nav-button mbi-nav-button-prev"
                      onClick={handlePrevBlock}
                      disabled={currentBlock === 1}
                    >
                      ← попередній блок
                    </button>
                    <button
                      type="button"
                      className="mbi-nav-button mbi-nav-button-next"
                      onClick={handleNextBlock}
                      disabled={currentBlock >= totalBlocks}
                    >
                      наступний блок →
                    </button>
                  </div>
                </div>
              </section>

              {isAllQuestionsAnswered && (
                <div className="mbi-test-navigation">
                  <button type="button" className="mbi-result-button" onClick={handleSubmitTest}>
                    <span className="mbi-result-button-text">Дізнатися результат</span>
                    <svg
                      className="mbi-result-button-icon"
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5 1.5L10 10.5L1.5 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}

          {showResults && (() => {
            const state = location.state as { showSavedResult?: boolean; savedResult?: any };
            const isShowingSavedResult = state?.showSavedResult && state?.savedResult;
            const results = calculateResults();
            const emotionalExhaustionLevel = getResultLevel(results.emotionalExhaustion, 'emotionalExhaustion');

            const emotionalMax = 54; // 9 питань * 6 балів
            const depersonalizationMax = 30; // 5 питань * 6 балів
            const personalMax = 48; // 8 умовних одиниць для візуального відображення

            const emotionalPercent = Math.min(100, Math.round((results.emotionalExhaustion / emotionalMax) * 100));
            const depersonalizationPercent = Math.min(100, Math.round((results.depersonalization / depersonalizationMax) * 100));
            const personalPercent = Math.min(100, Math.round((results.personalAccomplishment / personalMax) * 100));

            return (
              <>
                {isShowingSavedResult && (
                  <div className="mbi-saved-result-header" style={{ 
                    marginBottom: '2rem',
                    marginTop: '40px',
                    width: '100%',
                    maxWidth: '842px',
                    marginLeft: '80px',
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
                      Тест МВІ
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
                <div ref={resultsRef} className="mbi-results">
                <h1 className="mbi-results-title">Результат тесту MBI</h1>

                {/* Секція вигорання */}
                <section className="mbi-burnout-section">
                  <h2 className="mbi-burnout-title">Вигорання</h2>
                  
                  <div className="mbi-burnout-progress-wrapper">
                    <div className="mbi-burnout-progress-top">
                      <span className="mbi-burnout-progress-number">{results.emotionalExhaustion}</span>
                      <span className="mbi-burnout-progress-number mbi-burnout-progress-number-right">
                        {emotionalMax}
                      </span>
                    </div>
                    <div className="mbi-burnout-progress-bottom">
                      <div className="mbi-burnout-progress-center">
                        <div className="mbi-burnout-progress-track">
                          <div
                            className="mbi-burnout-progress-fill"
                            style={{ width: `${emotionalPercent}%` }}
                          />
                        </div>
                      </div>
                      <div className="mbi-burnout-progress-score">
                        <span className="mbi-burnout-score-value-blue">{results.emotionalExhaustion}</span>
                        <span className="mbi-burnout-score-separator"> / </span>
                        <span className="mbi-burnout-score-value-purple">{emotionalMax}</span>
                        <div className="mbi-burnout-score-label">балів</div>
                      </div>
                    </div>
                  </div>

                  <p className="mbi-burnout-caption">
                    <strong>Вигорання:</strong> шкала оцінює стан фізичної та емоційної втоми, що виникає через постійне
                    напруження, пов&apos;язане з роботою. Стан характеризується втомою від самої думки про роботу,
                    хронічним виснаженням, проблемами зі сном та фізичним нездужанням. Для MBI, як і для більшості
                    авторів, &quot;виснаження є ключовим компонентом синдрому&quot;.
                  </p>

                  <div className="mbi-burnout-main-card">
                    <div className="mbi-burnout-image">
                      <img src={emotionalExhaustionLevel.image} alt={emotionalExhaustionLevel.level} />
                    </div>
                    <div className="mbi-burnout-text">
                      {results.emotionalExhaustion <= 16 ? (
                        <>
                          <h3 className="mbi-burnout-main-title">
                            Загальний бал 16 або менше:
                            <br />
                            <span className="mbi-burnout-main-title-accent">ВІДСУТНІСТЬ ВИГОРАННЯ</span>
                          </h3>
                          <p className="mbi-burnout-text-paragraph">
                            Ознаки вигорання відсутні. Енергійність, позитивне ставлення до роботи та взаємодії з людьми
                            зберігаються. Емоційний і фізичний стан залишається стабільним, без відчуття перевантаження
                            чи хронічної втоми.
                          </p>
                          <p className="mbi-burnout-text-paragraph">
                            Робота приносить задоволення, її результати мотивують до розвитку та досягнення нових цілей.
                            Проблеми не мають значного впливу на продуктивність чи загальний настрій.
                          </p>
                        </>
                      ) : results.emotionalExhaustion >= 17 && results.emotionalExhaustion <= 26 ? (
                        <>
                          <h3 className="mbi-burnout-main-title">
                            Загальний бал від 17 до 26 включно:{' '}
                            <span className="mbi-burnout-main-title-accent">ПОМІРНИЙ РІВЕНЬ ВИГОРАННЯ</span>
                          </h3>
                          <p className="mbi-burnout-text-paragraph">
                            Помірне вигорання супроводжується ознаками хронічної втоми, зниженням продуктивності та
                            проблемами зі сном. Можуть виникати труднощі з концентрацією уваги, а рутинні завдання
                            викликати роздратування чи почуття перевантаження.
                          </p>
                          <p className="mbi-burnout-text-paragraph">
                            У робочій діяльності може з&apos;являтися втрата інтересу та мотивації, однак за межами роботи
                            емоційний стан залишається кращим. Такий стан свідчить про необхідність приділити увагу
                            відновленню балансу між роботою та особистим життям.
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="mbi-burnout-main-title">
                            Загальний бал більше 27:{' '}
                            <span className="mbi-burnout-main-title-accent">ІНТЕНСИВНЕ ВИГОРАННЯ</span>
                          </h3>
                          <p className="mbi-burnout-text-paragraph">
                            Інтенсивне вигорання характеризується сильним фізичним та емоційним виснаженням. Постійна
                            втома, навіть після відпочинку, апатія, зниження мотивації та інтересу до роботи стають
                            домінуючими відчуттями.
                          </p>
                          <p className="mbi-burnout-text-paragraph">
                            Цей стан може призводити до втрати віри у власні здібності, труднощів у взаємодії з
                            колегами або клієнтами, а також відчуття безвиході. Часто супроводжується високим рівнем
                            стресу, що негативно впливає як на професійне життя, так і на загальний стан здоров&apos;я.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </section>

                {/* Інші шкали (короткі картки) */}
                <section className="mbi-scales-section">
                  <div className="mbi-scale-card">
                    <header className="mbi-scale-card-header">
                      <h3 className="mbi-scale-card-title">Відчуження</h3>
                    </header>

                    {/* Прогрес-бар для "Відчуження" в стилі секції "Вигорання" */}
                    <div className="mbi-burnout-progress-wrapper">
                      <div className="mbi-burnout-progress-top">
                        <span className="mbi-burnout-progress-number">{results.depersonalization}</span>
                        <span className="mbi-burnout-progress-number mbi-burnout-progress-number-right">
                          {depersonalizationMax}
                        </span>
                      </div>
                      <div className="mbi-burnout-progress-bottom">
                        <div className="mbi-burnout-progress-center">
                          <div className="mbi-burnout-progress-track">
                            <div
                              className="mbi-burnout-progress-fill"
                              style={{ width: `${depersonalizationPercent}%` }}
                            />
                          </div>
                        </div>
                        <div className="mbi-burnout-progress-score">
                          <span className="mbi-burnout-score-value-blue">{results.depersonalization}</span>
                          <span className="mbi-burnout-score-separator"> / </span>
                          <span className="mbi-burnout-score-value-purple">{depersonalizationMax}</span>
                          <div className="mbi-burnout-score-label">балів</div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`mbi-scale-card-link ${showDetachmentDetails ? 'mbi-scale-card-link--active' : ''}`}
                      onClick={() => setShowDetachmentDetails((prev) => !prev)}
                    >
                      Дізнатися більше
                    </button>
                  </div>

                  {/* Детальний опис шкали "Відчуження" (усі рівні) */}
                  {showDetachmentDetails && (
                    <section className="mbi-detachment-section">
                      <p className="mbi-detachment-caption">
                        <strong>Відчуження:</strong> шкала оцінює відчуття відстороненості та втрати емпатії до
                        оточуючих. Стан може характеризуватися байдужістю, цинізмом і негативним ставленням до інших
                        людей. Можливі почуття провини, уникнення соціальних контактів і емоційне замикання в собі. У
                        професійній діяльності це проявляється як відсутність емпатії та небажання встановлювати
                        емоційний зв&apos;язок з оточуючими.
                      </p>

                      {results.depersonalization <= 6 ? (
                        <>
                          <h3 className="mbi-detachment-title">
                            Загальний бал 6 або менше:{' '}
                            <span className="mbi-detachment-title-accent">ВІДСУТНІСТЬ ВІДЧУЖЕННЯ</span>
                          </h3>

                          <p className="mbi-detachment-text">
                            Відсутність відчуження свідчить про збереження емоційної стабільності, здатності до емпатії
                            та позитивного ставлення до оточуючих. Взаємодія з іншими залишається адекватною, без
                            відчуття відстороненості чи байдужості.
                          </p>
                          <p className="mbi-detachment-text">
                            Стресові ситуації ефективно контролюються, зберігаються здорові стосунки з колегами /
                            клієнтами.
                          </p>
                        </>
                      ) : results.depersonalization <= 12 ? (
                        <>
                          <h3 className="mbi-detachment-title">
                            Загальний бал від 7 до 12 включно:{' '}
                            <span className="mbi-detachment-title-accent">ПОМІРНИЙ РІВЕНЬ ВІДЧУЖЕННЯ</span>
                          </h3>

                          <p className="mbi-detachment-text">
                            Помірний рівень відчуження проявляється емоційною відстороненістю, цинізмом або негативним
                            ставленням до інших. Взаємодія з колегами чи клієнтами може викликати труднощі у
                            встановленні емоційного зв&apos;язку.
                          </p>
                          <p className="mbi-detachment-text">
                            Такий стан не є критичним, але вимагає уваги, щоб уникнути подальшого погіршення.
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="mbi-detachment-title">
                            Загальний бал 13 і більше:{' '}
                            <span className="mbi-detachment-title-accent">ВИСОКИЙ РІВЕНЬ ВІДЧУЖЕННЯ</span>
                          </h3>

                          <p className="mbi-detachment-text">
                            Значний рівень характеризується вираженим відчуттям відстороненості, байдужістю або навіть
                            цинізмом у стосунках з оточуючими. Соціальні контакти стають обтяжливими, виникає почуття
                            провини за байдужість, а здатність до емпатії суттєво знижується.
                          </p>
                          <p className="mbi-detachment-text">
                            Такий стан може негативно впливати на професійну діяльність та емоційний стан.
                          </p>
                        </>
                      )}
                    </section>
                  )}

                  <div className="mbi-scale-card">
                    <header className="mbi-scale-card-header">
                      <h3 className="mbi-scale-card-title">Особисті досягнення</h3>
                    </header>

                    {/* Прогрес-бар для "Особисті досягнення" в стилі інших секцій */}
                    <div className="mbi-burnout-progress-wrapper">
                      <div className="mbi-burnout-progress-top">
                        <span className="mbi-burnout-progress-number">{results.personalAccomplishment}</span>
                        <span className="mbi-burnout-progress-number mbi-achievement-progress-number-right">
                          {personalMax}
                        </span>
                      </div>
                      <div className="mbi-burnout-progress-bottom">
                        <div className="mbi-burnout-progress-center">
                          <div className="mbi-burnout-progress-track">
                            <div
                              className="mbi-burnout-progress-fill"
                              style={{ width: `${personalPercent}%` }}
                            />
                          </div>
                        </div>
                        <div className="mbi-burnout-progress-score">
                          <span className="mbi-burnout-score-value-blue">{results.personalAccomplishment}</span>
                          <span className="mbi-burnout-score-separator"> / </span>
                          <span className="mbi-burnout-score-value-purple">{personalMax}</span>
                          <div className="mbi-burnout-score-label">балів</div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`mbi-scale-card-link ${showAchievementDetails ? 'mbi-scale-card-link--active' : ''}`}
                      onClick={() => setShowAchievementDetails((prev) => !prev)}
                    >
                      Дізнатися більше
                    </button>
                  </div>
                </section>

                {/* Детальний опис шкали "Особисті досягнення" (усі рівні) */}
                {showAchievementDetails && (
                  <section className="mbi-achievement-section">
                    <p className="mbi-achievement-caption">
                      <strong>Особисті досягнення:</strong> шкала відображає самосприйняття особистих успіхів та
                      ефективності. Людина може оцінювати себе негативно, відчуваючи, що її зусилля не дають
                      результатів і ситуація не змінюється на краще. Це призводить до сумнівів у власних здібностях та
                      демотивації. Зменшення особистих досягнень часто є наслідком виснаження та деперсоналізації, що
                      посилює загальний стан вигорання.
                    </p>

                    {results.personalAccomplishment <= 7 ? (
                      <>
                        <h3 className="mbi-achievement-title">
                          Загальний бал 7 або менше:{' '}
                          <span className="mbi-achievement-title-accent">НИЗЬКА ОЦІНКА ОСОБИСТИХ ДОСЯГНЕНЬ</span>
                        </h3>

                        <p className="mbi-achievement-text">
                          Низька оцінка характеризується значними сумнівами у своїх здібностях і нездатністю ефективно
                          досягати професійних успіхів. Може виникати почуття безнадії, відсутність мотивації та
                          зниження впевненості в своїх професійних якостях.
                        </p>
                        <p className="mbi-achievement-text">
                          Такий стан негативно впливає на продуктивність і загальне ставлення до роботи.
                        </p>
                      </>
                    ) : results.personalAccomplishment <= 32 ? (
                      <>
                        <h3 className="mbi-achievement-title">
                          Загальний бал від 8 до 32 включно:{' '}
                          <span className="mbi-achievement-title-accent">ПОМІРНА ОЦІНКА ОСОБИСТИХ ДОСЯГНЕНЬ</span>
                        </h3>

                        <p className="mbi-achievement-text">
                          Помірний рівень оцінки свідчить про певні сумніви у власних здібностях. Незважаючи на це, є
                          можливість досягати успіхів у роботі, хоча іноді може спостерігатися зниження впевненості та
                          мотивації.
                        </p>
                        <p className="mbi-achievement-text">
                          Можливі труднощі в підтримці стабільного емоційного стану під час виконання професійних
                          обов&apos;язків.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="mbi-achievement-title">
                          Загальний бал 33 або більше:{' '}
                          <span className="mbi-achievement-title-accent">ВИСОКА ОЦІНКА ОСОБИСТИХ ДОСЯГНЕНЬ</span>
                        </h3>

                        <p className="mbi-achievement-text">
                          Високий рівень оцінки особистих досягнень демонструє високу мотивацію, впевненість у
                          здібностях і здатність досягати поставлених цілей. Ефективність у вирішенні завдань
                          залишається високою, а професійна діяльність приносить задоволення та почуття
                          самореалізації.
                        </p>
                        <p className="mbi-achievement-text">
                          Високий бал у перших двох розділах та низький бал у останньому розділі можуть свідчити про
                          вигорання.
                        </p>
                      </>
                    )}
                  </section>
                )}

                {!isShowingSavedResult && (
                  <div className="mbi-save-section">
                    <button
                      type="button"
                      className={`mbi-save-button ${isSaved ? 'saved' : ''}`}
                      onClick={async () => {
                        if (isSaved) return;
                      
                      try {
                        const authToken = localStorage.getItem('authToken');
                        if (!authToken) {
                          alert('Будь ласка, увійдіть в систему для збереження результату');
                          return;
                        }

                        console.log('Saving MBI result...');
                        console.log('Answers:', answers);
                        console.log('Total answers:', Object.keys(answers).length);
                        
                        const results = calculateResults();
                        console.log('Calculated results:', results);
                        
                        if (!results) {
                          alert('Помилка: не вдалося розрахувати результати тесту');
                          return;
                        }
                        
                        if (Object.keys(answers).length < 22) {
                          alert('Будь ласка, відповідайте на всі питання перед збереженням результату');
                          return;
                        }

                        const emotionalExhaustionLevel = getResultLevel(results.emotionalExhaustion, 'emotionalExhaustion');
                        const depersonalizationLevel = getResultLevel(results.depersonalization, 'depersonalization');
                        const personalLevel = getResultLevel(results.personalAccomplishment, 'personalAccomplishment');

                        // Формируем строку результата для сохранения
                        const resultText = `Емоційне виснаження: ${results.emotionalExhaustion} (${emotionalExhaustionLevel.level}), Відчуження: ${results.depersonalization} (${depersonalizationLevel.level}), Особисті досягнення: ${results.personalAccomplishment} (${personalLevel.level})`;
                        const scoreText = `EE:${results.emotionalExhaustion} D:${results.depersonalization} PA:${results.personalAccomplishment}`;

                        console.log('Sending data:', {
                          testName: 'Тест MBI',
                          testType: 'mbi',
                          result: resultText,
                          score: scoreText,
                        });

                        const response = await axios.post(
                          `http://localhost:3000/api/test-results/`,
                          {
                            testName: 'Тест MBI',
                            testType: 'mbi',
                            result: resultText,
                            score: scoreText,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${authToken}`,
                            },
                          }
                        );

                        console.log('Server response:', response.data);
                        setIsSaved(true);
                        console.log('Result saved successfully');
                        
                        // Отправляем событие для обновления профиля (если он открыт)
                        window.dispatchEvent(new CustomEvent('testResultSaved'));
                      } catch (error: any) {
                        console.error('Error saving result:', error);
                        console.error('Error response:', error.response?.data);
                        console.error('Error status:', error.response?.status);
                        const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message || 'Помилка при збереженні результату';
                        alert(`Помилка: ${errorMessage}`);
                      }
                    }}
                  >
                    Зберегти результат
                  </button>
                    {isSaved && (
                      <p className="mbi-save-confirmation">Результат збережено в особистому кабінеті</p>
                    )}
                  </div>
                )}
              </div>
              </>
            );
          })()}
        </div>
      </main>

      {/* Модальное окно подтверждения выхода */}
      {showLeaveModal && (
        <div className="mbi-modal-overlay" onClick={() => {
          setShowLeaveModal(false);
          setPendingNavigation(null);
        }}>
          <div className="mbi-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="mbi-modal-close"
              onClick={() => {
                setShowLeaveModal(false);
                setPendingNavigation(null);
              }}
            >
              ×
            </button>
            <div className="mbi-modal-body">
              <div className="mbi-modal-robot">
                <img src={sadRobotImageUrl} alt="Sad Robot" />
              </div>
              <div className="mbi-modal-text-content">
                <h2 className="mbi-modal-title">Ви впевнені?</h2>
                <p className="mbi-modal-message">
                  Якщо ви залишите сторінку зараз, ми не зможемо зберегти ваші результати. Продовжити?
                </p>
                <div className="mbi-modal-buttons">
                  <button
                    className="mbi-modal-button mbi-modal-button-outline"
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
                    className="mbi-modal-button mbi-modal-button-primary"
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
