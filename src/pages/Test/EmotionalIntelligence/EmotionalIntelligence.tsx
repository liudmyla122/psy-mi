import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../../../layout';
import './EmotionalIntelligence.css';

export function EmotionalIntelligencePage() {
  const [currentBlock, setCurrentBlock] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [expandedComponents, setExpandedComponents] = useState<{ [key: number]: boolean }>({});
  const resultsRef = useRef<HTMLDivElement>(null);

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
    'Я розумію важливість емоційного здоров\'я.',
    'Я можу ефективно керувати конфліктами.',
    'Я розумію важливість емоційного інтелекту в професійному житті.',
    'Я можу адаптуватися до змін.',
    'Я розумію важливість самосвідомості.',
  ];

  const handleAnswerChange = (questionIndex: number, answer: number) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionIndex] || [];
      const isSelected = currentAnswers.includes(answer);
      
      return {
        ...prev,
        [questionIndex]: isSelected
          ? currentAnswers.filter(a => a !== answer)
          : [...currentAnswers, answer]
      };
    });
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
    return questions.slice(startIndex, startIndex + questionsPerBlock);
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((_, index) => {
      const questionAnswers = answers[index] || [];
      // Берем среднее значение выбранных ответов для каждого вопроса
      if (questionAnswers.length > 0) {
        const average = questionAnswers.reduce((sum, val) => sum + val, 0) / questionAnswers.length;
        total += Math.round(average);
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
      const questionAnswers = answers[index] || [];
      if (questionAnswers.length > 0) {
        const average = questionAnswers.reduce((sum, val) => sum + val, 0) / questionAnswers.length;
        componentTotal += Math.round(average);
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
        text: 'Цей рівень демонструє гармонійний розвиток всіх компонентів емоційного інтелекту, здатність розуміти власні та чужі емоції, ефективно керувати ними, впевнено справлятися зі стресом, швидко адаптуватися до змін та будувати міцні стосунки. Високий інтегративний рівень сприяє досягненню професійних та особистих цілей, знаходженню спільної мови з різними людьми та підтримці емоційної гармонії в будь-яких умовах.'
      };
    } else if (score >= 40 && score <= 69) {
      return {
        range: 'Від 40 до 69',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Характеризується здатністю розпізнавати власні емоції та емоції інших людей, хоча ефективне управління ними може викликати труднощі в стресових або складних ситуаціях. Емпатія та самомотивація проявляються залежно від обставин, іноді нерегулярно. Такий рівень сприяє підтримці стабільності у взаєминах, забезпечує базову ефективність у взаємодії з іншими та створює можливості для подальшого розвитку емоційних навичок.'
      };
    } else {
      return {
        range: '39 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Рівень свідчить про низький рівень емоційного інтелекту. Спостерігаються труднощі у розумінні власних емоцій і почуттів оточуючих, що може призводити до імпульсивних реакцій, нерозуміння інших людей та конфліктів. Низький рівень ускладнює ефективне управління стресом, побудову довірливих взаємин та досягнення емоційної гармонії.'
      };
    }
  };

  // Функция для определения уровня компонента "Емоційна обізнаність"
  const getEmotionalAwarenessLevel = (componentScore: number) => {
    if (componentScore >= 25 && componentScore <= 31) {
      return {
        range: 'Від 25 до 31',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Рівень свідчить про здатність розуміти та ідентифікувати свої емоції у більшості життєвих ситуацій. Емоційний стан усвідомлюється, але аналіз причин виникнення емоцій або їхнього впливу на прийняття рішень може бути не завжди глибоким. Загалом емоції контролюються, хоча в стресових або напружених ситуаціях можливі труднощі з їхньою регуляцією. Такий рівень дозволяє підтримувати достатню емоційну стабільність, а також сприяє позитивній взаємодії з іншими людьми, хоча є потенціал для більшого розвитку навичок усвідомлення та аналізу емоцій.'
      };
    } else {
      return {
        range: '24 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Характеризується складнощами у розумінні та визначенні власних емоцій. Емоції можуть сприйматися розпливчасто або залишатися повністю неусвідомленими. Через це виникають труднощі в їхньому контролі та адекватному реагуванні на ситуації. Часто емоційний стан впливає на поведінку імпульсивно, без усвідомлення причин. Це може ускладнювати взаємодію з іншими людьми та призводити до додаткового стресу чи нерозуміння в комунікаціях.'
      };
    }
  };

  // Функция для определения уровня компонента "Управління своїми емоціями"
  const getEmotionalManagementLevel = (componentScore: number) => {
    if (componentScore >= 33) {
      return {
        range: '33 і більше',
        level: 'ВИСОКИЙ РІВЕНЬ',
        text: 'Розвинену здатність до самоконтролю та ефективного управління емоціями. Вдається зберігати спокій, фокусуватися на завданнях і приймати зважені рішення навіть у складних умовах. Людина здатна швидко відновлюватися після емоційних потрясінь, уникає імпульсивних дій і зберігає позитивний настрій. Управління емоціями сприяє високій продуктивності, кращій взаємодії з оточуючими та здатності досягати особистих і професійних цілей.'
      };
    } else if (componentScore >= 25 && componentScore <= 32) {
      return {
        range: 'Від 25 до 32',
        level: 'СЕРЕДНІЙ РІВЕНЬ',
        text: 'Рівень свідчить про здатність розуміти та ідентифікувати свої емоції у більшості життєвих ситуацій. Емоційний стан усвідомлюється, але аналіз причин виникнення емоцій або їхнього впливу на прийняття рішень може бути не завжди глибоким. Загалом емоції контролюються, хоча в стресових або напружених ситуаціях можливі труднощі з їхньою регуляцією. Такий рівень дозволяє підтримувати достатню емоційну стабільність, а також сприяє позитивній взаємодії з іншими людьми, хоча є потенціал для більшого розвитку навичок усвідомлення та аналізу емоцій.'
      };
    } else {
      return {
        range: '24 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        text: 'Характеризується складнощами у розумінні та визначенні власних емоцій. Емоції можуть сприйматися розпливчасто або залишатися повністю неусвідомленими. Через це виникають труднощі в їхньому контролі та адекватному реагуванні на ситуації. Часто емоційний стан впливає на поведінку імпульсивно, без усвідомлення причин. Це може ускладнювати взаємодію з іншими людьми та призводити до додаткового стресу чи нерозуміння в комунікаціях.'
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
              Тест на <strong>емоційний інтелект</strong> демонструє, як ви використовуєте <strong>емоції</strong> у своєму житті, і враховує різні аспекти емоційного інтелекту: <strong>ставлення до себе та інших</strong>, <strong>комунікативні навички</strong>, <strong>погляди на життя та пошуки гармонії</strong>.
            </p>

            <div className="emotional-intelligence-instructions">
              <div className="instructions-bubble">
                <img 
                  src="/_assets/images/borders/register_border.png" 
                  alt="Border" 
                  className="instructions-border-image"
                />
                <div className="instructions-content">
                  <p className="instructions-text">
                    До кожного твердження вкажіть, ту відповідь, яка вам підходить найбільше
                  </p>
                  <p className="instructions-text instructions-text-bold">
                    Будьте чесні перед собою
                  </p>
                </div>
              </div>
              <div className="instructions-robot">
                <img 
                  src="/_assets/images/robot_img_2.png" 
                  alt="Robot" 
                  className="robot-image"
                />
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
                        <span key={num} className="question-number">{num}</span>
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
                                    type="checkbox"
                                    name={`question-${questionIndex}`}
                                    value={value}
                                    checked={answers[questionIndex]?.includes(value) || false}
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
                        <span className="progress-number">{currentBlock}/{totalBlocks}</span>
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
                    disabled={currentBlock >= totalBlocks}
                  >
                    наступний блок →
                  </button>
                </div>
              </div>
            </div>

            <div className="test-navigation">
              <button
                type="button"
                className="result-button"
                onClick={handleSubmitTest}
              >
                <span className="result-button-text">Дізнатися результат</span>
                <span className="result-button-icon">
                  <img src="/_assets/images/icons/arrow.svg" alt="" />
                </span>
              </button>
            </div>
        </div>
        
        {showResults && (() => {
          const score = calculateScore();
          const overallLevel = getOverallLevel(score);
          
          // Определяем какое изображение робота показывать
          const getRobotImage = (score: number) => {
            if (score >= 40 && score <= 69) {
              return '/_assets/images/robot40.svg';
            } else if (score <= 39) {
              return '/_assets/images/robot39.svg';
            }
            return '/_assets/images/robot1.svg';
          };
          
          return (
            <div ref={resultsRef} className="emotional-intelligence-results">
              <h1 className="results-title">Результат Емоційний інтелект</h1>
              <h2 className="results-subtitle">Інтегративний рівень емоційного інтелекту</h2>

              <div className="overall-score">
                <div className="score-bar-container">
                  <div className="score-labels">
                    <span className="score-min">75</span>
                    <span className="score-max-label">180</span>
                  </div>
                  <div className="score-bar-wrapper">
                    <div className="score-bar">
                      <div className="score-bar-fill" style={{ width: `${Math.max(((score - 75) / (180 - 75)) * 100, 1)}%` }}></div>
                    </div>
                    <span className="score-current">{score}</span>
                  </div>
                </div>
              </div>

            <div className="results-content-section">
              <p className="results-description">
                <strong>Інтегративний рівень емоційного інтелекту</strong> демонструє загальну здатність людини ефективно управляти емоціями, розуміти власні почуття та емоції інших людей, а також вибудовувати гармонійні взаємини. Цей показник відображає комплексну оцінку всіх компонентів емоційного інтелекту, таких як самосвідомість.
              </p>

              <div className="score-interpretation">
              {score >= 40 && (
                <div className="interpretation-robot">
                  <img 
                    src={getRobotImage(score)} 
                    alt="Robot" 
                    className="robot-image-small"
                  />
                </div>
              )}
              {score <= 39 && score >= 32 && (
                <div className="interpretation-robot">
                  <img 
                    src="/_assets/images/robot39.svg" 
                    alt="Robot" 
                    className="robot-image-small"
                  />
                </div>
              )}
              <div className="interpretation-content">
                <h3 className="interpretation-title">
                  {overallLevel.range}: <span className="interpretation-highlight">{overallLevel.level}</span>
                </h3>
                <p className="interpretation-text">
                  {overallLevel.text}
                </p>
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
                // Вычисляем реальный результат компонента на основе ответов
                const componentScore = calculateComponentScore(component.name);
                // Определяем уровень в зависимости от компонента
                let componentLevel;
                if (component.name === 'Емоційна обізнаність') {
                  componentLevel = getEmotionalAwarenessLevel(componentScore);
                } else if (component.name === 'Управління своїми емоціями') {
                  componentLevel = getEmotionalManagementLevel(componentScore);
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
                      <div className="component-bar-wrapper">
                        <div className="component-bar">
                          <div 
                            className="component-bar-fill" 
                            style={{ width: `${(componentScore / component.max) * 100}%` }}
                          ></div>
                        </div>
                        <span className="component-current">{componentScore}</span>
                      </div>
                    </div>
                    <a 
                      href="#" 
                      className="component-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedComponents(prev => ({
                          ...prev,
                          [index]: !prev[index]
                        }));
                      }}
                    >
                      Дізнатися більше {'>'}
                    </a>
                    {isExpanded && (
                      <div className="component-interpretation">
                        {component.name === 'Емоційна обізнаність' && (
                          <p className="component-scale-description">
                            Шкала визначає здатність <strong>усвідомлювати власні емоції</strong>, розуміти їхній вплив на поведінку та прийняття рішень, а також ідентифікувати емоції у конкретних життєвих ситуаціях.
                          </p>
                        )}
                        {component.name === 'Управління своїми емоціями' && (
                          <p className="component-scale-description">
                            Шкала оцінює <strong>здатність ефективно керувати своїми емоціями</strong>, особливо в складних або стресових ситуаціях. Вона відображає рівень самоконтролю, вміння зберігати спокій, залишатися зосередженим і діяти раціонально, незалежно від зовнішніх подразників.
                          </p>
                        )}
                        <h3 className="component-level-title">
                          {componentLevel.range}: <span className="component-level-highlight">{componentLevel.level}</span>
                        </h3>
                        <p className="component-level-text">
                          {componentLevel.text}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="save-result-button-wrapper">
              <button 
                className="save-result-button"
                onClick={() => setIsSaved(true)}
              >
                Зберегти результат
              </button>
            </div>
            {isSaved && (
              <div className="save-result-message">
                <p className="save-result-text">
                  Результат збережено в особистому кабінеті
                </p>
              </div>
            )}
          </div>
          );
        })()}
      </main>
    </div>
  );
}
