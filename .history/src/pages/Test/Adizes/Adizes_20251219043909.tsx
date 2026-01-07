import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../layout';
import { getAssetUrl } from '../../../utils/assetPath';
import './Adizes.css';

const robotImageUrl = getAssetUrl('_assets/images/robot_img_2.png');
const bubbleBackgroundUrl = getAssetUrl('_assets/images/borders/paei_border.png');
const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');

// 10 блоков по 4 вопроса в каждом
const testBlocks = [
  {
    id: 1,
    questions: ['Чуйний', 'Яскравий', 'Залучений', 'Той, що має сумніви'],
  },
  {
    id: 2,
    questions: ['Енергійний', 'Організований', 'Творчий', 'Дружній'],
  },
  {
    id: 3,
    questions: ['Результативний', 'Деталізований', 'Інноваційний', 'Співчутливий'],
  },
  {
    id: 4,
    questions: ['Швидкий', 'Точний', 'Виділяється', 'Підтримуючий'],
  },
  {
    id: 5,
    questions: ['Дієвий', 'Систематичний', 'Виділяється', 'Гармонійний'],
  },
  {
    id: 6,
    questions: ['Продуктивний', 'Регламентований', 'Оригінальний', "Об'єднуючий"],
  },
  {
    id: 7,
    questions: ['Ефективний', 'Структурований', 'Новаторський', 'Співпрацюючий'],
  },
  {
    id: 8,
    questions: ['Активний', 'Дисциплінований', 'Креативний', 'Відкритий'],
  },
  {
    id: 9,
    questions: ['Динамічний', 'Плановій', 'Експериментальний', 'Командна людина'],
  },
  {
    id: 10,
    questions: ['Орієнтований на результат', 'Методичний', 'Виділяється', 'Інтегрований'],
  },
];

const paeiDimensions = {
  P: {
    title: 'P — Producer',
    shortTitle: 'Producer',
    ukrainianTitle: 'Виробник',
    question: 'ЩО ПОТРІБНО ЗРОБИТИ?',
    description:
      'Функція менеджменту відповідає за досягнення високих результатів у короткострокові терміни, а також розуміння специфіки діяльності компанії, суті та її закономірностей.',
    detailedDescription: [
      'Менеджер з високо розвиненою функцією виробництва результатів (Production) характеризується цілеспрямованістю, здатністю перетворювати ідеї на продукти, високою працездатністю, орієнтацією на кінцевий результат, прагматизмом та багатозадачністю.',
      'Він ефективно досягає поставлених цілей, розуміє специфіку діяльності компанії та її закономірності. Такі менеджери зосереджені на виконанні завдань та отриманні конкретних результатів у короткостроковій перспективі.',
      'Вони прагнуть до високої продуктивності та ефективності, швидко реагують на зміни та здатні працювати в умовах невизначеності. Їхня основна мета — забезпечити виконання роботи та досягнення результатів.',
    ],
    color: '#347aec',
  },
  A: {
    title: 'A — Administrator',
    shortTitle: 'Administrator',
    ukrainianTitle: 'Адміністратор',
    question: 'ЯК ЦЕ ПОТРІБНО ЗРОБИТИ?',
    description:
      'Функція менеджменту відповідає за аналіз деталей, регулювання робочих процесів та відслідковування процесів роботи відповідно до правил та регламентів.',
    detailedDescription: [
      'Менеджер з високо розвиненою функцією адміністратора (Administrator) відмінно організовує робоче середовище, планує, управляє та контролює ресурси компанії, готує ґрунт для результатів, виконуючи необхідні дії в певній послідовності.',
      'Він створює структуровані процеси, встановлює правила та процедури, забезпечує стабільність та передбачуваність у роботі організації. Адміністратор фокусується на деталях, контролі та систематизації робочих процесів.',
      'Його основна мета — забезпечити ефективне використання ресурсів, дотримання стандартів та регламентів, а також створити надійну систему управління, яка підтримує довгострокову стабільність компанії.',
    ],
    color: '#347aec',
  },
  E: {
    title: 'E — Entrepreneur',
    shortTitle: 'Entrepreneur',
    ukrainianTitle: 'Підприємець',
    question: 'КОЛИ/НАВІЩО ЦЕ ПОТРІБНО ЗРОБИТИ?',
    description:
      'Функція менеджменту відповідає за генерацію ідей, пошук нових можливостей та нестандартних рішень, а також орієнтованість на зміни у довгостроковій перспективі.',
    detailedDescription: [
      'Менеджер з високо вираженою функцією підприємництва (Entrepreneurship) володіє аналітичним мисленням, розумінням змін у середовищі, стратегічним плануванням та діями, спрямованими на довгострокові результати. Його креативність допомагає створювати бачення довгострокового успіху компанії, і він одразу починає працювати над його досягненням.',
      'Він постійно шукає нові можливості для розвитку, готовий ризикувати заради досягнення амбітних цілей та орієнтований на інновації та зміни. Підприємець створює стратегічне бачення майбутнього компанії та мотивує команду до його реалізації.',
      'Його основна мета — забезпечити довгостроковий розвиток та конкурентоспроможність компанії через генерацію нових ідей, пошук нових ринків та можливостей, а також адаптацію до змін у зовнішньому середовищі.',
    ],
    color: '#347aec',
  },
  I: {
    title: 'I — Integrator',
    shortTitle: 'Integrator',
    ukrainianTitle: 'Інтегратор',
    question: 'ХТО ЦЕ ПОВИНЕН ЗРОБИТИ?',
    description:
      "Функція менеджменту відповідає за об'єднання людей в компанії, налагодження взаємозв'язків, вирішення конфліктів та підтримку сприятливої атмосфери у колективі.",
    detailedDescription: [
      "Менеджер з високо розвиненою функцією інтеграції (Integration) відмінно об'єднує людей в компанії, налагоджує взаємозв'язки, вирішує конфлікти та підтримує сприятливу атмосферу у колективі. Він мотивує команду, координує її дії та формує лояльність до спільних цілей.",
      "Він створює гармонію та співпрацю в колективі, сприяє ефективній взаємодії між членами команди та забезпечує єдність у діях. Інтегратор працює над розв'язанням конфліктів, зміцненням корпоративної культури та формуванням довіри в організації.",
      'Його основна мета — забезпечити сплоченість команди, ефективну комунікацію та взаємодію між співробітниками, а також створити сприятливе середовище для досягнення спільних цілей компанії.',
    ],
    color: '#347aec',
  },
};

export function AdizesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({});
  const [isProducerHidden, setIsProducerHidden] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Проверяем, есть ли сохраненный результат для показа
  useEffect(() => {
    const state = location.state as { showSavedResult?: boolean; savedResult?: any };
    if (state?.showSavedResult && state?.savedResult) {
      // Если перешли из профиля с сохраненным результатом, показываем его сразу
      setShowResults(true);
      setIsSaved(true); // Устанавливаем isSaved в true, так как результат уже сохранен
      // Прокручиваем к результатам
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, [location.state]);

  const totalBlocks = 10;
  const totalPointsPerBlock = 10;

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

  const currentBlockData = testBlocks.find((block) => block.id === currentBlock);
  const currentBlockAnswers = answers[currentBlock] || {};

  // Подсчет общего количества баллов
  const totalPoints = useMemo(() => {
    return Object.values(answers).reduce((total, blockAnswers) => {
      return total + Object.values(blockAnswers).reduce((sum, value) => sum + value, 0);
    }, 0);
  }, [answers]);

  const handleAnswerChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => {
      const blockAnswers = prev[currentBlock] || {};
      const currentValue = blockAnswers[questionIndex];

      // Если кликнули на уже выбранную кнопку - сбрасываем значение
      if (currentValue === value) {
        const { [questionIndex]: removed, ...rest } = blockAnswers;
        return {
          ...prev,
          [currentBlock]: rest,
        };
      }

      // Устанавливаем новое значение - разрешаем выбор любого значения
      const newBlockAnswers = { ...blockAnswers, [questionIndex]: value };

      return {
        ...prev,
        [currentBlock]: newBlockAnswers,
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

  // Расчет результатов PAEI
  const calculatePAEIResults = () => {
    let P = 0; // Producer (вопрос 0 в каждом блоке)
    let A = 0; // Administrator (вопрос 1 в каждом блоке)
    let E = 0; // Entrepreneur (вопрос 2 в каждом блоке)
    let I = 0; // Integrator (вопрос 3 в каждом блоке)

    // Проходим по всем блокам
    for (let blockId = 1; blockId <= totalBlocks; blockId++) {
      const blockAnswers = answers[blockId] || {};
      P += blockAnswers[0] || 0; // Первый вопрос = P
      A += blockAnswers[1] || 0; // Второй вопрос = A
      E += blockAnswers[2] || 0; // Третий вопрос = E
      I += blockAnswers[3] || 0; // Четвертый вопрос = I
    }

    return { P, A, E, I };
  };

  const handleGetResult = () => {
    setShowResults(true);
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  const toggleDimension = () => {
    setIsProducerHidden((prev) => !prev);
  };

  // Проверяем, что пользователь в последнем блоке и есть хотя бы один ответ
  const isAllBlocksCompleted =
    currentBlock === totalBlocks && Object.keys(currentBlockAnswers).length > 0;

  // Проверяем, есть ли сохраненный результат для показа
  const state = location.state as { showSavedResult?: boolean; savedResult?: any };
  const isShowingSavedResult = state?.showSavedResult && state?.savedResult;

  return (
    <div className="adizes-page">
      <Sidebar />
      <main className="adizes-main">
        <div className="adizes-content">
          {/* Header Section - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="adizes-header">
              <h1 className="adizes-title">Тест Адізеса</h1>
              <p className="adizes-intro">
                В основі методики лежить <strong>PAEI-концепція</strong>, згідно з якою кожна людина
                має <strong>унікальний набір якостей</strong>
                (відрізняється темпераментом, має свої особливості поведінки, стиль роботи,
                лідерські здібності, сильні та слабкі сторони), знаючи які, можна визначити свій{' '}
                <strong>індивідуальний стиль менеджменту</strong>.
              </p>
            </section>
          )}

          {/* PAEI Dimensions Section - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section
              className={`adizes-dimensions relative ${isProducerHidden ? 'adizes-dimensions--hidden' : ''}`}
            >
              <button
                type="button"
                className="adizes-dimension-toggle cursor-pointer bg-[#347AEC] opacity-100 hover:bg-[#6764E7] duration-500 rounded-[29px] w-[141px] h-[28px] px-[10px] md:px-[29px] text-center font-unbounded text-white text-[14px] md:text-[16px] flex items-center justify-center"
                onClick={toggleDimension}
              >
                {isProducerHidden ? 'Детальніше' : 'Сховати'}
              </button>
              {!isProducerHidden && (
                <div className="adizes-dimension-cards">
                  {Object.entries(paeiDimensions).map(([key, dimension]) => (
                    <div key={key} className="adizes-dimension-card">
                      <div className="adizes-dimension-header max-w-[595px] w-full flex justify-between relative">
                        <span className="adizes-dimension-letter">{key}</span>
                        <div className="adizes-dimension-content">
                          <h3 className="adizes-dimension-question">{dimension.question}</h3>
                          <p className="text-[#262626] font-montserrat font-[500] leading-6 mt-[10px]">
                            {dimension.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Instructions Section - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="adizes-instructions">
              <div className="adizes-instructions-wrapper">
                <div className="adizes-instructions-box">
                  <img
                    src={bubbleBackgroundUrl}
                    alt="Border"
                    aria-hidden="true"
                    className="adizes-instructions-border"
                  />
                  <div className="adizes-instructions-content">
                    <p className="font-medium mb-[10px] leading-[20.8px] text-justify">
                      Перед вами 10 блоків, що містять по 4 якості особистості. Надайте кожній
                      якості від 1-го до 4-х балів в залежності від того, наскільки воно підходить
                      саме вам. Загальна сума балів одного блоку повинна дорівнювати 10.
                    </p>
                    <h3 className="font-bold">Будьте чесні з собою</h3>
                  </div>
                </div>
              </div>
              <div className="adizes-robot">
                <img
                  src={robotImageUrl}
                  alt="Robot"
                  width={320}
                  height={320}
                  className="w-[320px] h-[320px] object-contain"
                />
              </div>
            </section>
          )}

          {/* Test Questions Section - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="adizes-questions-section">
              <div className="adizes-questions-main">
                {/* Scale Numbers */}
                <div className="flex items-center justify-start md:justify-end gap-[50px] max-w-[545px] w-full pl-[22px] md:pl-0 md:pr-[19px] mb-[12px]">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="text-[#5D5D5D] font-[600] text-[16px] font-montserrat"
                    >
                      {num}
                    </div>
                  ))}
                </div>

                {/* Questions List */}
                <div className="adizes-questions-list">
                  {currentBlockData?.questions.map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="min-w-[200px] w-full md:w-[545px] flex flex-col gap-[10px] md:gap-[20px]"
                    >
                      <p className="md:hidden text-[14px] text-[#262626] font-unbounded font-[400]">
                        {question}
                      </p>
                      <div className="flex justify-between items-center py-[14px] px-[19px] bg-white rounded-[5px]">
                        <p className="hidden md:block text-[#262626] font-unbounded font-[400]">
                          {question}
                        </p>
                        <div className="flex gap-[50px] md:gap-[50px]">
                          {[1, 2, 3, 4].map((value) => (
                            <button
                              key={value}
                              type="button"
                              className={`w-[10px] h-[10px] rounded-[100%] duration-500 ${
                                currentBlockAnswers[questionIndex] === value
                                  ? 'bg-[#347AEC]'
                                  : 'bg-[#E0E0E0]'
                              }`}
                              onClick={() => handleAnswerChange(questionIndex, value)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Sidebar */}
              <div className="flex flex-col justify-evenly md:block text-center font-unbounded text-[#262626] items-center mt-[35px] md:ml-[-185px]">
                <p className="hidden md:block font-normal mb-[40px]">Пройдено</p>
                <div className="md:mb-[60px] text-center w-full">
                  <p className="text-[36px] font-medium bg-gradient-to-r from-[#4485ED] to-[#6764E7] text-transparent bg-clip-text">
                    {currentBlock} / {totalBlocks}
                  </p>
                  <span className="text-[#5D5D5D] text-[16px]">блоків</span>
                </div>
                <div className="md:mb-[60px] text-center w-full">
                  <p className="text-[36px] font-medium bg-gradient-to-r from-[#4485ED] to-[#6764E7] text-transparent bg-clip-text">
                    {totalPoints} / {totalBlocks * totalPointsPerBlock}
                  </p>
                  <span className="text-[#5D5D5D] text-[16px]">балів</span>
                </div>
              </div>
            </section>
          )}

          {/* Navigation */}
          {!showResults && !isShowingSavedResult && (
            <div className="adizes-navigation">
              {currentBlock > 1 && (
                <button
                  type="button"
                  className="adizes-nav-button adizes-nav-button--prev"
                  onClick={handlePrevBlock}
                >
                  ← Попередній блок
                </button>
              )}
              {currentBlock < totalBlocks && (
                <button
                  type="button"
                  className="adizes-nav-button adizes-nav-button--next"
                  onClick={handleNextBlock}
                >
                  Наступний блок →
                </button>
              )}
            </div>
          )}

          {/* Кнопка "Дізнатися результат" после завершения всех блоков */}
          {isAllBlocksCompleted && !showResults && !isShowingSavedResult && (
            <div className="adizes-get-result-section">
              <button type="button" onClick={handleGetResult} className="adizes-get-result-button">
                <span>Дізнатися результат</span>
                <svg
                  className="adizes-arrow-icon"
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
            </div>
          )}

          {/* Результаты теста */}
          {showResults &&
            (() => {
              // Проверяем, есть ли сохраненный результат
              const state = location.state as { showSavedResult?: boolean; savedResult?: any };
              const isShowingSavedResult = state?.showSavedResult && state?.savedResult;

              // Если показываем сохраненный результат, считаем что он уже сохранен
              const shouldShowAsSaved = isShowingSavedResult || isSaved;

              let results: { P: number; A: number; E: number; I: number };
              let paeiCode: string;

              if (isShowingSavedResult) {
                // Восстанавливаем результаты из сохраненных данных
                paeiCode = state.savedResult.result; // PAEI код (например "PAE-")

                // Извлекаем баллы из score (например "P:26 A:25 E:28 I:21")
                const scoreStr = state.savedResult.score || '';
                const pMatch = scoreStr.match(/P:(\d+)/);
                const aMatch = scoreStr.match(/A:(\d+)/);
                const eMatch = scoreStr.match(/E:(\d+)/);
                const iMatch = scoreStr.match(/I:(\d+)/);

                results = {
                  P: pMatch ? parseInt(pMatch[1], 10) : 0,
                  A: aMatch ? parseInt(aMatch[1], 10) : 0,
                  E: eMatch ? parseInt(eMatch[1], 10) : 0,
                  I: iMatch ? parseInt(iMatch[1], 10) : 0,
                };
              } else {
                // Обычный расчет результатов
                results = calculatePAEIResults();
                const maxScore = Math.max(results.P, results.A, results.E, results.I);

                // Определяем доминирующий тип (с максимальным баллом)
                const dominantType =
                  results.P === maxScore
                    ? 'P'
                    : results.A === maxScore
                      ? 'A'
                      : results.E === maxScore
                        ? 'E'
                        : 'I';

                // Формируем PAEI код на основе баллов
                const getPaeiLetter = (score: number, letter: string) => {
                  if (score >= 26) return letter.toUpperCase();
                  if (score >= 21) return letter.toLowerCase();
                  return '';
                };

                paeiCode =
                  [
                    getPaeiLetter(results.P, 'P'),
                    getPaeiLetter(results.A, 'A'),
                    getPaeiLetter(results.E, 'E'),
                    getPaeiLetter(results.I, 'I'),
                  ].join('') || dominantType;
              }

              const maxScore = Math.max(results.P, results.A, results.E, results.I);

              // Определяем доминирующий тип (с максимальным баллом)
              const dominantType =
                results.P === maxScore
                  ? 'P'
                  : results.A === maxScore
                    ? 'A'
                    : results.E === maxScore
                      ? 'E'
                      : 'I';

              // Определяем описание на основе баллов для каждого типа
              const getDescriptionForType = (type: 'P' | 'A' | 'E' | 'I', score: number) => {
                const typeData = paeiDimensions[type];

                if (score >= 26) {
                  // Сильно выраженная функция (>= 26 баллов) - показываем полное описание
                  return typeData.detailedDescription;
                } else if (score >= 21) {
                  // Умеренно выраженная функция (21-25 баллов) - показываем сокращенное описание
                  const moderateDescriptions: Record<'P' | 'A' | 'E' | 'I', string[]> = {
                    P: [
                      `Функція виробництва результатів розвинена на задовільному рівні, щоб досягати результатів, але для високої продуктивності та ефективності краще доручити співробітнику з яскраво-вираженим P-стилем.`,
                    ],
                    A: [
                      `Функція адміністратора розвинена на задовільному рівні, щоб організовувати та контролювати процеси, але для високої структурованості та системності краще доручити співробітнику з яскраво-вираженим A-стилем.`,
                    ],
                    E: [
                      `Функція підприємництва розвинена на задовільному рівні, щоб генерувати ідеї та бачити можливості, але для високої інноваційності та стратегічного мислення краще доручити співробітнику з яскраво-вираженим E-стилем.`,
                    ],
                    I: [
                      `Функція інтеграції розвинена на задовільному рівні, щоб дотримуватися спільної мети, але мотивацію, координацію та підтримку прихильності команди краще доручити співробітнику з яскраво-вираженим I-стилем.`,
                    ],
                  };
                  return moderateDescriptions[type];
                } else {
                  // Слабо выраженная функция (<= 20 баллов) - показываем рекомендацию
                  const weakDescriptions: Record<'P' | 'A' | 'E' | 'I', string[]> = {
                    P: [
                      `Функція виробництва результатів розвинена дуже слабо, складно досягати високих результатів та продуктивності. Краще доручити співробітнику з яскраво-вираженим P-стилем.`,
                    ],
                    A: [
                      `Функція адміністратора розвинена дуже слабо, складно організовувати та контролювати процеси. Краще доручити співробітнику з яскраво-вираженим A-стилем.`,
                    ],
                    E: [
                      `Функція підприємництва розвинена дуже слабо, складно генерувати ідеї та бачити можливості. Краще доручити співробітнику з яскраво-вираженим E-стилем.`,
                    ],
                    I: [
                      `Функція інтеграції розвинена дуже слабо, складно слідувати спільним цілям, мотивування, координацію та підтримання прихильності команди, краще доручити співробітнику з яскраво-вираженим I-стилем.`,
                    ],
                  };
                  return weakDescriptions[type];
                }
              };

              // Получаем описание для доминирующего типа
              const dominantData = paeiDimensions[dominantType as keyof typeof paeiDimensions];
              const description = getDescriptionForType(
                dominantType as 'P' | 'A' | 'E' | 'I',
                results[dominantType as 'P' | 'A' | 'E' | 'I'],
              );
              const resultImageUrl = getAssetUrl(`_assets/images/paei_answers/${dominantType}.svg`);

              return (
                <>
                  {isShowingSavedResult && (
                    <div
                      style={{
                        marginBottom: '2rem',
                        marginTop: '90px',
                        width: '100%',
                        maxWidth: '842px',
                        marginLeft: '50px',
                        marginRight: 'auto',
                      }}
                    >
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
                          padding: 0,
                        }}
                      >
                        ← Назад до профілю
                      </button>
                      <h1
                        style={{
                          fontFamily: 'Unbounded, sans-serif',
                          fontSize: '40px',
                          fontWeight: 400,
                          color: '#262626',
                          margin: '0 0 0.5rem 0',
                          lineHeight: '1.2',
                        }}
                      >
                        Тест Адізеса
                      </h1>
                      {state?.savedResult?.completedAt && (
                        <p
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '16px',
                            color: '#666',
                            margin: 0,
                          }}
                        >
                          Дата проходження:{' '}
                          {(() => {
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
                  <div ref={resultsRef} className="adizes-results">
                    <h2 className="adizes-results-title">ВАШ PAEI: {paeiCode}</h2>

                    <div className="adizes-results-main">
                      {/* Картинка слева */}
                      <div className="adizes-result-image-container">
                        <div className="adizes-result-image-card">
                          <div className="adizes-result-image-labels">
                            <div className="adizes-result-image-label-top">{paeiCode}</div>
                            <div className="adizes-result-image-label-bottom">
                              {dominantData.ukrainianTitle}
                            </div>
                          </div>
                          <img
                            src={resultImageUrl}
                            alt={dominantData.title}
                            className="adizes-result-image"
                          />
                        </div>
                      </div>

                      {/* Текст справа */}
                      <div className="adizes-result-text-container">
                        {description.map((paragraph, index) => (
                          <p key={index} className="adizes-result-text-paragraph">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Кнопка "Зберегти результат" - скрываем если показываем сохраненный результат */}
                    {!isShowingSavedResult && (
                      <div className="adizes-save-section">
                        <button
                          type="button"
                          className={`adizes-save-button ${shouldShowAsSaved ? 'adizes-save-button--saved' : ''}`}
                          onClick={async () => {
                            if (shouldShowAsSaved) return;

                            try {
                              const authToken = localStorage.getItem('authToken');
                              if (!authToken) {
                                alert('Будь ласка, увійдіть в систему для збереження результату');
                                return;
                              }

                              const results = calculatePAEIResults();
                              const maxScore = Math.max(results.P, results.A, results.E, results.I);
                              const dominantType =
                                results.P === maxScore
                                  ? 'P'
                                  : results.A === maxScore
                                    ? 'A'
                                    : results.E === maxScore
                                      ? 'E'
                                      : 'I';

                              const getPaeiLetter = (score: number, letter: string) => {
                                if (score >= 26) return letter.toUpperCase();
                                if (score >= 21) return letter.toLowerCase();
                                return '';
                              };

                              const paeiCode =
                                [
                                  getPaeiLetter(results.P, 'P'),
                                  getPaeiLetter(results.A, 'A'),
                                  getPaeiLetter(results.E, 'E'),
                                  getPaeiLetter(results.I, 'I'),
                                ].join('') || dominantType;

                              await axios.post(
                                `http://localhost:3000/api/test-results/`,
                                {
                                  testName: 'Тест Адізеса',
                                  testType: 'adizes',
                                  result: paeiCode,
                                  score: `P:${results.P} A:${results.A} E:${results.E} I:${results.I}`,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${authToken}`,
                                  },
                                },
                              );

                              setIsSaved(true);
                              console.log('Result saved successfully');
                            } catch (error: any) {
                              console.error('Error saving result:', error);
                              const errorMessage =
                                error.response?.data?.detail ||
                                error.message ||
                                'Помилка при збереженні результату';
                              alert(`Помилка: ${errorMessage}`);
                            }
                          }}
                        >
                          Зберегти результат
                        </button>
                        {shouldShowAsSaved && (
                          <p className="adizes-save-message">
                            Результат збережено в особистому кабінеті
                          </p>
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
        <div
          className="adizes-modal-overlay"
          onClick={() => {
            setShowLeaveModal(false);
            setPendingNavigation(null);
          }}
        >
          <div className="adizes-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="adizes-modal-close"
              onClick={() => {
                setShowLeaveModal(false);
                setPendingNavigation(null);
              }}
            >
              ×
            </button>
            <div className="adizes-modal-body">
              <div className="adizes-modal-robot">
                <img src={sadRobotImageUrl} alt="Sad Robot" />
              </div>
              <div className="adizes-modal-text-content">
                <h2 className="adizes-modal-title">Ви впевнені?</h2>
                <p className="adizes-modal-message">
                  Якщо ви залишите сторінку зараз, ми не зможемо зберегти ваші результати.
                  Продовжити?
                </p>
                <div className="adizes-modal-buttons">
                  <button
                    className="adizes-modal-button adizes-modal-button-outline"
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
                    className="adizes-modal-button adizes-modal-button-primary"
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
