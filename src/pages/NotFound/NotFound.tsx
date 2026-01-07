import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../layout';
import { getAssetUrl } from '../../utils/assetPath';
import './NotFound.css';

const sadRobotImageUrl = getAssetUrl('_assets/images/sadRobot.svg');

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Sidebar />
      <main className="not-found-main">
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="not-found-robot">
              <img src={sadRobotImageUrl} alt="Sad Robot" className="not-found-robot-image" />
            </div>
            <div className="not-found-text">
              <h1 className="not-found-title">404</h1>
              <h2 className="not-found-subtitle">Сторінку не знайдено</h2>
              <p className="not-found-description">
                Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
              </p>
              <div className="not-found-buttons">
                <button
                  type="button"
                  className="not-found-button not-found-button-primary"
                  onClick={() => navigate('/register')}
                >
                  На головну
                </button>
                <button
                  type="button"
                  className="not-found-button not-found-button-secondary"
                  onClick={() => navigate(-1)}
                >
                  Назад
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}





