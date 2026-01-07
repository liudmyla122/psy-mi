import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../../layout';
import './MBTI.css';
import { getAssetUrl } from '../../../utils/assetPath';
import { mbtiQuestions, calculateMBTIType, MBTIQuestion } from './mbtiQuestions';

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
const mbtiBubbleBackground = getAssetUrl('_assets/images/borders/mbi_border.png');
const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');

// Для 94 вопросов: 94 / 5 = 18.8, округляем до 19 блоков
const questionsPerBlock = 5;

// Данные о типах MBTI
const mbtiTypesData: { [key: string]: { name: string; description: string; traits: string; professions: string } } = {
  ESTJ: {
    name: 'МЕНЕДЖЕР',
    description: 'Працездатний співробітник, який сприймає світ «таким, яким він є». Він схильний планувати і доводити до кінця початі справи. Піклується про близьке оточення, добродушний, але в той же час може бути запальним, різким, а іноді і впертим.',
    traits: 'екстраверт, сенсорик, логік, раціонал',
    professions: 'СЕO, COO, Project Manager (керівні посади).',
  },
  ESTP: {
    name: 'ПІДПРИЄМЕЦЬ',
    description: 'Така особистість досягає своїх цілей за будь-яку ціну. Перешкоди тільки підсилюють його прагнення до досягнення мети. Він прагне до керівництва і не вміє підкорятися. Зазвичай розробляє конкретний план дій і чітко його дотримується.',
    traits: 'екстраверт, сенсорик, логік, ірраціонал',
    professions: 'Менеджер по роботі з клієнтами, Підприємець, Маркетолог.',
  },
  ESFJ: {
    name: 'КОНСУЛ',
    description: 'Співробітник з такою комбінацією вміє впливати на людей, піклується іншими і схильний жертвувати собою. Він вміє легко налагодити зв\'язок з ким завгодно і повернути ситуацію в потрібне для себе русло.',
    traits: 'екстраверт, сенсорик, етик, раціонал',
    professions: 'Account Manager, HR manager, соціальний працівник.',
  },
  ESFP: {
    name: 'ШОУМЕН',
    description: 'Визначає слабкі сторони людей, що допомагає йому маніпулювати та керувати. Керується власними інтересами в спілкуванні з людьми і «живе в теперішньому». Така людина часто не доводить до кінця те, що почала, прагне до миттєвих результатів. Але в той же час орієнтується на гармонійні стосунки з іншими.',
    traits: 'екстраверт, сенсорик, етик, ірраціонал',
    professions: 'Event-manager, Стиліст, PR-спеціаліст.',
  },
  ENTJ: {
    name: 'КОМАНДИР',
    description: 'Співробітник легко захоплюється, йде на ризик, покладається на інтуїцію. Він без побоювань впроваджує нові технології, здатний глибоко аналізувати себе і світ. Життя для такої людини — боротьба, в якій відчуває себе «у своїй тарілці». Він відкритий новим можливостям, але має потребу в контролі.',
    traits: 'екстраверт, інтуїт, логік, раціонал',
    professions: 'СЕО, СМО, Стратегічний консультант, Юрист.',
  },
  ENTP: {
    name: 'ПОЛЕМІСТ',
    description: 'Винахідливий, ініціативний і вміє пристосовуватися — так можна охарактеризувати цього спеціаліста. Він той самий генератор ідей, першопроходець, який терпіти не може рутину. Постійний рух і інтуїтивне прийняття рішень — його постійні супутники.',
    traits: 'екстраверт, інтуїт, логік, ірраціонал',
    professions: 'Бренд-стратег, Підприємець або Стартап-засновник, Політичний стратег, Креативний директор.',
  },
  ENFJ: {
    name: 'ТРЕНЕР',
    description: 'Такий співробітник емоційний і емпатичний. Його міміка яскраво виражена, а сам він красномовний. Схильний до самоорганізації, саме тому його фантазії та ідеї реалізуються. Він інтуїтивно відчуває, яке рішення потрібно прийняти в тій чи іншій ситуації.',
    traits: 'екстраверт, інтуїт, етик, раціонал',
    professions: 'HR менеджер, Соціальний працівник, Викладач, Кар\'єрний консультант, Тренер з особистісного розвитку.',
  },
  ENFP: {
    name: 'АКТИВІСТ',
    description: 'Творча людина і фантазер. Комбінація якостей дозволяє йому ефективно співпрацювати з іншими людьми, бути відкритим і товариським. А ще брати участь в різних заходах, вирішувати виниклі питання і бути гнучким.',
    traits: 'екстраверт, інтуїт, етик, ірраціонал',
    professions: 'Креативний директор, Бренд-менеджер, Коуч.',
  },
  ISTJ: {
    name: 'АДМІНІСТРАТОР',
    description: 'Відповідальний, суворий, педантичний — такими якостями володіє людина з цією комбінацією. Він орієнтується на об\'єктивну реальність і схильний аналізувати інформацію. Береться за справу лише тоді, коли впевнений у своїх силах і позитивному результаті.',
    traits: 'інтроверт, сенсорик, логік, раціонал',
    professions: 'Аудитор, Юрист, Бухгалтер, Системний адміністратор, Офіс-менеджер.',
  },
  ISTP: {
    name: 'ВІРТУОЗ',
    description: 'Він пізнає світ через відчуття. За вдачею емпат, але здебільшого зосереджений на собі. Його здатність об\'єктивно приймати рішення і аналізувати говорить про технічний склад розуму. Завжди укладається в дедлайни, але іноді може діяти непередбачувано.',
    traits: 'інтроверт, сенсорик, логік, ірраціонал',
    professions: 'Аналітик, Розробник, Інженер-механік, Архітектор.',
  },
  ISFJ: {
    name: 'ЗАХИСНИК',
    description: 'Цей співробітник схильний аналізувати себе і інших, розпізнає фальш і тримає психологічну дистанцію. Він виконавчий, турботливий, служить іншим. Сили і енергію черпає з внутрішніх ресурсів і завжди покладається виключно на власний досвід.',
    traits: 'інтроверт, сенсорик, етик, раціонал',
    professions: 'Вихователь, Офіс-менеджер, Рекрутер, соціальний працівник.',
  },
  ISFP: {
    name: 'АВАНТЮРИСТ',
    description: 'Вміє насолоджуватись життям в умовах одноманітності і рутини. Відмінно взаємодіє з людьми, уникає конфліктів. Любить відчувати свою значимість і допомагати. Така людина не прагне керувати іншими або переробити їх, поважає їх простір і вимагає цього ж до себе. За вдачею є приземленим практиком, на якого можна покластися.',
    traits: 'інтроверт, сенсорик, етик, ірраціонал',
    professions: 'Графічний дизайнер, фотограф, консультант.',
  },
  INTJ: {
    name: 'СТРАТЕГ',
    description: 'Вміє виділяти головне, каже чітко і по суті, практик. Ця людина любить вдосконалювати все що робить, прагне реалізувати завдання якнайкраще. Він не любить порожніх розмов, тому уникає великих галасливих компаній і важко знаходить спільну мову з людьми.',
    traits: 'інтроверт, інтуїт, логік, раціонал',
    professions: 'Дослідник, Бізнес-стратег, Фінансовий аналітик, Керівник відділу досліджень та розвитку.',
  },
  INTP: {
    name: 'ЛОГІК',
    description: 'Цей співробітник — справжній ерудит, який має філософський склад розуму. Він аналізує свої рішення, прагне до об\'єктивності і неупередженості. Бурхливі прояви емоцій — це не про нього. З іншого боку, він відчуває напругу через велику кількість даних для аналізу і їх мінливість.',
    traits: 'інтроверт, інтуїт, логік, ірраціонал',
    professions: 'Аналітик, Researcher, програміст.',
  },
  INFJ: {
    name: 'АДВОКАТ',
    description: 'Про таких людей кажуть «йому можна довіряти». Він дуже чутливий, надає великого значення відносинам між людьми, вміє давати цінні поради і «відкривати інших». Розвинена інтуїція забезпечує не тільки нескінченний потік ідей, але і допомагає організовувати себе.',
    traits: 'інтроверт, інтуїт, етик, раціонал',
    professions: 'Психотерапевт, HR-спеціаліст, Викладач гуманітарних наук, Коуч із особистісного розвитку.',
  },
  INFP: {
    name: 'ПОСЕРЕДНИК',
    description: 'Ця людина — чутливий лірик, який відмінно розбирається в людях і викликає їх прихильність до себе. Він володіє хорошим почуттям гумору і надає велике значення зовнішньому вигляду. Прагне до самопізнання, жити в гармонії з самим собою і приносити користь оточуючим.',
    traits: 'інтроверт, інтуїт, етик, ірраціонал',
    professions: 'Журналіст, Ілюстратор, редактор, Спеціаліст із соціальної роботи.',
  },
};

export function MBTIPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentBlock, setCurrentBlock] = useState(1);
  const [answers, setAnswers] = useState<{ [questionId: number]: 'A' | 'B' }>({});
  const [showResults, setShowResults] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [showDichotomies, setShowDichotomies] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);
  const speechBubbleStyle = { backgroundImage: `url(${mbtiBubbleBackground})` };

  // Проверяем, есть ли сохраненный результат для показа при первой загрузке
  useEffect(() => {
    const state = location.state as { showSavedResult?: boolean; savedResult?: any };
    console.log('MBTI useEffect: state =', state);
    if (state?.showSavedResult && state?.savedResult) {
      console.log('MBTI: Showing saved result', state.savedResult);
      // Если перешли из профиля с сохраненным результатом, показываем его сразу
      const savedResultData = getSavedMBTIResult(state.savedResult);
      if (savedResultData) {
        setShowResults(true);
        setIsResultSaved(true);
        // Прокручиваем к результатам
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        console.error('MBTI: Failed to parse saved result', state.savedResult);
      }
    }
  }, [location.state]);

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

  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showResults]);

  const totalBlocks = Math.ceil(mbtiQuestions.length / questionsPerBlock);

  const getCurrentBlockQuestions = (): MBTIQuestion[] => {
    const startIndex = (currentBlock - 1) * questionsPerBlock;
    return mbtiQuestions.slice(startIndex, startIndex + questionsPerBlock);
  };

  const handleAnswerChange = (questionId: number, answer: 'A' | 'B') => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextBlock = () => {
    if (currentBlock < totalBlocks) {
      setCurrentBlock(currentBlock + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevBlock = () => {
    if (currentBlock > 1) {
      setCurrentBlock(currentBlock - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isCurrentBlockComplete = (): boolean => {
    const currentQuestions = getCurrentBlockQuestions();
    return currentQuestions.every((q) => answers[q.id] !== undefined);
  };

  const isAllBlocksComplete = (): boolean => {
    return mbtiQuestions.every((q) => answers[q.id] !== undefined);
  };

  const getAnsweredCount = (): number => {
    return Object.keys(answers).length;
  };

  const handleGetResult = () => {
    if (isAllBlocksComplete()) {
      setShowResults(true);
      // Прокручиваем к результатам
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // Убеждаемся, что результат остается видимым после сохранения
  useEffect(() => {
    if (isResultSaved && isAllBlocksComplete() && !showResults) {
      setShowResults(true);
    }
  }, [isResultSaved, showResults]);

  // Убеждаемся, что результат остается видимым после сохранения
  useEffect(() => {
    if (isResultSaved && isAllBlocksComplete() && !showResults) {
      setShowResults(true);
    }
  }, [isResultSaved]);

  const getMBTIResult = () => {
    if (!isAllBlocksComplete()) {
      return null;
    }
    const mbtiType = calculateMBTIType(answers);
    const typeData = mbtiTypesData[mbtiType];
    
    // Определяем изображение для каждого типа
    const imageMap: { [key: string]: string } = {
      ESTJ: '1.svg',
      INFJ: '2arh.svg',
      ISTJ: '3admin.svg',
      INTJ: '4strateg.svg',
      ENFP: '5aktivist.svg',
      INFP: '6posrednik.svg',
      ESTP: '7pidpr.svg',
      ISFJ: '8zahisnik.svg',
      ENTP: '9polemist.svg',
      ENTJ: '10komandir.svg',
      ISTP: '11virtuoz.svg',
      ISFP: '12avanturist.svg',
      ESFJ: '13konsul.svg',
      ENFJ: '14trener.svg',
      ESFP: '15houman.svg',
      INTP: '16logik.svg',
      // Здесь можно добавить другие типы, когда будут известны их изображения
    };
    
    const imageName = imageMap[mbtiType] || '1.svg';
    const imageUrl = getAssetUrl(`_assets/images/mbti/${imageName}`);
    
    if (!typeData) {
      return {
        type: mbtiType,
        name: mbtiType,
        description: `Ваш тип MBTI: ${mbtiType}`,
        traits: '',
        professions: '',
        imageUrl: imageUrl,
      };
    }
    return {
      type: mbtiType,
      name: typeData.name,
      description: typeData.description,
      traits: typeData.traits,
      professions: typeData.professions,
      imageUrl: imageUrl,
    };
  };

  // Функция для создания результата из сохраненных данных
  const getSavedMBTIResult = (savedResult: any) => {
    if (!savedResult) {
      console.log('getSavedMBTIResult: savedResult is null');
      return null;
    }
    
    console.log('getSavedMBTIResult: savedResult =', savedResult);
    
    // Пытаемся извлечь данные из нового формата (Type:...;Name:...;Description:...;Traits:...;Professions:...)
    let mbtiType = '';
    let name = '';
    let description = '';
    let traits = '';
    let professions = '';
    
    if (savedResult.score && savedResult.score.includes('Type:')) {
      // Новый формат с полной информацией
      const scoreParts = savedResult.score.split(';');
      scoreParts.forEach((part: string) => {
        const [key, ...valueParts] = part.split(':');
        const value = valueParts.join(':'); // На случай, если в значении есть двоеточие
        switch (key.trim()) {
          case 'Type':
            mbtiType = value.trim();
            break;
          case 'Name':
            name = value.trim();
            break;
          case 'Description':
            description = value.trim();
            break;
          case 'Traits':
            traits = value.trim();
            break;
          case 'Professions':
            professions = value.trim();
            break;
        }
      });
      
      console.log('getSavedMBTIResult: Extracted from new format:', { mbtiType, name, description, traits, professions });
    } else {
      // Старый формат - только тип в score
      mbtiType = savedResult.score || '';
      name = savedResult.result || '';
      
      // Если тип найден, получаем данные из mbtiTypesData
      if (mbtiType && mbtiTypesData[mbtiType]) {
        const typeData = mbtiTypesData[mbtiType];
        name = name || typeData.name;
        description = typeData.description;
        traits = typeData.traits;
        professions = typeData.professions;
      } else if (name) {
        // Пытаемся найти тип по названию
        const foundType = Object.keys(mbtiTypesData).find(
          key => mbtiTypesData[key].name === name
        );
        if (foundType) {
          mbtiType = foundType;
          const typeData = mbtiTypesData[foundType];
          description = typeData.description;
          traits = typeData.traits;
          professions = typeData.professions;
        }
      }
      
      console.log('getSavedMBTIResult: Extracted from old format:', { mbtiType, name });
    }
    
    // Если не удалось извлечь тип, возвращаем базовый результат
    if (!mbtiType && !name) {
      console.log('getSavedMBTIResult: No type or name found, returning fallback');
      const imageUrl = getAssetUrl(`_assets/images/mbti/1.svg`);
      return {
        type: 'UNKNOWN',
        name: savedResult.result || 'Результат MBTI',
        description: savedResult.result ? `Ваш результат: ${savedResult.result}` : 'Результат тесту MBTI',
        traits: '',
        professions: '',
        imageUrl: imageUrl,
      };
    }
    
    // Определяем изображение для типа
    const imageMap: { [key: string]: string } = {
      ESTJ: '1.svg',
      INFJ: '2arh.svg',
      ISTJ: '3admin.svg',
      INTJ: '4strateg.svg',
      ENFP: '5aktivist.svg',
      INFP: '6posrednik.svg',
      ESTP: '7pidpr.svg',
      ISFJ: '8zahisnik.svg',
      ENTP: '9polemist.svg',
      ENTJ: '10komandir.svg',
      ISTP: '11virtuoz.svg',
      ISFP: '12avanturist.svg',
      ESFJ: '13konsul.svg',
      ENFJ: '14trener.svg',
      ESFP: '15houman.svg',
      INTP: '16logik.svg',
    };
    
    const imageName = mbtiType ? (imageMap[mbtiType] || '1.svg') : '1.svg';
    const imageUrl = getAssetUrl(`_assets/images/mbti/${imageName}`);
    
    return {
      type: mbtiType || 'UNKNOWN',
      name: name || savedResult.result || 'Результат MBTI',
      description: description || (savedResult.result ? `Ваш результат: ${savedResult.result}` : 'Результат тесту MBTI'),
      traits: traits || '',
      professions: professions || '',
      imageUrl: imageUrl,
    };
  };

  const currentQuestions = getCurrentBlockQuestions();
  const answeredCount = getAnsweredCount();
  
  // Проверяем, есть ли сохраненный результат для показа
  const state = location.state as { showSavedResult?: boolean; savedResult?: any };
  const savedResultData = (state?.showSavedResult && state?.savedResult) 
    ? getSavedMBTIResult(state.savedResult) 
    : null;
  
  console.log('MBTI: savedResultData =', savedResultData, 'state =', state);
  
  const mbtiResult = savedResultData || getMBTIResult();
  const isShowingSavedResult = !!savedResultData;
  
  console.log('MBTI: mbtiResult =', mbtiResult, 'isShowingSavedResult =', isShowingSavedResult, 'showResults =', showResults);
  
  // Если есть сохраненный результат, но showResults еще не установлен, устанавливаем его
  useEffect(() => {
    if (isShowingSavedResult && mbtiResult) {
      console.log('MBTI: Setting showResults to true for saved result');
      setShowResults(true);
      setIsResultSaved(true);
    }
  }, [isShowingSavedResult, mbtiResult]);
  
  // Убеждаемся, что результат отображается при наличии сохраненного результата
  const shouldShowResults = showResults || (isShowingSavedResult && mbtiResult);

  return (
    <div className="mbti-page">
      <Sidebar />
      <main className="mbti-main">
        <div className="mbti-content">
          {/* Intro Section - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="mbti-intro-section">
            <h1 className="mbti-title">Тест МВТІ</h1>
            <div className="mbti-description">
              <p>
                МВТІ Тест, розроблений на основі теорії психологічних типів Карла Юнга та адаптований Ізабель Маєрс<br />
                і Кетрін Бріґґс. Він визначає ваш психологічний тип за чотирма дихотоміями:
              </p>
              <div className="mbti-dichotomies-wrapper">
                <button 
                  type="button"
                  className="mbti-hide-button"
                  onClick={() => setShowDichotomies(!showDichotomies)}
                >
                  {showDichotomies ? 'Сховати' : 'Показати'}
                </button>
                {showDichotomies && (
                  <>
                    <div className="mbti-dichotomies">
                      <p><strong>Екстраверсія (E) – Інтроверсія (I):</strong> Спрямованість уваги.</p>
                      <p><strong>Сенсорика (S) – Інтуїція (N):</strong> Спосіб отримання інформації.</p>
                      <p><strong>Мислення (T) – Відчуття (F):</strong> Прийняття рішень.</p>
                      <p><strong>Судження (J) – Спостереження (P):</strong> Стиль організації життя.</p>
                    </div>
                    <p className="mbti-dichotomies-note">
                      Результати допомагають краще зрозуміти свої сильні сторони, спосіб мислення та взаємодії з іншими
                      <br />людьми, а також можуть бути корисними у професійному розвитку та виборі кар'єрного шляху.
                    </p>
                    <p className="mbti-instructions-note">
                      Обирайте варіант відповіді, який найбільш точно відображає вашу поведінку у повсякденному житті. Не намагайтеся надто довго обмірковувати — обирайте те, що здається найближчим до вашого природного стилю.
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>
          )}

          {/* Questions Section - показываем только если не показываем сохраненный результат */}
          {!isShowingSavedResult && (
            <section className="mbti-question-section">
            <div className="mbti-robot-bubble-container">
              <div className="mbti-bubble-wrapper">
                <div className="mbti-speech-bubble" style={speechBubbleStyle}>
                  <p>
                    <TypewriterWords 
                      text="Уважно прочитайте питання і не роздумуючи оберіть варіант відповіді"
                      delay={100}
                    />
                  </p>
                </div>
                <div className="mbti-robot-image">
                  <img src={robotImageUrl} alt="Robot" />
                </div>
              </div>
            </div>

            {currentQuestions.map((question, index) => {
              const isProgressQuestion = index === 2; // 3-й вопрос в каждом блоке показывает прогресс

              return (
                <div
                  key={question.id}
                  className={`mbti-question-block ${isProgressQuestion ? 'mbti-question-block--with-progress' : ''}`}
                >
                  <div className="mbti-question-content">
                    <div className="mbti-question-header">
                      <div className="mbti-question-number">{question.id}</div>
                      <p className="mbti-question-text">{question.text.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < question.text.split('\n').length - 1 && <br />}
                        </span>
                      ))}</p>
                    </div>
                    <div className="mbti-answer-options">
                      <label
                        className={`mbti-answer-option ${answers[question.id] === 'A' ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value="A"
                          checked={answers[question.id] === 'A'}
                          onChange={() => handleAnswerChange(question.id, 'A')}
                        />
                        <span>{question.optionA}</span>
                      </label>
                      <label
                        className={`mbti-answer-option ${answers[question.id] === 'B' ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value="B"
                          checked={answers[question.id] === 'B'}
                          onChange={() => handleAnswerChange(question.id, 'B')}
                        />
                        <span>{question.optionB}</span>
                      </label>
                    </div>
                  </div>
                  {isProgressQuestion && (
                    <div className="mbti-progress-summary">
                      <p className="mbti-progress-label">Пройдено</p>
                      <div className="mbti-progress-count">
                        <span className="mbti-progress-current">{answeredCount}</span>
                        <span className="mbti-progress-divider">/</span>
                        <span className="mbti-progress-total">{mbtiQuestions.length}</span>
                      </div>
                      <p className="mbti-progress-subtext">питань</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Мобильная версия прогресса для 480px */}
            <div className="mbti-progress-summary-mobile">
              <p className="mbti-progress-label">Пройдено</p>
              <div className="mbti-progress-count">
                <span className="mbti-progress-current">{answeredCount}</span>
                <span className="mbti-progress-divider">/</span>
                <span className="mbti-progress-total">{mbtiQuestions.length}</span>
              </div>
              <p className="mbti-progress-subtext">питань</p>
            </div>

            <div className="mbti-navigation">
              <button
                type="button"
                className="mbti-nav-button"
                onClick={handlePrevBlock}
                disabled={currentBlock === 1}
              >
                ← попередній блок
              </button>
              <button
                type="button"
                className="mbti-nav-button"
                onClick={handleNextBlock}
                disabled={currentBlock === totalBlocks || !isCurrentBlockComplete()}
              >
                наступний блок →
              </button>
            </div>

            {isAllBlocksComplete() && (
              <button
                type="button"
                className="mbti-results-toggle"
                onClick={handleGetResult}
                aria-expanded={showResults}
              >
                <span className="mbti-results-toggle-text">Дізнатися результат</span>
                <svg
                  className={`mbti-results-toggle-icon ${showResults ? 'open' : ''}`}
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
            )}

            {(shouldShowResults || showResults) && mbtiResult && (
              <div className="mbti-results" ref={resultsRef}>
                {isShowingSavedResult && (
                  <div style={{ marginBottom: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      style={{
                        background: 'transparent',
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
                    {state?.savedResult?.completedAt && (
                      <p
                        style={{
                          marginTop: '0.5rem',
                          fontSize: '14px',
                          color: '#6B7280',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        Дата проходження: {new Date(state.savedResult.completedAt).toLocaleDateString('uk-UA')}
                      </p>
                    )}
                  </div>
                )}
                <h2 className="mbti-results-title">Результат MBTI</h2>
                <div className="mbti-results-content">
                  <div className="mbti-results-image">
                    <img src={mbtiResult.imageUrl} alt={mbtiResult.type} />
                  </div>
                  <div className="mbti-results-info">
                    <h3 className="mbti-result-role">{mbtiResult.name}</h3>
                    <p className="mbti-result-type">
                      <strong>{mbtiResult.type}:</strong> {mbtiResult.traits}
                    </p>
                    <p className="mbti-result-text">{mbtiResult.description}</p>
                    <div className="mbti-result-profession">
                      <strong>ПРОФЕСІЇ:</strong> {mbtiResult.professions}
                    </div>
                    {!isShowingSavedResult && (
                      <>
                        <button
                          type="button"
                          className={`mbti-save-button ${isResultSaved ? 'saved' : ''}`}
                          onClick={async () => {
                            if (isResultSaved) return;

                            try {
                              const authToken = localStorage.getItem('authToken');
                              if (!authToken) {
                                alert('Будь ласка, увійдіть в систему для збереження результату');
                                return;
                              }

                              // Получаем текущий результат
                              const currentResult = getMBTIResult();
                              if (!currentResult) {
                                alert('Помилка: результат тесту не знайдено. Будь ласка, спочатку завершіть тест.');
                                return;
                              }

                              // Формируем полную информацию о результате для сохранения
                              const scoreText = `Type:${currentResult.type};Name:${currentResult.name};Description:${currentResult.description};Traits:${currentResult.traits};Professions:${currentResult.professions}`;

                              // Отправляем данные на сервер
                              const response = await axios.post(
                                `http://localhost:3000/api/test-results/`,
                                {
                                  testName: 'Тест MBTI',
                                  testType: 'mbti',
                                  result: currentResult.name,
                                  score: scoreText,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${authToken}`,
                                  },
                                }
                              );

                              // Проверяем успешность сохранения
                              if (response.status === 201 || response.status === 200) {
                                // Устанавливаем флаг сохранения
                                setIsResultSaved(true);
                                // Убеждаемся, что результаты остаются видимыми
                                setShowResults(true);
                                
                                // Отправляем событие для обновления профиля
                                window.dispatchEvent(new CustomEvent('testResultSaved'));
                                
                                // Дополнительная отправка события через задержку для надежности
                                setTimeout(() => {
                                  window.dispatchEvent(new CustomEvent('testResultSaved'));
                                }, 500);
                              } else {
                                throw new Error('Не вдалося зберегти результат');
                              }
                            } catch (error: any) {
                              console.error('❌ Error saving result:', error);
                              console.error('Error response:', error.response);
                              console.error('Error data:', error.response?.data);
                              const errorMessage = error.response?.data?.detail || error.message || 'Помилка при збереженні результату';
                              alert(`Помилка: ${errorMessage}`);
                            }
                          }}
                        >
                          Зберегти результат
                        </button>
                        {isResultSaved && (
                          <p className="mbti-save-confirmation">Результат збережено в особистому кабінеті</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
          )}
        </div>
      </main>

      {/* Модальное окно подтверждения выхода */}
      {showLeaveModal && (
          <div
            className="mbti-modal-overlay"
            onClick={() => {
              setShowLeaveModal(false);
              setPendingNavigation(null);
            }}
          >
            <div className="mbti-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="mbti-modal-close"
                onClick={() => {
                  setShowLeaveModal(false);
                  setPendingNavigation(null);
                }}
              >
                ×
              </button>
              <div className="mbti-modal-body">
                <div className="mbti-modal-robot">
                  <img src={sadRobotImageUrl} alt="Sad Robot" />
                </div>
                <div className="mbti-modal-text-content">
                  <h2 className="mbti-modal-title">Ви впевнені?</h2>
                  <p className="mbti-modal-message">
                    Якщо ви залишите сторінку зараз, ми не зможемо зберегти ваші результати. Продовжити?
                  </p>
                  <div className="mbti-modal-buttons">
                    <button
                      className="mbti-modal-button mbti-modal-button-outline"
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
                      className="mbti-modal-button mbti-modal-button-primary"
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
