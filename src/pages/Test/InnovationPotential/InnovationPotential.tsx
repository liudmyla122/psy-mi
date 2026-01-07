import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../layout';
import './InnovationPotential.css';
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
const borderSideCheckUrl = getAssetUrl('_assets/images/borderSideCheck.png');
const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');
const ipiHighResultUrl = getAssetUrl('_assets/images/ipi_answers/high.png');
const ipiOptimalResultUrl = getAssetUrl('_assets/images/ipi_answers/optimal.png');
const ipiLowResultUrl = getAssetUrl('_assets/images/ipi_answers/low.png');

const ipiQuestions = [
  {
    id: 1,
    left: 'Всі знання світу можна отримати з відкритих ресурсів',
    right: 'Задля того, щоб розібратись у сутності чогось, недостатньо спитати про це у експерта чи прочитати у профільній літературі',
  },
  {
    id: 2,
    left: 'Моєю сильною стороною є, скоріше, здатність до ретельної розробки і доведення до досконалості вже існуючого матеріалу, аніж вигадування нових ідей',
    right: 'Здатність вигадувати нові й оригінальні ідеї відрізняє мене від більшості людей',
  },
  {
    id: 3,
    left: 'Будь-які зміни у соціально-політичній ситуації призводять до чергової кризи',
    right: 'Я впевнений, що трансформації, що відбуваються у світі, є необхідними',
  },
  {
    id: 4,
    left: 'Зазвичай мені складно взятися за нову задачу',
    right: 'Я легко та із задоволенням беруся за нові задачі',
  },
  {
    id: 5,
    left: 'Екстремальні види спорту та хобі – це точно не для мене',
    right: 'Я зміг би подолати почуття страху за свою безпеку та оволодіти екстремальним видом спорту',
  },
  {
    id: 6,
    left: 'Хороша робота - це та, в якій завжди зрозуміло, що і як виконувати',
    right: 'Хороша робота - це та, яка не дає нудьгувати та кидає виклики',
  },
  {
    id: 7,
    left: 'Я відчуваю страх та занепокоєння у новій незвичній ситуації',
    right: 'Я відчуваю азарт і піднесення у новій незвичній ситуації',
  },
  {
    id: 8,
    left: 'Я схильний робити все знайомим для мене способом',
    right: 'Коли кажуть мені, як потрібно зробити щось, я думаю про те, що це можна зробити іншим чином',
  },
  {
    id: 9,
    left: 'Зміни у моєму житті зазвичай викликають у мене занепокоєння і тривогу',
    right: 'Зміни, що відбуваються у моєму житті, не викликають у мене тривоги та занепокоєння',
  },
  {
    id: 10,
    left: 'Для мене дуже важливо дотримуватись прийнятих в моєму оточенні правил',
    right: 'Я вважаю, що правила існують для того, щоб їх порушувати',
  },
  {
    id: 11,
    left: 'Я зазвичай неодноразово обмірковую рішення, щоб не допустити помилки',
    right: 'Я охоче і сміливо іду на ризик',
  },
  {
    id: 12,
    left: 'Звичне є більш бажаним для мене, ніж незнайоме',
    right: 'Незнайоме для мене є більш привабливим, аніж звичне',
  },
  {
    id: 13,
    left: 'Більшість життєвих ситуацій є типовими і передбачуваними',
    right: 'Я можу знайти дещо цікаве в будь-якій ситуації',
  },
  {
    id: 14,
    left: 'Беручись за роботу я ціную свій час і роблю все способом, перевіреним на власному досвіді',
    right: 'Мені подобається думати про те, як зробити звичні справи по-новому',
  },
  {
    id: 15,
    left: 'Скоріше я консерватор, що живе за прийнятими у суспільстві правилами',
    right: 'Я намагаюся інтуїтивно прислухатись до природного ритму світу',
  },
  {
    id: 16,
    left: 'Змінити стиль роботи, обрану спеціальність, спосіб життя людей змушує необхідність',
    right: 'У моєму житті в мене є досвід зміни фаху / роботи / способу життя за власним бажанням',
  },
  {
    id: 17,
    left: 'Я заздалегідь обмірковую, чи варто братися за нові завдання у роботі',
    right: 'На роботу, яка здається мені цікавою, я можу наважитись навіть, якщо невідомо, чи впораюся я з нею',
  },
  {
    id: 18,
    left: 'Важливі рішення слід приймати лише маючи достатньо повну інформацію за даним питанням',
    right: 'Чимало найбільш важливих рішень ґрунтуються на неповній інформації',
  },
  {
    id: 19,
    left: 'Просування професійними — головна причина, через яку я опановую нову інформацію, навіть якщо вона не цікава.',
    right: 'Причина, по якій я намагаюсь дізнатись щось нове у предметній галузі своєї професійної діяльності, - це моя допитливість',
  },
  {
    id: 20,
    left: 'Я віддаю перевагу звичним способом виконання роботи',
    right: 'Я завжди придумую нові способи виконання звичних дій',
  },
  {
    id: 21,
    left: 'Я складно звикаю до нового колективу, роботи, місця відпочинку',
    right: 'Я легко залучаюся до нової компанії знайомих, із задоволенням відвідую нові місця відпочинку і дозвілля',
  },
  {
    id: 22,
    left: 'Неочікувані зміни у розпорядку дня викликають у мене роздратування',
    right: 'Протягом дня я по можливості волію діяти спонтанно та слухати свою інтуїцію',
  },
  {
    id: 23,
    left: 'Мій принцип «сім разів відміряй, один - відріж»',
    right: 'До успіху в справах мене призводить швидше невтомність спроб, ніж скрупульозність розрахунків',
  },
  {
    id: 24,
    left: 'Вчителі та наставники повинні давати чіткі інструкції та мати точні критерії для оцінки',
    right: 'Вчителі та наставники, які нечітко формулюють завдання, дають шанс проявити ініціативу та оригінальність',
  },
  {
    id: 25,
    left: 'Неохоче погоджуюсь на виконання нових завдань в роботі',
    right: 'Мене не лякає перспектива раптової необхідності самостійно освоїти нову сферу знань',
  },
  {
    id: 26,
    left: 'Мої друзі кажуть, що мені простіше доводити існуючі ідеї до досконалості',
    right: 'Мої друзі кажуть, що мої ідеї нові та оригінальні',
  },
  {
    id: 27,
    left: 'Я вважаю свої погляди консервативними',
    right: 'У мене широкі і неупереджені погляди на дійсність',
  },
  {
    id: 28,
    left: 'Якщо я кудись їду вперше, то волію мати з собою як провідника будь-кого, хто там уже побував',
    right: 'Я легко орієнтуюся у незнайомій місцевості',
  },
  {
    id: 29,
    left: 'Я ухвалюю рішення не інтуітивно, а тільки після ґрунтовних роздумів',
    right: 'Саме дії, а не роздуми допомагають мені досягти бажаних результатів',
  },
  {
    id: 30,
    left: 'Я уникаю завдань, у правильності вирішення яких маю сумніви',
    right: 'Немає такої проблеми, яку не можна вирішити',
  },
];

export function InnovationPotentialPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [openSubscales, setOpenSubscales] = useState<{ [key: string]: boolean }>({});

  // Проверяем, есть ли сохраненный результат для показа
  const state = location.state as { showSavedResult?: boolean; savedResult?: any };
  const isShowingSavedResult = state?.showSavedResult && state?.savedResult;

  useEffect(() => {
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

  const totalQuestions = ipiQuestions.length;
  const isAllQuestionsAnswered = Object.keys(answers).length === totalQuestions;

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

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
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

  const getCurrentQuestion = () => {
    return ipiQuestions[currentQuestion - 1];
  };

  // Функция для восстановления результатов из сохраненных данных
  const createIPIResultFromSavedData = (savedResult: any) => {
    // Извлекаем значение из score (например "164")
    const scoreStr = savedResult.score || '';
    const scoreMatch = scoreStr.match(/(\d+)/);
    return scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
  };

  const calculateScore = () => {
    // Проверяем, есть ли сохраненный результат
    if (isShowingSavedResult && state?.savedResult) {
      return createIPIResultFromSavedData(state.savedResult);
    }

    let total = 0;
    ipiQuestions.forEach((question) => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        // Значение от -3 до 3, где -3 = полностью left, 3 = полностью right
        // Преобразуем в баллы согласно методике IPI
        // -3 становится 0, 0 становится 3, 3 становится 6
        total += answer + 3;
      }
    });
    return total;
  };

  const getResultLevel = (score: number) => {
    if (score >= 164) {
      return {
        range: '164 і більше',
        level: 'ВИСОКИЙ РІВЕНЬ',
        image: ipiHighResultUrl,
        color: '#10b981',
        text: 'Відображає високий рівень здатності до інтеграції знань, навичок та креативних здібностей для досягнення результатів. Характеризуються здатністю ефективно поєднувати різні аспекти діяльності, швидко адаптуватися до змін та створювати інноваційні рішення навіть у складних умовах.',
      };
    } else if (score >= 91 && score <= 163) {
      return {
        range: 'Від 91 до 163',
        level: 'ОПТИМАЛЬНИЙ РІВЕНЬ',
        image: ipiOptimalResultUrl,
        color: '#f59e0b',
        text: 'Відображає збалансоване поєднання стабільності та відкритості до нововведень. Інновації розглядаються як можливість розвитку, але їх впровадження ґрунтується на раціональності та реальній потребі.',
      };
    } else {
      return {
        range: '90 і менше',
        level: 'НИЗЬКИЙ РІВЕНЬ',
        image: ipiLowResultUrl,
        color: '#ef4444',
        text: 'Відображає орієнтацію на традиційні підходи та рутинні завдання, із можливими труднощами у впровадженні нових ідей. Інновації можуть викликати опір або залишатися поза увагою через низький рівень поєднання знань, навичок і креативності.',
      };
    }
  };

  const getSubscaleDetails = (scaleId: string, value: number) => {
    const details: { [key: string]: { caption: string; levels: Array<{ min: number; max: number; title: string; paragraphs: string[] }> } } = {
      'new-info': {
        caption: 'Шкала оцінює, **схильність до дослідження та знаходження нової інформації** у звичних або рутинних ситуаціях.',
        levels: [
          {
            min: 0,
            max: 17,
            title: 'Загальний бал 17 або менше: НИЗЬКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується обмеженим інтересом до пошуку нової інформації та переважанням звичних джерел знань. Може виникати опір до змін у способах отримання інформації, а нові методи дослідження можуть викликати незручності.',
              'У професійній діяльності перевага надається перевіреним підходам, а експериментування з новими джерелами інформації обмежене.',
            ],
          },
          {
            min: 18,
            max: 28,
            title: 'Загальний бал від 18 до 28: ОПТИМАЛЬНИЙ РІВЕНЬ',
            paragraphs: [
              'Відображає збалансований підхід до пошуку та використання нових знань. Нову інформацію отримано усвідомлено, залежно від потреб ситуації. Перевага надається перевіреним методам, але допускається експериментування та інтеграція нових даних у робочі процеси. У професійній діяльності стабільність поєднується з вибірковою відкритістю до нових підходів, особливо якщо вони сприяють ефективності та розвитку.',
              'Робота приносить задоволення, її результати мотивують до розвитку та досягнення нових цілей. Проблеми не мають значного впливу на продуктивність чи загальний настрій.',
            ],
          },
          {
            min: 29,
            max: 35,
            title: '29 і більше: ВИСОКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується осмислено-інтенсивним підходом по пошуку нової інформації активністю у зборі даних навіть у звичних ситуаціях прагненням до новизни та бажанням удосконалювати звичні прийоми діяльності Проявляється здатність знаходити нові інформаційні простори швидко орієнтуватися у них та розширювати сферу компетенцій.',
              'У професійній сфері акцент робиться на освоєнні нових методів роботи, участі в нових проєктах і розширенні можливостей бізнесу',
            ],
          },
        ],
      },
      'creativity': {
        caption: 'Шкала оцінює **здатність генерувати оригінальні ідеї та нестандартні рішення**.',
        levels: [
          {
            min: 0,
            max: 17,
            title: 'Загальний бал 17 або менше: НИЗЬКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується обмеженою здатністю до генерації нових ідей та переважанням стандартних підходів до вирішення завдань.',
              'У професійній діяльності перевага надається перевіреним методам, а експериментування з новими підходами обмежене.',
            ],
          },
          {
            min: 18,
            max: 28,
            title: 'Загальний бал від 18 до 28: ОПТИМАЛЬНИЙ РІВЕНЬ',
            paragraphs: [
              'Відображає збалансовану здатність до творчого мислення з урахуванням практичних обмежень.',
              'Нові ідеї генеруються селективно, з урахуванням можливості їх реалізації та ефективності.',
            ],
          },
          {
            min: 29,
            max: 35,
            title: '29 і більше: ВИСОКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується високою здатністю до генерації оригінальних ідей та нестандартних рішень.',
              'Проявляється активність у пошуку нових підходів та готовність експериментувати з різними методами вирішення завдань.',
            ],
          },
        ],
      },
      'new-phenomena': {
        caption: 'Шкала оцінює **здатність до оцінки та аналізу нових явищ та ситуацій**.',
        levels: [
          {
            min: 0,
            max: 17,
            title: 'Загальний бал 17 або менше: НИЗЬКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується обмеженою здатністю до аналізу нових явищ та переважанням стандартних підходів до їх оцінки.',
              'У професійній діяльності перевага надається звичним методам аналізу, а нові підходи можуть викликати труднощі.',
            ],
          },
          {
            min: 18,
            max: 28,
            title: 'Загальний бал від 18 до 28: ОПТИМАЛЬНИЙ РІВЕНЬ',
            paragraphs: [
              'Відображає збалансовану здатність до оцінки нових явищ з урахуванням наявного досвіду.',
              'Нові ситуації аналізуються ретельно, з поєднанням традиційних та інноваційних підходів.',
            ],
          },
          {
            min: 29,
            max: 35,
            title: '29 і більше: ВИСОКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується високою здатністю до швидкого аналізу та оцінки нових явищ.',
              'Проявляється гнучкість у підходах до аналізу та готовність адаптувати методи оцінки до специфіки нових ситуацій.',
            ],
          },
        ],
      },
      'new-situation': {
        caption: 'Шкала оцінює **здатність ефективно діяти у нових та незвичних ситуаціях**.',
        levels: [
          {
            min: 0,
            max: 17,
            title: 'Загальний бал 17 або менше: НИЗЬКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується труднощами у адаптації до нових ситуацій та переважанням звичних способів дії.',
              'У професійній діяльності нові ситуації можуть викликати стрес та потребувати додаткової підтримки.',
            ],
          },
          {
            min: 18,
            max: 28,
            title: 'Загальний бал від 18 до 28: ОПТИМАЛЬНИЙ РІВЕНЬ',
            paragraphs: [
              'Відображає збалансовану здатність до адаптації у нових ситуаціях з урахуванням наявного досвіду.',
              'Нові ситуації сприймаються як виклики, але з обережністю та плануванням дій.',
            ],
          },
          {
            min: 29,
            max: 35,
            title: '29 і більше: ВИСОКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується високою здатністю до швидкої адаптації та ефективної діяльності у нових ситуаціях.',
              'Проявляється готовність до експериментування та пошуку нових способів дії у незвичних умовах.',
            ],
          },
        ],
      },
      'risk': {
        caption: 'Шкала оцінює **готовність приймати обґрунтовані ризики для досягнення цілей**.',
        levels: [
          {
            min: 0,
            max: 17,
            title: 'Загальний бал 17 або менше: НИЗЬКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується обережністю та униканням ризикованих рішень.',
              'У професійній діяльності перевага надається безпечним та перевіреним підходам.',
            ],
          },
          {
            min: 18,
            max: 28,
            title: 'Загальний бал від 18 до 28: ОПТИМАЛЬНИЙ РІВЕНЬ',
            paragraphs: [
              'Відображає збалансовану готовність до прийняття обґрунтованих ризиків.',
              'Ризикові рішення приймаються після ретельного аналізу можливих наслідків.',
            ],
          },
          {
            min: 29,
            max: 35,
            title: '29 і більше: ВИСОКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується високою готовністю до прийняття ризиків для досягнення амбітних цілей.',
              'Проявляється сміливість у прийнятті рішень та готовність діяти у умовах невизначеності.',
            ],
          },
        ],
      },
      'uncertainty': {
        caption: 'Шкала оцінює **толерантність до невизначеності та здатність діяти у нестабільних умовах**.',
        levels: [
          {
            min: 0,
            max: 17,
            title: 'Загальний бал 17 або менше: НИЗЬКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується низькою толерантністю до невизначеності та потребою у чітких інструкціях.',
              'У професійній діяльності нестабільні умови можуть викликати стрес та зниження продуктивності.',
            ],
          },
          {
            min: 18,
            max: 28,
            title: 'Загальний бал від 18 до 28: ОПТИМАЛЬНИЙ РІВЕНЬ',
            paragraphs: [
              'Відображає помірну толерантність до невизначеності з можливістю адаптації до змін.',
              'Нестабільні умови сприймаються як виклики, але з необхідністю планування та контролю.',
            ],
          },
          {
            min: 29,
            max: 35,
            title: '29 і більше: ВИСОКИЙ РІВЕНЬ',
            paragraphs: [
              'Характеризується високою толерантністю до невизначеності та здатністю ефективно діяти у нестабільних умовах.',
              'Проявляється гнучкість у підходах та готовність до швидких змін у відповідь на нові обставини.',
            ],
          },
        ],
      },
    };

    const scaleDetails = details[scaleId];
    if (!scaleDetails) return null;

    const level = scaleDetails.levels.find((l) => value >= l.min && value <= l.max) || scaleDetails.levels[0];

    return {
      caption: scaleDetails.caption,
      level,
    };
  };

  const currentQ = getCurrentQuestion();
  const progress = Math.round((currentQuestion / totalQuestions) * 100);
  const currentAnswer = answers[currentQ?.id];

  return (
    <div className="innovation-potential-page">
      <Sidebar />
      <main className="innovation-potential-main">
        <h1 className="innovation-potential-title">
          <div className="title-wrapper">Інноваційний потенціал особистості</div>
        </h1>
        <div className="innovation-potential-description-wrapper">
          <p className="innovation-potential-description">
            Тест дозволяє виявити, наскільки ви відкриті до нових ідей, готові діяти в умовах невизначеності та здатні<br />
            впроваджувати інновації у професійній та особистій діяльності. Також, оцінює ваш стиль пошуку нової<br />
            інформації, рівень креативності, ставлення до інновацій, готовність до ризику, толерантність до невизначеності<br />
            та здатність діяти ефективно у нових умовах.
          </p>
        </div>

        {!isShowingSavedResult && (
          <section className="test-section">
            <div className="innovation-potential-instructions">
              <div className="instructions-bubble">
                <div className="instructions-content">
                  <p className="instructions-text">
                    <TypewriterWords 
                      text="Вам запропоновані пари протилежних тверджень."
                      delay={100}
                    />
                    {' '}
                    <span className="instructions-text-bold">
                      <TypewriterWords 
                        text="Оберіть те, яке більше відповідає дійсності."
                        delay={100}
                        startDelay={2000}
                      />
                    </span>
                    {' '}
                    <TypewriterWords 
                      text="Позначте цифру, що відображає вашу впевненість у виборі:"
                      delay={100}
                      startDelay={4000}
                    />
                  </p>
                  <div className="instructions-scoring">
                    <p className="scoring-item">
                      <span className="scoring-number">3</span> - <TypewriterWords text="повністю згоден" delay={120} startDelay={6000} />
                    </p>
                    <p className="scoring-item">
                      <span className="scoring-number">2</span> - <TypewriterWords text="здебільшого згоден" delay={120} startDelay={7000} />
                    </p>
                    <p className="scoring-item">
                      <span className="scoring-number">1</span> - <TypewriterWords text="частково згоден" delay={120} startDelay={8000} />
                    </p>
                    <p className="scoring-item">
                      <span className="scoring-number">0</span> - <TypewriterWords text="обидва твердження, на вашу думку, однаково правильні." delay={120} startDelay={9000} />
                    </p>
                  </div>
                  <p className="instructions-text instructions-text-bold">
                    <TypewriterWords 
                      text="Відповідайте швидко, керуючись першим враженням та уникайте довгих роздумів."
                      delay={100}
                      startDelay={12000}
                    />
                  </p>
                </div>
              </div>
              <div className="instructions-robot">
                <img src={borderSideCheckUrl} alt="check" className="border-side-check" />
                <img src={robotImageUrl} alt="robot look" className="robot-image" />
              </div>
            </div>

            {currentQ && (
              <div className="question-wrapper">
                <div className="question-navigation-top">
                  <button
                    type="button"
                    className="nav-back-button"
                    onClick={() => {
                      setPendingNavigation('/tests');
                      setShowLeaveModal(true);
                    }}
                  >
                    Назад
                  </button>
                  <div className="question-progress-container">
                    <p className="question-progress-text">Питання {currentQuestion} / {totalQuestions} ({progress}%)</p>
                    <div className="question-progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="question-pair-wrapper">
                  <div className="question-pair-container">
                    <label className={`ipi-statement-box ${currentAnswer !== undefined && currentAnswer < 0 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        checked={currentAnswer !== undefined && currentAnswer < 0}
                        onChange={() => {}}
                        className="hidden-radio"
                      />
                      <span className="ipi-statement-text">{currentQ.left}</span>
                    </label>
                    <label className={`ipi-statement-box ${currentAnswer !== undefined && currentAnswer > 0 ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        checked={currentAnswer !== undefined && currentAnswer > 0}
                        onChange={() => {}}
                        className="hidden-radio"
                      />
                      <span className="ipi-statement-text">{currentQ.right}</span>
                    </label>
                  </div>
                </div>

                <div className="confidence-scale-wrapper">
                  <div className="confidence-scale">
                    {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
                      <label key={value} className="confidence-radio-label">
                        <input
                          type="radio"
                          name={`confidence-${currentQ.id}`}
                          value={value}
                          checked={currentAnswer === value}
                          onChange={() => handleAnswerChange(currentQ.id, value)}
                          className="confidence-radio-input"
                        />
                        <span className={`confidence-radio-custom ${value === 0 && currentAnswer !== 0 ? 'show-o' : ''}`}>
                          {value === 0 ? 'O' : ''}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="confidence-numbers">
                    {[-3, -2, -1, 0, 1, 2, 3].map((value) => (
                      <span key={value} className="confidence-number-label">{Math.abs(value)}</span>
                    ))}
                  </div>
                </div>

                <div className="test-navigation">
                  <button
                    type="button"
                    className="block-button block-button-prev"
                    onClick={handlePrev}
                    disabled={currentQuestion === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                      <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659729 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464467L0.646447 3.64645ZM9 3.5L1 3.5L1 4.5L9 4.5L9 3.5Z" fill="black" />
                    </svg>
                    <span>Попередній блок</span>
                  </button>
                  <button
                    type="button"
                    className="block-button block-button-next"
                    onClick={currentQuestion < totalQuestions ? handleNext : undefined}
                    disabled={currentQuestion >= totalQuestions}
                  >
                    <p className="text-right">Наступний блок</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                      <path d="M8.35355 4.35355C8.54882 4.15829 8.54882 3.84171 8.35355 3.64645L5.17157 0.464467C4.97631 0.269204 4.65973 0.269204 4.46447 0.464466C4.2692 0.659729 4.2692 0.976311 4.46447 1.17157L7.29289 4L4.46447 6.82843C4.2692 7.02369 4.2692 7.34027 4.46447 7.53553C4.65973 7.7308 4.97631 7.7308 5.17157 7.53553L8.35355 4.35355ZM-4.37114e-08 4.5L8 4.5L8 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" fill="black" />
                    </svg>
                  </button>
                </div>

                {isAllQuestionsAnswered && (
                  <button
                    type="button"
                    className="discover-results-button"
                    onClick={handleSubmitTest}
                  >
                    <span className="discover-results-text">Дізнатися результат</span>
                    <span className="discover-results-arrow" />
                  </button>
                )}
              </div>
            )}
          </section>
        )}

        {showResults && (() => {
          const score = calculateScore();
          const result = getResultLevel(score);

          const integrativeMax = 210;
          const integrativePercent = Math.min(
            100,
            Math.round((score / integrativeMax) * 100)
          );

          const subScales = [
            {
              id: 'new-info',
              title: 'Здатності до знаходження нової інформації',
              value: 29,
              max: 35,
            },
            {
              id: 'creativity',
              title: 'Креативність',
              value: 27,
              max: 35,
            },
            {
              id: 'new-phenomena',
              title: 'Спосіб реалізації інноваційної здатності до оцінки нового явища',
              value: 30,
              max: 35,
            },
            {
              id: 'new-situation',
              title: 'Спосіб реалізації інноваційної здатності до діяльності у новій ситуації',
              value: 28,
              max: 35,
            },
            {
              id: 'risk',
              title: 'Готовність до ризику',
              value: 25,
              max: 35,
            },
            {
              id: 'uncertainty',
              title: 'Толерантність до невизначеності',
              value: 26,
              max: 35,
            },
          ];

          return (
            <div ref={resultsRef} className="innovation-potential-results">
              {/* Інтегративний рівень */}
              <section className="ipi-integrative-section">
                <h2 className="ipi-integrative-title">
                  Інтегративний рівень інноваційного потенціалу
                </h2>

                <div className="ipi-integrative-progress-wrapper">
                  <div className="ipi-integrative-progress-top">
                    <span className="ipi-integrative-number">{score}</span>
                    <span className="ipi-integrative-number ipi-integrative-number-right">
                      {integrativeMax}
                    </span>
                  </div>
                  <div className="ipi-integrative-progress-bottom">
                    <div className="ipi-integrative-progress-track">
                      <div className="ipi-integrative-progress-inner">
                        <div
                          className="ipi-integrative-progress-fill"
                          style={{ width: `${integrativePercent}%` }}
                        />
                      </div>
                    </div>
                    <div className="ipi-integrative-score">
                      <span className="ipi-integrative-score-value">{score}</span>
                    </div>
                  </div>
                  <p className="ipi-integrative-caption">
                    Шкала оцінює{' '}
                    <span className="ipi-integrative-caption-strong">
                      загальний рівень здатності до інтеграції різних аспектів
                    </span>{' '}
                    своєї діяльності з метою впровадження інновацій.
                  </p>
                </div>

                <div className="ipi-integrative-main-card">
                  <div className="ipi-integrative-image">
                    <img src={result.image} alt={result.level} />
                  </div>
                  <div className="ipi-integrative-text">
                    <h3 className="ipi-integrative-main-title">
                      {result.range}:{' '}
                      <span className="ipi-integrative-main-title-accent">{result.level}</span>
                    </h3>
                    <p className="ipi-integrative-description">{result.text}</p>
                  </div>
                </div>
              </section>

              {/* Підшкали */}
              <section className="ipi-subscales-section">
                {subScales.map((scale) => {
                  const percent = Math.min(
                    100,
                    Math.round((scale.value / scale.max) * 100)
                  );

                  return (
                    <article key={scale.id} className="ipi-subscale-card">
                      <header className="ipi-subscale-header">
                        <h3 className="ipi-subscale-title">{scale.title}</h3>
                        <div className="ipi-subscale-progress-wrapper">
                          <div className="ipi-subscale-progress-top">
                            <span className="ipi-subscale-number">{scale.value}</span>
                            <span className="ipi-subscale-number ipi-subscale-number-right">
                              {scale.max}
                            </span>
                          </div>
                          <div className="ipi-subscale-progress-bottom">
                            <div className="ipi-subscale-progress-track">
                              <div className="ipi-subscale-progress-inner">
                                <div
                                  className="ipi-subscale-progress-fill"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                            <div className="ipi-subscale-score">
                              <span className="ipi-subscale-score-value">{scale.value}</span>
                            </div>
                          </div>
                        </div>
                      </header>
                      <button
                        type="button"
                        className={`ipi-subscale-link ${openSubscales[scale.id] ? 'active' : ''}`}
                        onClick={() => setOpenSubscales((prev) => ({ ...prev, [scale.id]: !prev[scale.id] }))}
                      >
                        Дізнатися більше
                      </button>
                      {openSubscales[scale.id] && (() => {
                        const details = getSubscaleDetails(scale.id, scale.value);
                        if (!details) return null;

                        const captionParts = details.caption.split('**');

                        return (
                          <section className="ipi-subscale-details">
                            <p className="ipi-subscale-details-caption">
                              {captionParts[0]}
                              {captionParts[1] && <strong>{captionParts[1]}</strong>}
                              {captionParts[2] || ''}
                            </p>
                            <h4 className="ipi-subscale-details-title">
                              {details.level.title.split(': ')[0]}:{' '}
                              <span className="ipi-subscale-details-title-accent">
                                {details.level.title.split(': ')[1]}
                              </span>
                            </h4>
                            {details.level.paragraphs.map((paragraph, idx) => (
                              <p key={idx} className="ipi-subscale-details-text">
                                {paragraph}
                              </p>
                            ))}
                          </section>
                        );
                      })()}
                    </article>
                  );
                })}
              </section>

              {!isShowingSavedResult && (
                <div className="save-section">
                  <button
                    type="button"
                    className={`save-button ${isSaved ? 'saved' : ''}`}
                    onClick={async () => {
                      if (isSaved) return;
                      
                      try {
                        const authToken = localStorage.getItem('authToken');
                        if (!authToken) {
                          alert('Будь ласка, увійдіть в систему для збереження результату');
                          return;
                        }

                        const score = calculateScore();
                        const result = getResultLevel(score);

                        // Формируем строку результата для сохранения
                        const resultText = `${result.range}: ${result.level}`;
                        const scoreText = `${score}`;

                        await axios.post(
                          `http://localhost:3000/api/test-results/`,
                          {
                            testName: 'Інноваційний потенціал особистості',
                            testType: 'innovation-potential',
                            result: resultText,
                            score: scoreText,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${authToken}`,
                            },
                          }
                        );

                        setIsSaved(true);
                        console.log('Result saved successfully');
                        
                        // Отправляем событие для обновления профиля (если он открыт)
                        window.dispatchEvent(new CustomEvent('testResultSaved'));
                      } catch (error: any) {
                        console.error('Error saving result:', error);
                        const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message || 'Помилка при збереженні результату';
                        alert(`Помилка: ${errorMessage}`);
                      }
                    }}
                  >
                    Зберегти результат
                  </button>
                  {isSaved && (
                    <p className="save-confirmation">Результат збережено в особистому кабінеті</p>
                  )}
                </div>
              )}
            </div>
          );
        })()}
      </main>

      {showLeaveModal && (
        <div className="innovation-potential-modal-overlay" onClick={() => {
          setShowLeaveModal(false);
          setPendingNavigation(null);
        }}>
          <div className="innovation-potential-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="innovation-potential-modal-close"
              onClick={() => {
                setShowLeaveModal(false);
                setPendingNavigation(null);
              }}
            >
              ×
            </button>
            <div className="innovation-potential-modal-body">
              <div className="innovation-potential-modal-robot">
                <img src={sadRobotImageUrl} alt="Sad Robot" />
              </div>
              <div className="innovation-potential-modal-text-content">
                <h2 className="innovation-potential-modal-title">Ви впевнені?</h2>
                <p className="innovation-potential-modal-message">
                  Якщо ви залишите сторінку зараз, ми не зможемо зберегти ваші результати. Продовжити?
                </p>
                <div className="innovation-potential-modal-buttons">
                  <button
                    className="innovation-potential-modal-button innovation-potential-modal-button-outline"
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
                    className="innovation-potential-modal-button innovation-potential-modal-button-primary"
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
