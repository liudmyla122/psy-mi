import { useState } from 'react';
import { Sidebar } from '../../../layout';
import './MBTI.css';
import { getAssetUrl } from '../../../utils/assetPath';

const robotImageUrl = getAssetUrl('_assets/images/robot_img_2.png');
const mbtiResultImageUrl = getAssetUrl('_assets/images/mbti/1.svg');
const mbtiBubbleBackground = getAssetUrl('_assets/images/borders/mbi_border.png');

export function MBTIPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswerSecond, setSelectedAnswerSecond] = useState<number | null>(null);
  const [selectedAnswerThird, setSelectedAnswerThird] = useState<number | null>(null);
  const [selectedAnswerFourth, setSelectedAnswerFourth] = useState<number | null>(null);
  const [selectedAnswerFifth, setSelectedAnswerFifth] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const speechBubbleStyle = { backgroundImage: `url(${mbtiBubbleBackground})` };

  return (
    <div className="mbti-page">
      <Sidebar />
      <main className="mbti-main">
        <div className="mbti-content">
          <section className="mbti-intro-section">
            <h1 className="mbti-title">Тест МВТІ</h1>
            <div className="mbti-description">
              <p>
                <strong>МВТІ</strong> широко використовується для самопізнання, <strong>розвитку кар'єри</strong> та
                покращення міжособистісних взаємин, надаючи уявлення про <strong>сильні сторони</strong>, потенційні
                труднощі та <strong>вподобання</strong> кожної людини.
              </p>
            </div>
          </section>

          <section className="mbti-question-section">
            <div className="mbti-robot-bubble-container">
              <div className="mbti-bubble-wrapper">
                <div className="mbti-speech-bubble" style={speechBubbleStyle}>
                  <p>Уважно прочитайте питання і не роздумуючи оберіть варіант відповіді</p>
                </div>
                <div className="mbti-robot-image">
                  <img src={robotImageUrl} alt="Robot" />
                </div>
              </div>
            </div>

            <div className="mbti-question-block">
              <div className="mbti-question-content">
                <div className="mbti-question-header">
                  <div className="mbti-question-number">1</div>
                  <p className="mbti-question-text">Зазвичай Ви:</p>
                </div>
                <div className="mbti-answer-options">
                  <label className={`mbti-answer-option ${selectedAnswer === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-1"
                      value="0"
                      checked={selectedAnswer === 0}
                      onChange={() => setSelectedAnswer(0)}
                    />
                    <span>Товариські</span>
                  </label>
                  <label className={`mbti-answer-option ${selectedAnswer === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-1"
                      value="1"
                      checked={selectedAnswer === 1}
                      onChange={() => setSelectedAnswer(1)}
                    />
                    <span>Досить стримані та спокійні</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mbti-question-block">
              <div className="mbti-question-content">
                <div className="mbti-question-header">
                  <div className="mbti-question-number">2</div>
                  <p className="mbti-question-text">
                    Якби Ви були викладачем, який курс Ви б обрали:
                  </p>
                </div>
                <div className="mbti-answer-options">
                  <label className={`mbti-answer-option ${selectedAnswerSecond === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-2"
                      value="0"
                      checked={selectedAnswerSecond === 0}
                      onChange={() => setSelectedAnswerSecond(0)}
                    />
                    <span>Побудований на викладенні фактів</span>
                  </label>
                  <label className={`mbti-answer-option ${selectedAnswerSecond === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-2"
                      value="1"
                      checked={selectedAnswerSecond === 1}
                      onChange={() => setSelectedAnswerSecond(1)}
                    />
                    <span>Що включає в себе викладення теорій</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mbti-question-block mbti-question-block--with-progress">
              <div className="mbti-question-content">
                <div className="mbti-question-header">
                  <div className="mbti-question-number">3</div>
                  <p className="mbti-question-text">Ви частіше дозволяєте:</p>
                </div>
                <div className="mbti-answer-options">
                  <label className={`mbti-answer-option ${selectedAnswerThird === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-3"
                      value="0"
                      checked={selectedAnswerThird === 0}
                      onChange={() => setSelectedAnswerThird(0)}
                    />
                    <span>Своєму серцю керувати розумом</span>
                  </label>
                  <label className={`mbti-answer-option ${selectedAnswerThird === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-3"
                      value="1"
                      checked={selectedAnswerThird === 1}
                      onChange={() => setSelectedAnswerThird(1)}
                    />
                    <span>Своєму розуму керувати серцем</span>
                  </label>
                </div>
              </div>
              <div className="mbti-progress-summary">
                <p className="mbti-progress-label">Пройдено</p>
                <div className="mbti-progress-count">
                  <span className="mbti-progress-current">1</span>
                  <span className="mbti-progress-divider">/</span>
                  <span className="mbti-progress-total">88</span>
                </div>
                <p className="mbti-progress-subtext">питань</p>
              </div>
            </div>

            <div className="mbti-question-block">
              <div className="mbti-question-content">
                <div className="mbti-question-header">
                  <div className="mbti-question-number">4</div>
                  <p className="mbti-question-text">
                    Коли Ви вирушаєте кудись на цілий день, Ви:
                  </p>
                </div>
                <div className="mbti-answer-options">
                  <label className={`mbti-answer-option ${selectedAnswerFourth === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-4"
                      value="0"
                      checked={selectedAnswerFourth === 0}
                      onChange={() => setSelectedAnswerFourth(0)}
                    />
                    <span>Плануєте, що і коли будете робити</span>
                  </label>
                  <label className={`mbti-answer-option ${selectedAnswerFourth === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-4"
                      value="1"
                      checked={selectedAnswerFourth === 1}
                      onChange={() => setSelectedAnswerFourth(1)}
                    />
                    <span>Йдете без певного плану</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mbti-question-block">
              <div className="mbti-question-content">
                <div className="mbti-question-header">
                  <div className="mbti-question-number">5</div>
                  <p className="mbti-question-text">Перебуваючи в компанії, Ви зазвичай:</p>
                </div>
                <div className="mbti-answer-options">
                  <label className={`mbti-answer-option ${selectedAnswerFifth === 0 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-5"
                      value="0"
                      checked={selectedAnswerFifth === 0}
                      onChange={() => setSelectedAnswerFifth(0)}
                    />
                    <span>Приєднуєтесь до загальної розмови</span>
                  </label>
                  <label className={`mbti-answer-option ${selectedAnswerFifth === 1 ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="question-5"
                      value="1"
                      checked={selectedAnswerFifth === 1}
                      onChange={() => setSelectedAnswerFifth(1)}
                    />
                    <span>Бесідуєте час від часу з кимось одним</span>
                  </label>
                </div>

                <div className="mbti-navigation">
                  <button type="button" className="mbti-nav-button" disabled>
                    ← попередній блок
                  </button>
                  <button type="button" className="mbti-nav-button">
                    наступний блок →
                  </button>
                </div>
              </div>
            </div>

          <button
            type="button"
            className="mbti-results-toggle"
            onClick={() => setShowResults((prev) => !prev)}
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

          {showResults && (
            <div className="mbti-results">
              <h2 className="mbti-results-title">Результат MBTI</h2>
              <div className="mbti-results-content">
                <div className="mbti-results-image">
                  <img src={mbtiResultImageUrl} alt="Менеджер" />
                </div>
                <div className="mbti-results-info">
                  <p className="mbti-result-role">Менеджер</p>
                  <p className="mbti-result-type">
                    <strong>ESTJ:</strong> екстраверт, сенсорик, логік, раціонал
                  </p>
                  <p className="mbti-result-text">
                    Працездатний співробітник, який сприймає світ «таким, яким він є». Він схильний планувати і доводити
                    до кінця початі справи. Піклується про близьке оточення, доброзичливий, але в той же час може бути
                    запальним, різким, а іноді й впертим.
                  </p>
                  <p className="mbti-result-profession">
                    <strong>ПРОФЕСІЇ:</strong> CEO, COO, Project Manager (керівні посади).
                  </p>
                  <button
                    type="button"
                    className={`mbti-save-button ${isResultSaved ? 'saved' : ''}`}
                    onClick={() => setIsResultSaved(true)}
                  >
                    Зберегти результат
                  </button>
                  {isResultSaved && (
                    <p className="mbti-save-confirmation">Результат збережено в особистому кабінеті</p>
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

