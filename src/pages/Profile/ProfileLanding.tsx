import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../../context/LocalizationContext';
import { getAssetUrl } from '../../utils/assetPath';
import './Profile.css';

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
  tests: {
    paei: getAssetUrl('_assets/images/tests/paei_banner.png'),
    innovation: getAssetUrl('_assets/images/tests/ipi_banner.png'),
    enneagram: getAssetUrl('_assets/images/tests/enneagram_banner.png'),
    authorRobot: getAssetUrl('_assets/images/pro proekt img/robot.svg'),
    avatars: {
      yulia: getAssetUrl('_assets/images/pro proekt img/avatar1.svg'),
      victoria: getAssetUrl('_assets/images/pro proekt img/avatar2.svg'),
    },
  },
};

export function ProfileLanding() {
  const navigate = useNavigate();
  const { t } = useLocalization();

  const handleTakeTestClick = () => {
    navigate('/tests');
  };

  return (
    <div className="profile-landing-content">
      {/* Header section */}
      <section className="profile-landing-header-section">
        <div className="profile-landing-banner-wrapper">
          <img src={aboutAssets.bannerLeft} alt="" className="profile-landing-banner-bg-left" />

          <div className="profile-landing-header-content">
            <h1 className="profile-landing-main-title">
              <span className="profile-landing-title-psy">PSY</span>
              <span className="profile-landing-title-mi">MI</span>
            </h1>
            <h2 className="profile-landing-subtitle">{t('about.subtitle')}</h2>
            <div className="profile-landing-description-box">
              <p>{t('about.description')}</p>
            </div>
            <div className="profile-landing-header-buttons">
              <button className="profile-landing-button profile-landing-button-test" onClick={handleTakeTestClick}>
                {t('about.takeTest')}
              </button>
            </div>
          </div>

          <div className="profile-landing-banner-right-container">
            <img src={aboutAssets.bannerRight} alt="" className="profile-landing-banner-bg-right" />
          </div>
          <img src={aboutAssets.robot} alt="PSY MI Robot" className="profile-landing-robot-image" />
        </div>
      </section>

      {/* Trusted by us section */}
      <section className="profile-landing-section profile-landing-section-trusted">
        <div className="profile-landing-section-title">{t('about.trustedBy')}</div>
        <div className="profile-landing-logos-container">
          <div className="profile-landing-logo-card">
            <img src={aboutAssets.logos.mage} alt="logo" />
          </div>
          <div className="profile-landing-logo-card">
            <img src={aboutAssets.logos.kitrum} alt="logo" />
          </div>
          <div className="profile-landing-logo-card">
            <img src={aboutAssets.logos.svet} alt="logo" />
          </div>
          <div className="profile-landing-logo-card">
            <img src={aboutAssets.logos.monolith} alt="logo" />
          </div>
          <div className="profile-landing-logo-card">
            <img src={aboutAssets.logos.earPlugs} alt="logo" />
          </div>
        </div>
      </section>

      {/* About the platform section */}
      <section className="profile-landing-section profile-landing-section-platform">
        <div className="profile-landing-section-title">{t('about.aboutPlatform')}</div>
        <div className="profile-landing-platform-container">
          <div className="profile-landing-platform-left">
            <div className="profile-landing-platform-description">
              <span className="profile-landing-platform-name">PSY MI</span> {t('about.platformDesc')}
            </div>
            <img src={aboutAssets.slide} alt="slide" className="profile-landing-platform-image" />
          </div>
          <div className="profile-landing-platform-right">
            <div className="profile-landing-feature-card">
              <div className="profile-landing-feature-title">{t('about.methodologies.title')}</div>
              <p className="profile-landing-feature-text">{t('about.methodologies.text')}</p>
            </div>
            <div className="profile-landing-feature-card">
              <div className="profile-landing-feature-title">{t('about.flexibility.title')}</div>
              <p className="profile-landing-feature-text">{t('about.flexibility.text')}</p>
            </div>
            <div className="profile-landing-feature-card">
              <div className="profile-landing-feature-title">{t('about.analytics.title')}</div>
              <p className="profile-landing-feature-text">{t('about.analytics.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients section */}
      <section className="profile-landing-section profile-landing-section-clients">
        <div className="profile-landing-section-title">{t('about.clients')}</div>
        <div className="profile-landing-clients-container">
          <div className="profile-landing-client-item">
            <div className="profile-landing-client-icon">
              <img src={aboutAssets.clients.client3} alt="client" />
            </div>
            <p className="profile-landing-client-label">{t('about.client.business')}</p>
          </div>
          <div className="profile-landing-client-item">
            <div className="profile-landing-client-icon">
              <img src={aboutAssets.clients.client1} alt="client" />
            </div>
            <p className="profile-landing-client-label">{t('about.client.hr')}</p>
          </div>
          <div className="profile-landing-client-item">
            <div className="profile-landing-client-icon">
              <img src={aboutAssets.clients.client2} alt="client" />
            </div>
            <p className="profile-landing-client-label">{t('about.client.psychologists')}</p>
          </div>
          <div className="profile-landing-client-item">
            <div className="profile-landing-client-icon">
              <img src={aboutAssets.clients.client4} alt="client" />
            </div>
            <p className="profile-landing-client-label">{t('about.client.agencies')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
