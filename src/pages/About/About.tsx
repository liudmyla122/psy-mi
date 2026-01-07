import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../layout';
import './About.css';
import { getAssetUrl } from '../../utils/assetPath';

const aboutAssets = {
  robot: getAssetUrl('_assets/images/smileRobot.png'),
  logos: {
    mage: getAssetUrl('_assets/images/home/logos/mage.svg'),
    kitrum: getAssetUrl('_assets/images/home/logos/kitrum.svg'),
    svet: getAssetUrl('_assets/images/home/logos/svet.svg'),
    monolith: getAssetUrl('_assets/images/home/logos/monolith.svg'),
    earPlugs: getAssetUrl('_assets/images/home/logos/ear_plugs.svg'),
  },
  slide: getAssetUrl('_assets/images/home/slide.png'),
  clients: {
    client1: getAssetUrl('_assets/images/home/clients/client_1.svg'),
    client2: getAssetUrl('_assets/images/home/clients/client_2.svg'),
    client3: getAssetUrl('_assets/images/home/clients/client_3.svg'),
    client4: getAssetUrl('_assets/images/home/clients/client_4.svg'),
  },
};

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Sidebar />
      <main className="about-main">
        <div className="about-content">
          {/* Header section */}
          <section className="about-header-section">
            <div className="about-header-content">
              <div className="about-header-left">
                <h1 className="about-main-title">
                  <span className="about-title-psy">PSY</span>
                  <span className="about-title-mi">MI</span>
                </h1>
                <h2 className="about-subtitle">INNOVATIVE PSYCHOLOGICAL PLATFORM</h2>
                <div className="about-description-box">
                  <p>The first platform in Ukraine that enhances business processes and strengthens teams</p>
                </div>
                <div className="about-header-buttons">
                  <button 
                    className="about-button about-button-registration"
                    onClick={() => navigate('/register')}
                  >
                    REGISTRATION
                  </button>
                  <button 
                    className="about-button about-button-test"
                    onClick={() => navigate('/tests')}
                  >
                    TAKE THE TEST
                  </button>
                </div>
              </div>
              <div className="about-header-right">
                <img 
                  src={aboutAssets.robot} 
                  alt="PSY MI Robot" 
                  className="about-robot-image"
                />
              </div>
            </div>
          </section>

          {/* Trusted by us section */}
          <section className="about-section about-section-trusted">
            <div className="about-section-title">Trusted by us:</div>
            <div className="about-logos-container">
              <div className="about-logos-row">
                <div className="about-logo-card">
                  <img src={aboutAssets.logos.mage} alt="logo" />
                </div>
                <div className="about-logo-card">
                  <img src={aboutAssets.logos.kitrum} alt="logo" />
                </div>
              </div>
              <div className="about-logos-row">
                <div className="about-logo-card">
                  <img src={aboutAssets.logos.svet} alt="logo" />
                </div>
                <div className="about-logo-card">
                  <img src={aboutAssets.logos.monolith} alt="logo" />
                </div>
              </div>
              <div className="about-logos-row">
                <div className="about-logo-card about-logo-card-single">
                  <img src={aboutAssets.logos.earPlugs} alt="logo" />
                </div>
              </div>
            </div>
          </section>

          {/* About the platform section */}
          <section className="about-section about-section-platform">
            <div className="about-section-title">About the platform:</div>
            <div className="about-platform-container">
              <div className="about-platform-left">
                <div className="about-platform-description">
                  <span className="about-platform-name">PSY MI</span> — a reliable tool for hiring and talent development. It identifies strengths, areas for growth, builds effective teams, and helps make informed decisions while adapting to business needs.
                </div>
                <img 
                  src={aboutAssets.slide} 
                  alt="slide" 
                  className="about-platform-image"
                />
              </div>
              <div className="about-platform-right">
                <div className="about-feature-card">
                  <div className="about-feature-title">Proven methodologies</div>
                  <p className="about-feature-text">Methodologies that prove their effectiveness in practice.</p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-title">In-depth analytics</div>
                  <p className="about-feature-text">Detailed analysis for making precise decisions.</p>
                </div>
                <div className="about-feature-card">
                  <div className="about-feature-title">Flexibility in application</div>
                  <p className="about-feature-text">Tools tailored to business needs.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Clients section */}
          <section className="about-section about-section-clients">
            <div className="about-section-title">Our Clients:</div>
            <div className="about-clients-container">
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client3} alt="client" />
                </div>
                <p className="about-client-label">Business Owners & Top Management</p>
              </div>
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client1} alt="client" />
                </div>
                <p className="about-client-label">HR & Recruiting Departments</p>
              </div>
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client2} alt="client" />
                </div>
                <p className="about-client-label">Psychologists & Business Coaches</p>
              </div>
              <div className="about-client-item">
                <div className="about-client-icon">
                  <img src={aboutAssets.clients.client4} alt="client" />
                </div>
                <p className="about-client-label">HR & Recruiting Agencies</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

