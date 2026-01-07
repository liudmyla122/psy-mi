import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../layout';
import './EmotionalIntelligence.css';
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

const registerBorderImg = getAssetUrl('_assets/images/borders/border-e.svg');
const robotImageUrl = getAssetUrl('_assets/images/robot_img_2.png');
const arrowIconUrl = getAssetUrl('_assets/images/icons/arrow.svg');
const robotDefaultUrl = getAssetUrl('_assets/images/robot1.svg');
const robot39Url = getAssetUrl('_assets/images/robot39.svg');
const robot40Url = getAssetUrl('_assets/images/robot40.svg');
const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');

export function EmotionalIntelligencePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [expandedComponents, setExpandedComponents] = useState<{ [key: number]: boolean }>({});
  const resultsRef = useRef<HTMLDivElement>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  // Обработка сохраненного результата
  useEffect(() => {
    const state = location.state as { showSavedResult?: boolean; savedResult?: any };
    if (state?.showSavedResult && state?.savedResult) {
      // Если перешли из профиля с сохраненным результатом, показываем его сразу
      setShowResults(true);
      setIsSaved(true);
      // Прокручиваем к результатам
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 200);
    }
  }, [location.state]);

  const totalBlocks = 6;
  const questionsPerBlock = 5;

  const questions = [
    'Для мене як негативні, так і позитивні емоції служать джерелом знання про те, як чинити в житті.',
    'Негативні емоції допомагають мені зрозуміти, що я повинен змінити у своєму житті.',
    'Я спокійний, коли відчуваю тиск з боку.',
    'Я здатний спостерігати зміну своїх почуттів.',
    'Коли необхідно, я можу бути спокійним і зосередженим, щоб діяти відповідно до запитів життя.',
    'Я розумію, що емоції впливають на мої думки.',
    'Я можу контролювати свої емоції, коли це необхідно.',
    'Я використовую емоції для мотивації себе.',
    'Я розумію емоції інших людей.',
    'Я можу розпізнати емоції інших людей за їх поведінкою.',
    'Я вмію слухати інших людей.',
    'Я можу допомогти іншим людям керувати їх емоціями.',
    'Я розумію, як мої емоції впливають на інших.',
    'Я можу адаптуватися до різних емоційних ситуацій.',
    'Я вмію будувати гармонійні стосунки з іншими.',
    'Я розумію важливість емоційного інтелекту.',
    'Я прагну розвивати свій емоційний інтелект.',
    'Я використовую емоційний інтелект у повсякденному житті.',
    'Я можу ефективно спілкуватися з іншими.',
    'Я розумію важливість емпатії.',
    'Я можу контролювати свої реакції на стресові ситуації.',
    'Я розумію, як емоції впливають на прийняття рішень.',
    'Я можу використовувати емоції для досягнення цілей.',
    'Я розумію важливість емоційного балансу.',
    'Я можу допомогти іншим розуміти їх емоції.',
    "Я розумію важливість емоційного здоров'я.",
    'Я можу ефективно керувати конфліктами.',
    'Я розумію важливість емоційного інтелекту в професійному житті.',
    'Я можу адаптуватися до змін.',
    'Я розумію важливість самосвідомості.',
  ];

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

  const getCurrentBlockQuestions = () => {
    const startIndex = (currentBlock - 1) * questionsPerBlock;
    return questions.slice(startIndex, startIndex + questionsPerBlock);
  };

  const isCurrentBlockComplete = () => {
    const startIndex = (currentBlock - 1) * questionsPerBlock;
    const endIndex = startIndex + questionsPerBlock;
    for (let i = startIndex; i < endIndex; i++) {
      if (answers[i] === undefined) {
        return false;
      }
    }
    return true;
  };

  const isAllBlocksComplete = () => {
    return questions.every((_, index) => answers[index] !== undefined);
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((_, index) => {
      const answer = answers[index];
      if (answer !== undefined) {
        total += answer;
      }
    });
    return total;
  };

  // Функция для вычисления результата компонента на основе ответов
  const calculateComponentScore = (componentName: string) => {
    // Определяем индексы вопросов для каждого компонента (индексы начинаются с 0, всего 30 вопросов)
    let questionIndices: number[] = [];

    if (componentName === 'Емоційна обізнаність') {
      // Вопросы про осознание эмоций (6 вопросов)
      questionIndices = [0, 1, 3, 5, 19, 21];
    } else if (componentName === 'Управління своїми емоціями') {
      // Вопросы про управление эмоциями (6 вопросов)
      questionIndices = [2, 4, 6, 18, 20, 22];
    } else if (componentName === 'Самомотивація') {
      // Вопросы про мотивацию (6 вопросов)
      questionIndices = [7, 23, 26, 27, 28, 29];
    } else if (componentName === 'Емпатія') {
      // Вопросы про эмпатию (6 вопросов)
      questionIndices = [8, 10, 11, 12, 13, 14];
    } else if (componentName === 'Розпізнавання емоцій інших людей') {
      // Вопросы про распознавание эмоций других (6 вопросов)
      questionIndices = [9, 15, 16, 17, 24, 25];
    }

    let componentTotal = 0;
    questionIndices.forEach((index) => {
      const answer = answers[index];
      if (answer !== undefined) {
        componentTotal += answer;
      }
    });

    // Максимальный балл для компонента (6 вопросов * 6 баллов максимум = 36)
    return componentTotal;
  };

  // Функция для определения уровня общего результата
  const getOverallLevel = (score: number) => {
    if (score >= 70) {
      return {
        range: '70 і більше',
        level: 'ВИСОКИЙ РІВЕНЬ',
        text: 'Цей рівень демонструє гармонійний розвиток всіх компонентів емоційного інтелекту, здатність розуміти власні та чужі емоції, ефективно керувати ними, впевнено справлятися зі стресом, швидко адаптуватися до змін та будувати міцні стосунки. Високий інтегративний рівень сприяє досягненню професійних та особистих цілей, знаходженню спільної мови з різними людьми та підтримці емоційної гармонії в будь-яких умовах.',
      };
    } else if (score >= 40) {
      return {
        range: 'Від 40 до 69',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Характеризується здатністю розпізнавати власні емоції та емоції інших людей, хоча ефективне управління ними може викликати труднощі в стресових або складних ситуаціях. Емпатія та самомотивація проявляються залежно від обставин, іноді нерегулярно. Такий рівень сприяє підтримці стабільності у взаєминах, забезпечує базову ефективність у взаємодії з іншими та створює можливості для подальшого розвитку емоційних навичок.',
      };
    } else {
      return {
        range: '39 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Рівень свідчить про низький рівень емоційного інтелекту. Спостерігаються труднощі у розумінні власних емоцій і почуттів оточуючих, що може призводити до імпульсивних реакцій, нерозуміння інших людей та конфліктів. Низький рівень ускладнює ефективне управління стресом, побудову довірливих взаємин та досягнення емоційної гармонії.',
      };
    }
  };

  // Функция для определения уровня компонента "Емоційна обізнаність"
  const getEmotionalAwarenessLevel = (componentScore: number) => {
    if (componentScore >= 25 && componentScore <= 31) {
      return {
        range: 'Від 25 до 31',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Рівень свідчить про здатність розуміти та ідентифікувати свої емоції у більшості життєвих ситуацій. Емоційний стан усвідомлюється, але аналіз причин виникнення емоцій або їхнього впливу на прийняття рішень може бути не завжди глибоким. Загалом емоції контролюються, хоча в стресових або напружених ситуаціях можливі труднощі з їхньою регуляцією. Такий рівень дозволяє підтримувати достатню емоційну стабільність, а також сприяє позитивній взаємодії з іншими людьми, хоча є потенціал для більшого розвитку навичок усвідомлення та аналізу емоцій.',
      };
    } else {
      return {
        range: '24 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Характеризується складнощами у розумінні та визначенні власних емоцій. Емоції можуть сприйматися розпливчасто або залишатися повністю неусвідомленими. Через це виникають труднощі в їхньому контролі та адекватному реагуванні на ситуації. Часто емоційний стан впливає на поведінку імпульсивно, без усвідомлення причин. Це може ускладнювати взаємодію з іншими людьми та призводити до додаткового стресу чи нерозуміння в комунікаціях.',
      };
    }
  };

  // Функция для определения уровня компонента "Управління своїми емоціями"
  const getEmotionalManagementLevel = (componentScore: number) => {
    if (componentScore >= 26 && componentScore <= 32) {
      return {
        range: 'Від 26 до 32',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Характеризується здатністю контролювати емоції у більшості ситуацій, хоча в умовах стресу можливі труднощі зі збереженням спокою. Відновлення після емоційних потрясінь зазвичай відбувається швидко, але іноді емоції можуть впливати на рішення. Загалом рівень дозволяє зберігати ефективність у повсякденній діяльності.',
      };
    } else {
      return {
        range: '25 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Рівень свідчить про можливі труднощі у контролюванні емоцій, особливо в умовах стресу або тиску. Емоції можуть виходити з-під контролю, що часто призводить до імпульсивних дій або нерозважливих рішень. Відсутність навичок управління емоціями може викликати постійне напруження, часті емоційні зриви або відчуття перевантаження. Ускладнюється здатність до зосередженості, що може негативно впливати на продуктивність та взаємини.',
      };
    }
  };

  // Функция для определения уровня компонента "Самомотивація"
  const getSelfMotivationLevel = (componentScore: number) => {
    if (componentScore >= 26 && componentScore <= 32) {
      return {
        range: 'Від 26 до 32',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Характеризується здатністю підтримувати мотивацію в сприятливих умовах, хоча у складних або тривалих завданнях можливе зниження енергії чи інтересу. Інколи потрібна зовнішня підтримка або додаткове натхнення для подолання труднощів. Цілі зазвичай досягаються, але це може займати більше часу чи вимагати додаткових зусиль, ніж передбачалося.',
      };
    } else {
      return {
        range: '25 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Рівень свідчить можливі про труднощі у знаходженні внутрішньої мотивації. Часто виникає відчуття апатії, зниження інтересу до завдань та браку енергії для їх виконання. Поставлені цілі можуть залишатися недосягнутими через відсутність наполегливості або втрату віри у власні сили. Часто потрібна зовнішня підтримка чи стимул, щоб розпочати або завершити завдання. Такий стан може ускладнювати досягнення довгострокових цілей.',
      };
    }
  };

  // Функция для определения уровня компонента "Емпатія"
  const getEmpathyLevel = (componentScore: number) => {
    if (componentScore >= 25 && componentScore <= 31) {
      return {
        range: 'Від 25 до 31',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Характеризується здатністю розпізнавати емоції та потреби інших, хоча глибокий аналіз або повне розуміння їхніх переживань може бути недостатнім. Співчуття виявляється, але іноді виникають труднощі з адекватною підтримкою чи реагуванням. Емоційний зв\'язок з іншими зазвичай встановлюється, але його глибина залежить від ситуації та рівня близькості з людьми.',
      };
    } else {
      return {
        range: '24 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Характеризується складнощами у розумінні емоцій та потреб інших людей. Може виникати байдужість або нездатність встановлювати емоційний контакт із оточуючими. Відсутність емпатії ускладнює побудову глибоких взаємин, призводить до нерозуміння у комунікаціях та може створювати враження емоційної відстороненості. У роботі з людьми можливе нехтування їхніми почуттями або потребами.',
      };
    }
  };

  // Функция для определения уровня компонента "Розпізнавання емоцій інших людей"
  const getRecognitionLevel = (componentScore: number) => {
    if (componentScore >= 24 && componentScore <= 30) {
      return {
        range: 'Від 24 до 30',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Характеризується здатністю розуміти емоційний стан інших людей у більшості ситуацій, хоча в складних або неоднозначних випадках можуть виникати труднощі. Невербальні сигнали зазвичай сприймаються, але їхній вплив на взаємодію іноді не повністю усвідомлюється. Цей рівень сприяє ефективній комунікації, хоча можливі прогалини у взаєморозумінні в нестандартних ситуаціях.',
      };
    } else {
      return {
        range: '23 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Характеризується складнощами у виявленні емоційних станів інших людей. Знаки невербальної комунікації, такі як вираз обличчя чи інтонація, часто залишаються непоміченими або неправильно інтерпретуються. Це може призводити до непорозумінь у взаємодії з іншими та обмежувати можливість адекватно реагувати на їхні потреби.',
      };
    }
  };

  return (
    <div className="emotional-intelligence-page">
      <Sidebar />
      <main className="emotional-intelligence-main">
        <div className="emotional-intelligence-content">
          <h1 className="emotional-intelligence-title">Емоційний інтелект</h1>
          <p className="emotional-intelligence-description">
            Тест на <strong>емоційний інтелект</strong> демонструє, як ви використовуєте{' '}
            <strong>емоції</strong> у своєму житті, і враховує різні аспекти емоційного інтелекту:{' '}
            <strong>ставлення до себе та інших</strong>, <strong>комунікативні навички</strong>,{' '}
            <strong>погляди на життя та пошуки гармонії</strong>.
          </p>

          <div className="emotional-intelligence-instructions">
            <div className="instructions-container">
              <div className="instructions-border-wrapper">
                <img src={registerBorderImg} alt="Border" className="instructions-border-image" />
              </div>
              <div className="instructions-content">
                <p className="instructions-text">
                  <TypewriterWords 
                    text="До кожного твердження вкажіть, ту відповідь, яка вам підходить найбільше"
                    delay={100}
                  />
                </p>
                <p className="instructions-text instructions-text-bold">
                  <TypewriterWords 
                    text="Будьте чесні перед собою"
                    delay={120}
                    startDelay={2500}
                  />
                </p>
              </div>
            </div>
            <div className="instructions-robot">
              <img src={robotImageUrl} alt="Robot" className="robot-image" />
            </div>
          </div>

          <h2 className="answer-options-title">Варіанти відповідей</h2>

          <div className="answer-options-grid">
            <button type="button" className="answer-option-button">
              <span className="answer-option-label">Повністю не згоден</span>
            </button>
            <button type="button" className="answer-option-button answer-option-number">
              <span className="answer-option-number-text">1</span>
            </button>
            <button type="button" className="answer-option-button">
              <span className="answer-option-label">Частково згоден</span>
            </button>
            <button type="button" className="answer-option-button answer-option-number">
              <span className="answer-option-number-text">4</span>
            </button>

            <button type="button" className="answer-option-button">
              <span className="answer-option-label">Здебільшого не згоден</span>
            </button>
            <button type="button" className="answer-option-button answer-option-number">
              <span className="answer-option-number-text">2</span>
            </button>
            <button type="button" className="answer-option-button">
              <span className="answer-option-label">Здебільшого згоден</span>
            </button>
            <button type="button" className="answer-option-button answer-option-number">
              <span className="answer-option-number-text">5</span>
            </button>

            <button type="button" className="answer-option-button">
              <span className="answer-option-label">Частково не згоден</span>
            </button>
            <button type="button" className="answer-option-button answer-option-number">
              <span className="answer-option-number-text">3</span>
            </button>
            <button type="button" className="answer-option-button">
              <span className="answer-option-label">Повністю згоден</span>
            </button>
            <button type="button" className="answer-option-button answer-option-number">
              <span className="answer-option-number-text">6</span>
            </button>
          </div>

          <div className="questions-section">
            <div className="questions-content">
              <div className="questions-main">
                <div className="questions-header">
                  <div className="questions-numbers">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <span key={num} className="question-number">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="questions-list">
                  {getCurrentBlockQuestions().map((question, blockIndex) => {
                    const questionIndex = (currentBlock - 1) * questionsPerBlock + blockIndex;
                    return (
                      <div key={questionIndex} className="question-item">
                        <div className="question-text-wrapper">
                          <p className="question-text">{question}</p>
                        </div>
                        <div className="question-answers-wrapper">
                          <div className="question-answers">
                            {[1, 2, 3, 4, 5, 6].map((value) => (
                              <label key={value} className="radio-label">
                                <input
                                  type="radio"
                                  name={`question-${questionIndex}`}
                                  value={value}
                                  checked={answers[questionIndex] === value}
                                  onChange={() => handleAnswerChange(questionIndex, value)}
                                  className="radio-input"
                                />
                                <span className="radio-custom"></span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="progress-block">
                <div className="progress-wrapper">
                  <div className="progress-container">
                    <div className="progress-info">
                      <span className="progress-label">Пройдено</span>
                      <span className="progress-number">
                        {currentBlock}/{totalBlocks}
                      </span>
                      <span className="progress-text">блоків</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="result-button-section">
              <div className="navigation-buttons">
                <button
                  type="button"
                  className="nav-button nav-button-prev"
                  onClick={handlePrevBlock}
                  disabled={currentBlock === 1}
                >
                  ← попередній блок
                </button>
                <button
                  type="button"
                  className="nav-button nav-button-next"
                  onClick={handleNextBlock}
                  disabled={currentBlock >= totalBlocks || !isCurrentBlockComplete()}
                >
                  наступний блок →
                </button>
              </div>
            </div>
          </div>

          {isAllBlocksComplete() && (
            <div className="test-navigation">
              <button type="button" className="result-button" onClick={handleSubmitTest}>
                <span className="result-button-text">Дізнатися результат</span>
                <span className="result-button-icon">
                  <img src={arrowIconUrl} alt="" />
                </span>
              </button>
            </div>
          )}
        </div>

        {showResults &&
          (() => {
            // Проверяем, есть ли сохраненный результат
            const state = location.state as { showSavedResult?: boolean; savedResult?: any };
            const isShowingSavedResult = state?.showSavedResult && state?.savedResult;
            
            // Если показываем сохраненный результат, извлекаем score из сохраненных данных
            let score: number;
            if (isShowingSavedResult) {
              const scoreStr = state.savedResult.score || '';
              const scoreMatch = scoreStr.match(/Загальний:(\d+)/);
              score = scoreMatch ? parseInt(scoreMatch[1], 10) : calculateScore();
            } else {
              score = calculateScore();
            }
            
            const overallLevel = getOverallLevel(score);

            // Определяем какое изображение робота показывать
            const getRobotImage = (score: number) => {
              if (score >= 40 && score <= 69) {
                return robot40Url;
              } else if (score <= 39) {
                return robot39Url;
              }
              return robotDefaultUrl;
            };

            return (
              <div ref={resultsRef} className="emotional-intelligence-results">
                <h1 className="results-title">Результат Емоційний інтелект</h1>
                <h2 className="results-subtitle">Інтегративний рівень емоційного інтелекту</h2>

                <div className="overall-score">
                  <div className="score-bar-container">
                    <div className="score-labels">
                      <span className="score-min">{score}</span>
                      <span className="score-max-label">180</span>
                    </div>
                    <div className="score-bar-row">
                      <div className="score-bar-wrapper">
                        <div className="score-bar">
                          <div
                            className="score-bar-fill"
                            style={{ width: `${Math.min((score / 180) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="score-current">{score}</span>
                    </div>
                  </div>
                </div>

                <div className="results-content-section">
                  <p className="results-description">
                    <strong>Інтегративний рівень емоційного інтелекту</strong> демонструє загальну
                    здатність людини ефективно управляти емоціями, розуміти власні почуття та емоції
                    інших людей, а також вибудовувати гармонійні взаємини. Цей показник відображає
                    комплексну оцінку всіх компонентів емоційного інтелекту, таких як
                    самосвідомість.
                  </p>

                  <div className="score-interpretation">
                    {score >= 40 && (
                      <div className="interpretation-robot">
                        <img src={getRobotImage(score)} alt="Robot" className="robot-image-small" />
                      </div>
                    )}
                    {score <= 39 && score >= 32 && (
                      <div className="interpretation-robot">
                        <img src={robot39Url} alt="Robot" className="robot-image-small" />
                      </div>
                    )}
                    <div className="interpretation-content">
                      <h3 className="interpretation-title">
                        {overallLevel.range}:{' '}
                        <span className="interpretation-highlight">{overallLevel.level}</span>
                      </h3>
                      <p className="interpretation-text">{overallLevel.text}</p>
                    </div>
                  </div>
                </div>

                <div className="components-breakdown">
                  {[
                    { name: 'Емоційна обізнаність', max: 36 },
                    { name: 'Управління своїми емоціями', max: 36 },
                    { name: 'Самомотивація', max: 36 },
                    { name: 'Емпатія', max: 36 },
                    { name: 'Розпізнавання емоцій інших людей', max: 36 },
                  ].map((component, index) => {
                    // Вычисляем реальный результат компонента на основе ответов или сохраненных данных
                    let componentScore: number;
                    if (isShowingSavedResult) {
                      // Извлекаем score компонента из сохраненных данных
                      const scoreStr = state.savedResult.score || '';
                      const componentMatch = scoreStr.match(new RegExp(`${component.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:(\\d+)`));
                      componentScore = componentMatch ? parseInt(componentMatch[1], 10) : calculateComponentScore(component.name);
                    } else {
                      componentScore = calculateComponentScore(component.name);
                    }
                    // Определяем уровень в зависимости от компонента
                    let componentLevel;
                    if (component.name === 'Емоційна обізнаність') {
                      componentLevel = getEmotionalAwarenessLevel(componentScore);
                    } else if (component.name === 'Управління своїми емоціями') {
                      componentLevel = getEmotionalManagementLevel(componentScore);
                    } else if (component.name === 'Самомотивація') {
                      componentLevel = getSelfMotivationLevel(componentScore);
                    } else if (component.name === 'Емпатія') {
                      componentLevel = getEmpathyLevel(componentScore);
                    } else if (component.name === 'Розпізнавання емоцій інших людей') {
                      componentLevel = getRecognitionLevel(componentScore);
                    } else {
                      // Для остальных компонентов используем общую логику
                      componentLevel = getEmotionalAwarenessLevel(componentScore);
                    }

                    const isExpanded = expandedComponents[index] || false;

                    return (
                      <div key={index} className="component-item">
                        <h4 className="component-name">{component.name}</h4>
                        <div className="component-bar-container">
                          <div className="component-labels">
                            <span className="component-min">{componentScore}</span>
                            <span className="component-max-label">{component.max}</span>
                          </div>
                          <div className="component-bar-row">
                            <div className="component-bar-wrapper">
                              <div className="component-bar">
                                <div
                                  className="component-bar-fill"
                                  style={{ width: `${(componentScore / component.max) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="component-current">{componentScore}</span>
                          </div>
                        </div>
                        <a
                          href="#"
                          className={`component-link ${isExpanded ? 'expanded' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedComponents((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }));
                          }}
                        >
                          Дізнатися більше{' '}
                          <span className="component-link-chevron">›</span>
                        </a>
                        {isExpanded && (
                          <div className="component-interpretation">
                            {component.name === 'Емоційна обізнаність' && (
                              <p className="component-scale-description">
                                Шкала визначає здатність{' '}
                                <strong>усвідомлювати власні емоції</strong>, розуміти їхній вплив
                                на поведінку та прийняття рішень, а також ідентифікувати емоції у
                                конкретних життєвих ситуаціях.
                              </p>
                            )}
                            {component.name === 'Управління своїми емоціями' && (
                              <p className="component-scale-description">
                                Шкала оцінює{' '}
                                <strong>здатність ефективно керувати своїми емоціями</strong>,
                                особливо в складних або стресових ситуаціях. Вона відображає рівень
                                самоконтролю, вміння зберігати спокій, залишатися зосередженим і
                                діяти раціонально, незалежно від зовнішніх подразників.
                              </p>
                            )}
                            {component.name === 'Самомотивація' && (
                              <p className="component-scale-description">
                                Шкала оцінює здатність{' '}
                                <strong>знаходити внутрішнє джерело натхнення та енергії</strong> для
                                досягнення цілей, долати труднощі та підтримувати високу
                                продуктивність. Вона також відображає вміння зосереджуватися на
                                важливих завданнях і підтримувати інтерес до них, навіть у складних
                                умовах.
                              </p>
                            )}
                            {component.name === 'Емпатія' && (
                              <p className="component-scale-description">
                                Шкала оцінює здатність{' '}
                                <strong>розуміти емоції, переживання та потреби інших людей</strong>,
                                а також встановлювати емоційний зв'язок із ними. Емпатія є важливим
                                компонентом емоційного інтелекту, який сприяє побудові довірливих
                                стосунків і ефективній комунікації.
                              </p>
                            )}
                            {component.name === 'Розпізнавання емоцій інших людей' && (
                              <p className="component-scale-description">
                                Шкала оцінює здатність{' '}
                                <strong>ідентифікувати емоції інших людей</strong> на основі їхньої
                                міміки, жестів, тону голосу чи поведінки. Вона демонструє, наскільки
                                добре людина розуміє емоційний стан оточуючих, навіть якщо ці емоції
                                не виражені відкрито.
                              </p>
                            )}
                            <h3 className="component-level-title">
                              {componentLevel.range}:{' '}
                              <span className="component-level-highlight">
                                {componentLevel.level}
                              </span>
                            </h3>
                            <p className="component-level-text">{componentLevel.text}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="save-result-button-wrapper">
                  <button
                    className={`save-result-button ${isSaved ? 'saved' : ''}`}
                    onClick={async () => {
                      if (isSaved) return;

                      try {
                        const authToken = localStorage.getItem('authToken');
                        if (!authToken) {
                          alert('Будь ласка, увійдіть в систему для збереження результату');
                          return;
                        }

                        const score = calculateScore();
                        const overallLevel = getOverallLevel(score);

                        // Формируем строку результата для сохранения
                        const resultText = `Інтегративний рівень: ${overallLevel.level} (${overallLevel.range})`;
                        
                        // Формируем score с детальной информацией о компонентах
                        const components = [
                          { name: 'Емоційна обізнаність', max: 36 },
                          { name: 'Управління своїми емоціями', max: 36 },
                          { name: 'Самомотивація', max: 36 },
                          { name: 'Емпатія', max: 36 },
                          { name: 'Розпізнавання емоцій інших людей', max: 36 },
                        ];
                        
                        const componentScores = components.map((component) => {
                          const componentScore = calculateComponentScore(component.name);
                          return `${component.name}:${componentScore}`;
                        }).join('; ');
                        
                        const scoreText = `Загальний:${score}; ${componentScores}`;

                        console.log('Sending data:', {
                          testName: 'Емоційний інтелект',
                          testType: 'emotional-intelligence',
                          result: resultText,
                          score: scoreText,
                        });

                        const response = await axios.post(
                          `http://localhost:3000/api/test-results/`,
                          {
                            testName: 'Емоційний інтелект',
                            testType: 'emotional-intelligence',
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
                        
                        // Отправляем событие для обновления профиля
                        window.dispatchEvent(new CustomEvent('testResultSaved'));
                      } catch (error: any) {
                        console.error('Error saving result:', error);
                        const errorMessage = error.response?.data?.detail || error.message || 'Помилка при збереженні результату';
                        alert(`Помилка: ${errorMessage}`);
                      }
                    }}
                  >
                    Зберегти результат
                  </button>
                </div>
                {isSaved && (
                  <div className="save-result-message">
                    <p className="save-result-text">Результат збережено в особистому кабінеті</p>
                  </div>
                )}
              </div>
            );
          })()}

      {/* Модальное окно подтверждения выхода */}
      {showLeaveModal && (
        <div className="emotional-intelligence-modal-overlay" onClick={() => {
          setShowLeaveModal(false);
          setPendingNavigation(null);
        }}>
          <div className="emotional-intelligence-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="emotional-intelligence-modal-close"
              onClick={() => {
                setShowLeaveModal(false);
                setPendingNavigation(null);
              }}
            >
              ×
            </button>
            <div className="emotional-intelligence-modal-body">
              <div className="emotional-intelligence-modal-robot">
                <img src={sadRobotImageUrl} alt="Sad Robot" />
              </div>
              <div className="emotional-intelligence-modal-text-content">
                <h2 className="emotional-intelligence-modal-title">Ви впевнені?</h2>
                <p className="emotional-intelligence-modal-message">
                  Якщо ви залишите сторінку зараз, ми не зможемо зберегти ваші результати. Продовжити?
                </p>
                <div className="emotional-intelligence-modal-buttons">
                  <button
                    className="emotional-intelligence-modal-button emotional-intelligence-modal-button-outline"
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
                    className="emotional-intelligence-modal-button emotional-intelligence-modal-button-primary"
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
      </main>
    </div>
  );
}
