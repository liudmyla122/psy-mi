import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../../../layout';
import { getAssetUrl } from '../../../utils/assetPath';
import './EmotionalIntelligence.css';

const robotDefaultUrl = getAssetUrl('_assets/images/robot1.svg');
const robot39Url = getAssetUrl('_assets/images/robot39.svg');
const robot40Url = getAssetUrl('_assets/images/robot40.svg');

export function EmotionalIntelligenceResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedResult, setSavedResult] = useState<any>(null);
  const [expandedComponents, setExpandedComponents] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const state = location.state as { savedResult?: any };
    if (state?.savedResult) {
      setSavedResult(state.savedResult);
    } else {
      // Если нет сохраненного результата, перенаправляем в профиль
      const currentPath = location.pathname;
      if (currentPath.startsWith('/ua/')) {
        navigate('/ua/my-profile');
      } else if (currentPath.startsWith('/en/')) {
        navigate('/en/my-profile');
      } else {
        navigate('/my-profile');
      }
    }
  }, [location.state, location.pathname, navigate]);

  if (!savedResult) {
    return null;
  }

  // Извлекаем данные из сохраненного результата
  const scoreStr = savedResult.score || '';
  const scoreMatch = scoreStr.match(/Загальний:(\d+)/);
  const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

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

  // Функции для определения уровня компонентов
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/ua/')) {
      navigate('/ua/my-profile');
    } else if (currentPath.startsWith('/en/')) {
      navigate('/en/my-profile');
    } else {
      navigate('/my-profile');
    }
  };

  // Извлекаем компоненты из сохраненных данных
  const components = [
    { name: 'Емоційна обізнаність', max: 36 },
    { name: 'Управління своїми емоціями', max: 36 },
    { name: 'Самомотивація', max: 36 },
    { name: 'Емпатія', max: 36 },
    { name: 'Розпізнавання емоцій інших людей', max: 36 },
  ];

  return (
    <div className="emotional-intelligence-page">
      <Sidebar />
      <main className="emotional-intelligence-main">
        <div className="emotional-intelligence-content">
          {/* Кнопка "Назад в профиль" */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              type="button"
              onClick={handleBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#347AEC',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                padding: 0,
                textDecoration: 'none',
              }}
            >
              ← Назад в профіль
            </button>
            {savedResult?.completedAt && (
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '14px',
                  color: '#6B7280',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Дата проходження: {formatDate(savedResult.completedAt)}
              </p>
            )}
          </div>

          <div className="emotional-intelligence-results">
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
                комплексну оцінку всіх компонентів емоційного інтелекту, таких як самосвідомість.
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
              {components.map((component, index) => {
                // Извлекаем score компонента из сохраненных данных
                const componentMatch = scoreStr.match(
                  new RegExp(`${component.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:(\\d+)`)
                );
                const componentScore = componentMatch ? parseInt(componentMatch[1], 10) : 0;

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
          </div>
        </div>
      </main>
    </div>
  );
}





