import { useState } from 'react';
import { Sidebar } from '../../../layout';
import './Enneagram.css';
import { getAssetUrl } from '../../../utils/assetPath';

const robotImageUrl = getAssetUrl('_assets/images/robot_img_2.png');
const enneagramBorderImg = getAssetUrl('_assets/images/borders/eneagrama_border.png');
const enneagramImageUrl = getAssetUrl('_assets/images/enneagram_img.png');

// Типы Enneagram (1-9)
const enneagramTypes = [
  {
    id: 1,
    name: 'Перфекціоніст',
    description: 'Ідеаліст з високими стандартами, який прагне до досконалості та покращення.',
  },
  {
    id: 2,
    name: 'Помічник',
    description: 'Теплий, чуйний та щедрий, завжди готовий допомогти іншим.',
  },
  {
    id: 3,
    name: 'Досягнення',
    description: 'Орієнтований на успіх, амбітний та енергійний, прагне досягти своїх цілей.',
  },
  {
    id: 4,
    name: 'Індивідуаліст',
    description: 'Творчий, інтроспективний та емоційний, шукає унікальність та глибину.',
  },
  {
    id: 5,
    name: 'Дослідник',
    description: 'Інтелектуальний, інноваційний та незалежний, прагне знань та розуміння.',
  },
  {
    id: 6,
    name: 'Лояліст',
    description: 'Відповідальний, надійний та вірний, шукає безпеку та підтримку.',
  },
  {
    id: 7,
    name: 'Ентузіаст',
    description: 'Енергійний, оптимістичний та спонтанний, любить нові досвіди та можливості.',
  },
  {
    id: 8,
    name: 'Виклик',
    description: 'Сильний, впевнений та рішучий, природний лідер з потужною енергією.',
  },
  {
    id: 9,
    name: 'Миролюбець',
    description: 'Спокійний, приймаючий та гармонійний, прагне миру та стабільності.',
  },
];

export function EnneagramPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswerSecond, setSelectedAnswerSecond] = useState<number | null>(null);
  const [selectedAnswerThird, setSelectedAnswerThird] = useState<number | null>(null);
  const [selectedAnswerFourth, setSelectedAnswerFourth] = useState<number | null>(null);
  const [selectedAnswerFifth, setSelectedAnswerFifth] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const [resultType, setResultType] = useState<number | null>(null);
  const speechBubbleStyle = { backgroundImage: `url(${enneagramBorderImg})` };

  const handleShowResults = () => {
    // Простая логика определения типа (можно улучшить)
    const answers = [
      selectedAnswer,
      selectedAnswerSecond,
      selectedAnswerThird,
      selectedAnswerFourth,
      selectedAnswerFifth,
    ];
    const answeredCount = answers.filter((a) => a !== null).length;

    if (answeredCount > 0) {
      // Простое определение типа на основе ответов
      const calculatedType = (answeredCount % 9) + 1;
      setResultType(calculatedType);
    } else {
      setResultType(1); // По умолчанию
    }

    setShowResults(true);
  };

  const getResultImageUrl = () => {
    if (resultType) {
      return getAssetUrl(`_assets/images/enneagrama_answers/${resultType}.png`);
    }
    return getAssetUrl('_assets/images/enneagrama_answers/1.png');
  };

  const getResultType = () => {
    if (resultType) {
      return enneagramTypes[resultType - 1];
    }
    return enneagramTypes[0];
  };

  return (
    <div className="enneagram-page">
      <Sidebar />
      <main className="enneagram-main">
        <div className="enneagram-content">
          <section className="enneagram-intro-section">
            <h1 className="enneagram-title">Енеаграма</h1>
            <div className="enneagram-description">
              <p>
                <strong>Енеаграма</strong> - це психологічна модель, яка розкриває{' '}
                <strong>дев'ять типів особистості</strong> та їх взаємозв'язки. Вона допомагає
                зрозуміти <strong>мотивації</strong>, <strong>страхи</strong> та{' '}
                <strong>поведінкові патерни</strong> кожної людини.
              </p>
            </div>
          </section>

          <section className="enneagram-question-section">
            <div className="enneagram-robot-bubble-container">
              <div className="enneagram-bubble-wrapper">
                <div className="enneagram-speech-bubble" style={speechBubbleStyle}>
                  <p>Уважно прочитайте питання і оберіть варіант відповіді, який найкраще описує вас</p>
                </div>
                <div className="enneagram-robot-image">
                  <img src={robotImageUrl} alt="Robot" />
                </div>
              </div>
            </div>

            <div className="enneagram-question-block">
              <div className="enneagram-question-content">
                <div className="enneagram-question-header">
                  <div className="enneagram-question-number">1</div>
                  <p className="enneagram-question-text">Я зазвичай:</p>
                </div>
                <div className="enneagram-answer-options">
                  <label className={`enneagram-answer-option ${selectedAnswer === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-1"
                      value="0"
                      checked={selectedAnswer === 0}
                      onChange={() => setSelectedAnswer(0)}
                    />
                    <span>Прагну до досконалості та високих стандартів</span>
                  </label>
                  <label className={`enneagram-answer-option ${selectedAnswer === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-1"
                      value="1"
                      checked={selectedAnswer === 1}
                      onChange={() => setSelectedAnswer(1)}
                    />
                    <span>Допомагаю іншим та дбаю про їх потреби</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="enneagram-question-block">
              <div className="enneagram-question-content">
                <div className="enneagram-question-header">
                  <div className="enneagram-question-number">2</div>
                  <p className="enneagram-question-text">Мої основні цінності:</p>
                </div>
                <div className="enneagram-answer-options">
                  <label className={`enneagram-answer-option ${selectedAnswerSecond === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-2"
                      value="0"
                      checked={selectedAnswerSecond === 0}
                      onChange={() => setSelectedAnswerSecond(0)}
                    />
                    <span>Успіх, досягнення та визнання</span>
                  </label>
                  <label className={`enneagram-answer-option ${selectedAnswerSecond === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-2"
                      value="1"
                      checked={selectedAnswerSecond === 1}
                      onChange={() => setSelectedAnswerSecond(1)}
                    />
                    <span>Унікальність, творчість та автентичність</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="enneagram-question-block enneagram-question-block--with-progress">
              <div className="enneagram-question-content">
                <div className="enneagram-question-header">
                  <div className="enneagram-question-number">3</div>
                  <p className="enneagram-question-text">У стресових ситуаціях я:</p>
                </div>
                <div className="enneagram-answer-options">
                  <label className={`enneagram-answer-option ${selectedAnswerThird === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-3"
                      value="0"
                      checked={selectedAnswerThird === 0}
                      onChange={() => setSelectedAnswerThird(0)}
                    />
                    <span>Аналізую та шукаю рішення</span>
                  </label>
                  <label className={`enneagram-answer-option ${selectedAnswerThird === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-3"
                      value="1"
                      checked={selectedAnswerThird === 1}
                      onChange={() => setSelectedAnswerThird(1)}
                    />
                    <span>Шукаю підтримку та безпеку</span>
                  </label>
                </div>
              </div>
              <div className="enneagram-progress-summary">
                <p className="enneagram-progress-label">Пройдено</p>
                <div className="enneagram-progress-count">
                  <span className="enneagram-progress-current">1</span>
                  <span className="enneagram-progress-divider">/</span>
                  <span className="enneagram-progress-total">36</span>
                </div>
                <p className="enneagram-progress-subtext">питань</p>
              </div>
            </div>

            <div className="enneagram-question-block">
              <div className="enneagram-question-content">
                <div className="enneagram-question-header">
                  <div className="enneagram-question-number">4</div>
                  <p className="enneagram-question-text">Я найбільше ціную:</p>
                </div>
                <div className="enneagram-answer-options">
                  <label className={`enneagram-answer-option ${selectedAnswerFourth === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-4"
                      value="0"
                      checked={selectedAnswerFourth === 0}
                      onChange={() => setSelectedAnswerFourth(0)}
                    />
                    <span>Нові досвіди та можливості</span>
                  </label>
                  <label className={`enneagram-answer-option ${selectedAnswerFourth === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-4"
                      value="1"
                      checked={selectedAnswerFourth === 1}
                      onChange={() => setSelectedAnswerFourth(1)}
                    />
                    <span>Силу, контроль та незалежність</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="enneagram-question-block">
              <div className="enneagram-question-content">
                <div className="enneagram-question-header">
                  <div className="enneagram-question-number">5</div>
                  <p className="enneagram-question-text">У стосунках я:</p>
                </div>
                <div className="enneagram-answer-options">
                  <label className={`enneagram-answer-option ${selectedAnswerFifth === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-5"
                      value="0"
                      checked={selectedAnswerFifth === 0}
                      onChange={() => setSelectedAnswerFifth(0)}
                    />
                    <span>Прагну до гармонії та миру</span>
                  </label>
                  <label className={`enneagram-answer-option ${selectedAnswerFifth === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-5"
                      value="1"
                      checked={selectedAnswerFifth === 1}
                      onChange={() => setSelectedAnswerFifth(1)}
                    />
                    <span>Буду активним та енергійним</span>
                  </label>
                </div>

                <div className="enneagram-navigation">
                  <button type="button" className="enneagram-nav-button" disabled>
                    ← попередній блок
                  </button>
                  <button type="button" className="enneagram-nav-button">
                    наступний блок →
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="enneagram-results-toggle"
              onClick={handleShowResults}
              aria-expanded={showResults}
            >
              <span className="enneagram-results-toggle-text">Дізнатися результат</span>
              <svg
                className={`enneagram-results-toggle-icon ${showResults ? 'open' : ''}`}
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

            {showResults && (
              <div className="enneagram-results">
                <h2 className="enneagram-results-title">Результат Енеаграма</h2>
                <div className="enneagram-results-content">
                  <div className="enneagram-results-image">
                    <img src={getResultImageUrl()} alt={getResultType().name} />
                  </div>
                  <div className="enneagram-results-info">
                    <p className="enneagram-result-role">Тип {resultType}: {getResultType().name}</p>
                    <p className="enneagram-result-text">{getResultType().description}</p>
                    <button
                      type="button"
                      className={`enneagram-save-button ${isResultSaved ? 'saved' : ''}`}
                      onClick={() => setIsResultSaved(true)}
                    >
                      Зберегти результат
                    </button>
                    {isResultSaved && (
                      <p className="enneagram-save-confirmation">Результат збережено в особистому кабінеті</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

