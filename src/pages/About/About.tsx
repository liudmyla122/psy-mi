import { useNavigate } from 'react-router-dom';
import { Header } from '../../layout';
import './About.css';
import { getAssetUrl } from '../../utils/assetPath';
import { useLocalization } from '../../context/LocalizationContext';

const aboutAssets = {
  robot: getAssetUrl('_assets/images/smileRobot.png'),
  bannerLeft: getAssetUrl('_assets/images/pro proekt img/levo-img.svg'),
  bannerRight: getAssetUrl('_assets/images/pro proekt img/pravo-img.svg'),
  logos: {
    mage: getAssetUrl('_assets/images/home/logos/mage.svg'),
    kitrum: getAssetUrl('_assets/images/home/logos/kitrum.svg'),
    svet: getAssetUrl('_assets/images/home/logos/svet.svg'),
    monolith: getAssetUrl('_assets/images/home/logos/monolith.svg'),
    earPlugs: getAssetUrl('_assets/images/home/logos/ear_plugs.svg'),
  },
  slide: getAssetUrl('_assets/images/pro%20proekt%20img/img1.svg'),
  clients: {
    client1: getAssetUrl('_assets/images/home/clients/client_1.svg'),
    client2: getAssetUrl('_assets/images/home/clients/client_2.svg'),
    client3: getAssetUrl('_assets/images/home/clients/client_3.svg'),
    client4: getAssetUrl('_assets/images/home/clients/client_4.svg'),
  },
};

export function AboutPage() {
  const navigate = useNavigate();
  const { t } = useLocalization();

  return (
    <div className="about-page">
      <Header />
      <main className="about-main">
        <div className="about-content">
          {/* Header section */}
          <section className="about-header-section">
            <div className="about-banner-wrapper">
              <img src={aboutAssets.bannerLeft} alt="" className="about-banner-bg-left" />

              <div className="about-header-content">
                <h1 className="about-main-title">
                  <span className="about-title-psy">PSY</span>
                  <span className="about-title-mi">MI</span>
                </h1>
                <h2 className="about-subtitle">{t('about.subtitle')}</h2>
                <div className="about-description-box">
                  <p>{t('about.description')}</p>
                </div>
                <div className="about-header-buttons">
                  <button
                    className="about-button about-button-test"
                    onClick={() => navigate('/tests')}
                  >
                    {t('about.takeTest')}
                  </button>
                  <button
                    className="about-button about-button-login"
                    onClick={() => navigate('/register')}
                  >
                    {t('header.login')}
                  </button>
                </div>
              </div>

              <div className="about-banner-right-container">
                <img src={aboutAssets.bannerRight} alt="" className="about-banner-bg-right" />
              </div>
              <img src={aboutAssets.robot} alt="PSY MI Robot" className="about-robot-image" />
            </div>
          </section>

          {/* Trusted by us section */}
          <section className="about-section about-section-trusted">
            <div className="about-section-title">{t('about.trustedBy')}</div>
            <div className="about-logos-container">
              <div className="about-logo-card">
                <img src={aboutAssets.logos.mage} alt="logo" />
              </div>
              <div className="about-logo-card">
                <img src={aboutAssets.logos.kitrum} alt="logo" />
              </div>
              <div className="about-logo-card">
                <img src={aboutAssets.logos.svet} alt="logo" />
              </div>
              <div className="about-logo-card">
                <img src={aboutAssets.logos.monolith} alt="logo" />
              </div>
              <div className="about-logo-card">
                <img src={aboutAssets.logos.earPlugs} alt="logo" />
              </div>
            </div>
          </section>

          {/* About the platform section */}
          <section className="about-section about-section-platform">
            <div className="about-section-title">{t('about.aboutPlatform')}</div>
            <div className="about-platform-container">
              <div className="about-platform-left">
                <div className="about-platform-description">
                  <span className="about-platform-name">PSY MI</span> {t('about.platformDesc')}
                </div>
                <img src={aboutAssets.slide} alt="slide" className="about-platform-image" />
              </div>
              <div className="about-platform-right">
                <div className="about-feature-card">
                  <div className="about-feature-title">{t('about.methodologies.title')}</div>
                  <p className="about-feature-text">{t('about.methodologies.text')}</p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-title">{t('about.flexibility.title')}</div>
                  <p className="about-feature-text">{t('about.flexibility.text')}</p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-title">{t('about.analytics.title')}</div>
                  <p className="about-feature-text">{t('about.analytics.text')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Clients section */}
          <section className="about-section about-section-clients">
            <div className="about-section-title">{t('about.clients')}</div>
            <div className="about-clients-container">
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client3} alt="client" />
                </div>
                <p className="about-client-label">{t('about.client.business')}</p>
              </div>
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client1} alt="client" />
                </div>
                <p className="about-client-label">{t('about.client.hr')}</p>
              </div>
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client2} alt="client" />
                </div>
                <p className="about-client-label">{t('about.client.psychologists')}</p>
              </div>
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client4} alt="client" />
                </div>
                <p className="about-client-label">{t('about.client.agencies')}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
