import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../layout';
import './Enneagram.css';
import { getAssetUrl } from '../../../utils/assetPath';
import { enneagramQuestions } from './enneagramQuestions';
import { enneagramResults } from './enneagramResults';

const robotImageUrl = getAssetUrl('_assets/images/robot_img_2.png');
const enneagramDiagramUrl = getAssetUrl('_assets/images/enneagram_img.png');
const enneagramBubbleBackground = getAssetUrl('_assets/images/borders/eneagrama_border.png');

export function EnneagramPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isShownResult, setIsShownResult] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('auto');

  const generalQuestions = enneagramQuestions.length;
  const speechBubbleStyle = { backgroundImage: `url(${enneagramBubbleBackground})` };

  useEffect(() => {
    if (isShownResult && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isShownResult]);

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

  const resultType = Object.keys(scores).reduce((a, b) =>
    scores[Number(a)] > scores[Number(b)] ? a : b,
  );

  const enneagramResultData = enneagramResults.find((result) => result.type === Number(resultType));

  useEffect(() => {
    if (enneagramResultData) {
      const imagePath = getAssetUrl(
        `_assets/images/enneagrama_answers/${enneagramResultData.type}.png`,
      );
      setImageSrc(imagePath);
    }
  }, [enneagramResultData]);

  const isFinished = currentQuestion === generalQuestions - 1 && userAnswers[currentQuestion];
  const currentQuestionData = enneagramQuestions[currentQuestion];

  return (
    <div className="enneagram-page">
      <Sidebar />
      <main className="enneagram-main">
        <div className="enneagram-content">
          {/* Вводная секция */}
          <section className="enneagram-intro-section">
            <h1 className="enneagram-title">Енеаграма</h1>
            <div className="enneagram-description">
              <p>
                <strong>Енеаграма</strong> – це психологічна модель, що описує 9 глибинних мотивів,
                які керують нами на підсвідомому рівні.
              </p>
            </div>
          </section>

          {/* Секция с роботом, бордером и диаграммой */}
          <section className="enneagram-main-section">
            <div className="enneagram-robot-image">
              <img src={robotImageUrl} alt="Robot" />
            </div>
            <div className="enneagram-speech-bubble" style={speechBubbleStyle}>
              <p>
                Кожен із 9 мотивів породжує цілком
                <br />
                певний характер, з властивими йому
                <br />
                розумовими стратегіями, емоційними
                <br />
                реакціями та життєвими установками.
                <br />
                <strong>
                  Щоб визначити свій еннеа-тип,
                  <br />
                  пройди тестування
                </strong>
              </p>
            </div>
            <div className="enneagram-diagram-container">
              <img src={enneagramDiagramUrl} alt="Енеаграма" className="enneagram-diagram" />
            </div>
          </section>

          {/* Секция с вопросами */}
          <section className="enneagram-question-section-wrapper">
            <div className="enneagram-header">
              <button className="enneagram-back-button" onClick={() => navigate('/tests')}>
                Назад
              </button>
              <div className="enneagram-counter">
                <span>
                  Питання {currentQuestion} / {generalQuestions} (
                  {Math.round((currentQuestion / generalQuestions) * 100)}%)
                </span>
                <div
                  className="enneagram-progress-bar"
                  style={{ width: `${(currentQuestion / generalQuestions) * 100}%` }}
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
                      fill="#262626"
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

          {isShownResult && enneagramResultData && (
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
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
