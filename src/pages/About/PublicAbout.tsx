import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header, Footer } from '../../layout';
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

export function PublicAbout() {
  const navigate = useNavigate();
  const { t } = useLocalization();

  useEffect(() => {
    document.title = `PSY MI | ${t('header.about')}`;
  }, [t]);

  const handleTakeTestClick = () => {
    const isLoggedIn = !!localStorage.getItem('authToken');
    if (isLoggedIn) {
      navigate('/tests');
    } else {
      navigate('/register');
    }
  };

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
                  <button className="about-button about-button-test" onClick={handleTakeTestClick}>
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

          {/* Our Tests section */}
          <section className="about-section about-section-tests" id="tests">
            <div className="about-section-title">{t('about.tests.title')}</div>
            <div className="about-tests-container">
              {/* PAEI Test Card */}
              <div className="about-test-card about-test-card-paei">
                <div className="about-test-image-container">
                  <img
                    src={aboutAssets.tests.paei}
                    alt="PAEI Test"
                    className="about-test-image-cover"
                  />
                </div>
                <div className="about-test-content">
                  <h3 className="about-test-title">{t('about.test.adizes.title')}</h3>
                  <p className="about-test-description">{t('about.test.adizes.desc')}</p>
                </div>
              </div>

              {/* Innovation Potential Test Card */}
              <div className="about-test-card about-test-card-innovation">
                <div className="about-test-image-container innovation-container">
                  <img
                    src={aboutAssets.tests.innovation}
                    alt="Innovation"
                    className="about-test-image-cover"
                  />
                </div>
                <div className="about-test-content">
                  <h3 className="about-test-title">{t('about.test.innovation.title')}</h3>
                  <p className="about-test-description">{t('about.test.innovation.desc')}</p>
                </div>
              </div>

              {/* Enneagram Test Card */}
              <div className="about-test-card about-test-card-enneagram">
                <div className="about-test-image-container enneagram-container">
                  <img
                    src={aboutAssets.tests.enneagram}
                    alt="Enneagram"
                    className="about-test-image-cover"
                  />
                </div>
                <div className="about-test-content">
                  <h3 className="about-test-title">{t('about.test.enneagram.title')}</h3>
                  <p className="about-test-description">{t('about.test.enneagram.desc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Author's Development section */}
          <section className="about-section about-section-author">
            <div className="about-author-content">
              <div className="about-author-left">
                <div className="about-author-label">{t('about.author.label')}</div>
                <h2 className="about-author-title">{t('about.test.innovation.title')}</h2>
                <p className="about-author-description">{t('about.author.description')}</p>
                <div className="about-author-buttons">
                  <button className="about-button about-button-test" onClick={handleTakeTestClick}>
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
              <div className="about-author-right">
                <div className="about-author-image-container">
                  <img
                    src={aboutAssets.tests.authorRobot}
                    alt="Author's Development"
                    className="about-author-image"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Reviews section */}
          <section className="about-section about-section-reviews" id="reviews">
            <div className="about-section-title">{t('about.reviews.title')}</div>
            <div className="about-reviews-container">
              {/* Review 1 */}
              <div className="about-review-wrapper about-review-left">
                <div className="about-review-bubble">
                  <h4 className="about-review-author">{t('about.review1.author')}</h4>
                  <div className="about-review-text">
                    {t('about.review1.text')
                      .split('\n\n')
                      .map((paragraph, index, array) => (
                        <p key={index}>
                          {paragraph}
                          {index === array.length - 1 && (
                            <span className="about-review-time">11:45</span>
                          )}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="about-review-avatar-container">
                  <img
                    src={aboutAssets.tests.avatars.yulia}
                    alt="Yulia"
                    className="about-review-avatar"
                  />
                </div>
              </div>

              {/* Review 2 */}
              <div className="about-review-wrapper about-review-right">
                <div className="about-review-bubble">
                  <h4 className="about-review-author">{t('about.review2.author')}</h4>
                  <div className="about-review-text">
                    {t('about.review2.text')
                      .split('\n')
                      .map((paragraph, index, array) => (
                        <p key={index} className={index === 0 ? 'bold-text' : ''}>
                          {index === 0 ? (
                            <>
                              <strong>Півтора місяця тому я проходила співбесіду</strong>
                              {paragraph.replace('Півтора місяця тому я проходила співбесіду', '')}
                            </>
                          ) : (
                            paragraph
                          )}
                          {index === array.length - 1 && (
                            <span className="about-review-time">11:45</span>
                          )}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="about-review-avatar-container">
                  <img
                    src={aboutAssets.tests.avatars.victoria}
                    alt="Victoria"
                    className="about-review-avatar"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
