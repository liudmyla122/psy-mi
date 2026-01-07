import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../../../layout';
import { getAssetUrl } from '../../../utils/assetPath';
import './InnovationPotential.css';

export function InnovationPotentialResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedResult, setSavedResult] = useState<any>(null);

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

  const scoreStr = savedResult.score || '';
  const scoreMatch = scoreStr.match(/(\d+)/);
  const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

  // Определяем уровень результата
  let resultLevel: { range: string; level: string; image: string; text: string } | null = null;
  if (score >= 164) {
    resultLevel = {
      range: '164 і більше',
      level: 'ВИСОКИЙ РІВЕНЬ',
      image: getAssetUrl('_assets/images/ipi_answers/high.png'),
      text: 'Відображає високий рівень здатності до інтеграції знань, навичок та креативних здібностей для досягнення результатів. Характеризуються здатністю ефективно поєднувати різні аспекти діяльності, швидко адаптуватися до змін та створювати інноваційні рішення навіть у складних умовах.',
    };
  } else if (score >= 91 && score <= 163) {
    resultLevel = {
      range: 'Від 91 до 163',
      level: 'ОПТИМАЛЬНИЙ РІВЕНЬ',
      image: getAssetUrl('_assets/images/ipi_answers/optimal.png'),
      text: 'Відображає збалансоване поєднання стабільності та відкритості до нововведень. Інновації розглядаються як можливість розвитку, але їх впровадження ґрунтується на раціональності та реальній потребі.',
    };
  } else {
    resultLevel = {
      range: '90 і менше',
      level: 'НИЗЬКИЙ РІВЕНЬ',
      image: getAssetUrl('_assets/images/ipi_answers/low.png'),
      text: 'Відображає орієнтацію на традиційні підходи та рутинні завдання, із можливими труднощами у впровадженні нових ідей. Інновації можуть викликати опір або залишатися поза увагою через низький рівень поєднання знань, навичок і креативності.',
    };
  }

  const integrativeMax = 210;
  const integrativePercent = Math.min(100, Math.round((score / integrativeMax) * 100));

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

  return (
    <div className="innovation-potential-page">
      <Sidebar />
      <main className="innovation-potential-main">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {/* Заголовок */}
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
                marginBottom: '1rem',
                textDecoration: 'none'
              }}
            >
              ← Назад до профілю
            </button>
            <h1 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              color: '#262626',
              marginBottom: '0.5rem'
            }}>
              Інноваційний потенціал особистості
            </h1>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              color: '#666',
              marginBottom: '1rem'
            }}>
              Дата проходження: {formatDate(savedResult.completedAt)}
            </p>
          </div>

          {/* Карточка результата */}
          <div style={{
            background: 'transparent',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '2rem',
              alignItems: 'flex-start'
            }}>
              <div style={{ flexShrink: 0 }}>
                <img 
                  src={resultLevel.image} 
                  alt={resultLevel.level}
                  style={{ width: '200px', height: 'auto' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#262626',
                  marginBottom: '1rem'
                }}>
                  {resultLevel.range}: <span style={{ color: '#347AEC' }}>{resultLevel.level}</span>
                </h3>
                <p style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#262626',
                  lineHeight: '1.6',
                  textAlign: 'justify'
                }}>
                  {resultLevel.text}
                </p>
              </div>
            </div>

            {/* Интегративный уровень */}
            <div style={{
              background: 'transparent',
              borderRadius: '12px',
              padding: '1.5rem',
              marginTop: '1rem'
            }}>
              <h4 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#262626',
                marginBottom: '1rem'
              }}>
                Інтегративний рівень інноваційного потенціалу
              </h4>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#262626'
                  }}>
                    {score}
                  </span>
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#262626'
                  }}>
                    {integrativeMax}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '20px',
                  background: '#e5e7eb',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${integrativePercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #347AEC 0%, #6764E7 100%)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#666',
                marginTop: '0.5rem'
              }}>
                Шкала оцінює <strong>загальний рівень здатності до інтеграції різних аспектів</strong> своєї діяльності з метою впровадження інновацій.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

