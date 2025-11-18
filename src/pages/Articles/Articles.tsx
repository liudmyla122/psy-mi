import { useState, useEffect } from 'react';
import { Sidebar } from '../../layout';
import './Articles.css';

const articles = [
  {
    id: 1,
    title: '7 key trends in management in 2024',
    tags: ['#HR', '#business'],
    thumbnailType: 'trends',
    url: 'https://medium.com/@mi.agency/7-key-trends-in-management-in-2024-5620da3a7111',
    imageUrl: '/output/1_mop.png',
  },
  {
    id: 2,
    title: 'The role of social networks in recruiting and buil...',
    tags: ['#HR', '#business'],
    thumbnailType: 'social',
    url: 'https://medium.com/@mi.agency/the-role-of-social-networks-in-recruiting-and-building-a-company-brand-f185797d53f7',
    imageUrl: '/output/2.png',
  },
  {
    id: 3,
    title: 'Development of an effective Employer Branding stra...',
    tags: ['#HR', '#business'],
    thumbnailType: 'branding',
    url: 'https://medium.com/@mi.agency/development-of-an-effective-employer-branding-strategy-to-increase-the-employers-competitiveness-b77cacd0e0bb',
    imageUrl: '/output/3.png',
  },
  {
    id: 4,
    title: 'HR tools that promote team productivity',
    tags: ['#HR', '#business'],
    thumbnailType: 'tools',
    url: 'https://medium.com/@mi.agency/hr-tools-that-promote-team-productivity-c5fb633f87f9',
    imageUrl: '/output/4.png',
  },
];

export function ArticlesPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<string[]>([]);
  const [selectedSphere, setSelectedSphere] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [articleImages, setArticleImages] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchArticleImage = async (articleId: number, url: string) => {
      try {
        // Пробуем получить через oEmbed API Medium
        try {
          const oembedUrl = `https://medium.com/oembed?url=${encodeURIComponent(url)}&format=json`;
          const oembedResponse = await fetch(oembedUrl);
          if (oembedResponse.ok) {
            const oembedData = await oembedResponse.json();
            if (oembedData.thumbnail_url) {
              setArticleImages(prev => ({ ...prev, [articleId]: oembedData.thumbnail_url }));
              return;
            }
          }
        } catch (e) {
          // Продолжаем с fallback методом
        }

        // Fallback: используем прокси для получения og:image
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const html = data.contents;
        const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/) || 
                           html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
        if (ogImageMatch && ogImageMatch[1]) {
          setArticleImages(prev => ({ ...prev, [articleId]: ogImageMatch[1] }));
        }
      } catch (error) {
        console.error('Failed to fetch article image:', error);
      }
    };

    articles.forEach(article => {
      if (article.url && article.id === 1) {
        fetchArticleImage(article.id, article.url);
      }
    });
  }, []);

  const resourceOptions = ['Medium', 'LinkedIn'];
  const sphereOptions = ['IT', 'HR', 'Psychology', 'Management', 'Brand', 'Business', 'AI'];
  const languageOptions = ['Ukrainian', 'English'];

  const toggleResource = (option: string) => {
    setSelectedResource(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const toggleSphere = (option: string) => {
    setSelectedSphere(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const toggleLanguage = (option: string) => {
    setSelectedLanguage(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const removeResource = (option: string) => {
    setSelectedResource(prev => prev.filter(item => item !== option));
  };

  const removeSphere = (option: string) => {
    setSelectedSphere(prev => prev.filter(item => item !== option));
  };

  const removeLanguage = (option: string) => {
    setSelectedLanguage(prev => prev.filter(item => item !== option));
  };

  return (
    <div className="articles-page">
      <Sidebar />
      <main className="articles-main">
        <div className="articles-content">
          {/* Filters section */}
          <div className="articles-filters">
            <div 
              className="filter-dropdown"
              onMouseEnter={() => setOpenDropdown('resource')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="filter-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke="#000000" strokeWidth="1" fill="none"/>
                  <path d="M8 5L11 9H5L8 5Z" fill="#000000"/>
                </svg>
              </div>
              <div className="filter-selected-tags">
                {selectedResource.length === 0 ? (
                  <span>Resource</span>
                ) : selectedResource.length === 1 ? (
                  <span>{selectedResource[0]}</span>
                ) : (
                  <span>+ {selectedResource.length} ...</span>
                )}
              </div>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 1L4 4L7 1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {openDropdown === 'resource' && (
                <div 
                  className="dropdown-menu"
                  onMouseEnter={() => setOpenDropdown('resource')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {resourceOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${selectedResource.includes(option) ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleResource(option);
                      }}
                    >
                      <span>{option}</span>
                      {selectedResource.includes(option) && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="checkmark-icon">
                          <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#347AEC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {openDropdown === 'resource' && selectedResource.length > 0 && (
                <div className="selected-tags-container">
                  {selectedResource.map((option) => (
                    <div key={option} className="selected-tag">
                      <span>{option}</span>
                      <button
                        className="tag-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeResource(option);
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div 
              className="filter-dropdown"
              onMouseEnter={() => setOpenDropdown('sphere')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="filter-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke="#000000" strokeWidth="1" fill="none"/>
                  <path d="M8 5L11 9H5L8 5Z" fill="#000000"/>
                </svg>
              </div>
              <div className="filter-selected-tags">
                {selectedSphere.length === 0 ? (
                  <span>Sphere</span>
                ) : selectedSphere.length === 1 ? (
                  <span>{selectedSphere[0]}</span>
                ) : (
                  <span>+ {selectedSphere.length} ...</span>
                )}
              </div>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 1L4 4L7 1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {openDropdown === 'sphere' && (
                <div 
                  className="dropdown-menu"
                  onMouseEnter={() => setOpenDropdown('sphere')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {sphereOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${selectedSphere.includes(option) ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSphere(option);
                      }}
                    >
                      <span>{option}</span>
                      {selectedSphere.includes(option) && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="checkmark-icon">
                          <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#347AEC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {openDropdown === 'sphere' && selectedSphere.length > 0 && (
                <div className="selected-tags-container">
                  {selectedSphere.map((option) => (
                    <div key={option} className="selected-tag">
                      <span>{option}</span>
                      <button
                        className="tag-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSphere(option);
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div 
              className="filter-dropdown"
              onMouseEnter={() => setOpenDropdown('language')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="filter-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke="#000000" strokeWidth="1" fill="none"/>
                  <path d="M8 5L11 9H5L8 5Z" fill="#000000"/>
                </svg>
              </div>
              <div className="filter-selected-tags">
                {selectedLanguage.length === 0 ? (
                  <span>Language</span>
                ) : selectedLanguage.length === 1 ? (
                  <span>{selectedLanguage[0]}</span>
                ) : (
                  <span>+ {selectedLanguage.length} ...</span>
                )}
              </div>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 1L4 4L7 1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {openDropdown === 'language' && (
                <div 
                  className="dropdown-menu"
                  onMouseEnter={() => setOpenDropdown('language')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {languageOptions.map((option) => (
                    <div
                      key={option}
                      className={`dropdown-item ${selectedLanguage.includes(option) ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLanguage(option);
                      }}
                    >
                      <span>{option}</span>
                      {selectedLanguage.includes(option) && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="checkmark-icon">
                          <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#347AEC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {openDropdown === 'language' && selectedLanguage.length > 0 && (
                <div className="selected-tags-container">
                  {selectedLanguage.map((option) => (
                    <div key={option} className="selected-tag">
                      <span>{option}</span>
                      <button
                        className="tag-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLanguage(option);
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Articles grid */}
          <div className="articles-grid">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="article-card"
                onClick={() => article.url && window.open(article.url, '_blank')}
              >
                <div className={`article-thumbnail article-thumbnail-${article.thumbnailType}`}>
                  <div className="article-logo">
                    <div className="logo-circle">
                      <span className="logo-text">M</span>
                    </div>
                  </div>
                  {article.thumbnailType === 'trends' && (
                    <div className="thumbnail-content trends-content">
                      {article.imageUrl || articleImages[article.id] ? (
                        <img 
                          src={article.imageUrl || articleImages[article.id]} 
                          alt={article.title}
                          className="trends-article-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`trends-content-overlay ${(article.imageUrl || articleImages[article.id]) ? 'hidden' : ''}`}>
                        <div className="trends-background-text">management</div>
                        <div className="trends-left-section">
                          <div className="thumbnail-icon trends-icon">
                            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                              <circle cx="70" cy="70" r="55" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"/>
                              <circle cx="70" cy="70" r="40" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                              <circle cx="70" cy="70" r="25" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                              <circle cx="70" cy="70" r="10" fill="rgba(255,255,255,0.7)"/>
                              <path d="M70 20 L70 35 M70 105 L70 120 M20 70 L35 70 M105 70 L120 70" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round"/>
                              <path d="M70 20 L70 50 M70 90 L70 120 M20 70 L50 70 M90 70 L120 70" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
                              <line x1="50" y1="50" x2="65" y2="65" stroke="rgba(139,127,217,0.9)" strokeWidth="4" strokeLinecap="round"/>
                              <line x1="75" y1="75" x2="90" y2="90" stroke="rgba(139,127,217,0.9)" strokeWidth="4" strokeLinecap="round"/>
                              <line x1="90" y1="50" x2="75" y2="65" stroke="rgba(139,127,217,0.9)" strokeWidth="4" strokeLinecap="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="trends-right-section">
                          <div className="trends-text-box">
                            <span className="trends-highlight-box">7 key trends</span>
                            <span className="trends-text-rest"> in management in 2024</span>
                          </div>
                        </div>
                        <div className="trends-logo-bottom">
                          <div className="trends-logo-text">M</div>
                          <div className="trends-logo-stacked">
                            <div>AGE</div>
                            <div>NCY</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {article.thumbnailType === 'social' && (
                    <div className="thumbnail-content social-content">
                      {article.imageUrl || articleImages[article.id] ? (
                        <img 
                          src={article.imageUrl || articleImages[article.id]} 
                          alt={article.title}
                          className="social-article-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`social-content-overlay ${(article.imageUrl || articleImages[article.id]) ? 'hidden' : ''}`}>
                        <div className="thumbnail-text social-text">
                          <div className="text-large">THE ROLE OF SOCIAL NETWORKS</div>
                          <div className="text-small">IN RECRUITING and BUILDING A COMPANY BRAND</div>
                        </div>
                        <div className="social-icons-container">
                          <div className="social-icon-item">📱</div>
                          <div className="social-icon-item">💼</div>
                          <div className="social-icon-item">🌐</div>
                          <div className="social-icon-item">💡</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {article.thumbnailType === 'branding' && (
                    <div className="thumbnail-content branding-content">
                      {article.imageUrl || articleImages[article.id] ? (
                        <img 
                          src={article.imageUrl || articleImages[article.id]} 
                          alt={article.title}
                          className="branding-article-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`branding-content-overlay ${(article.imageUrl || articleImages[article.id]) ? 'hidden' : ''}`}>
                        <div className="branding-icons-top">
                          <div className="branding-icon">🧠</div>
                          <div className="branding-icon">❤️</div>
                        </div>
                        <div className="thumbnail-text branding-text">
                          <div className="text-highlight-branding">Effective <span className="highlight-strategy">strategy</span></div>
                          <div className="text-underline">EMPLOYER BRANDING</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {article.thumbnailType === 'tools' && (
                    <div className="thumbnail-content tools-content">
                      {article.imageUrl || articleImages[article.id] ? (
                        <img 
                          src={article.imageUrl || articleImages[article.id]} 
                          alt={article.title}
                          className="tools-article-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`tools-content-overlay ${(article.imageUrl || articleImages[article.id]) ? 'hidden' : ''}`}>
                        <div className="tools-box">
                          <div className="tools-text">HR tools that promote team productivity</div>
                        </div>
                        <div className="tools-cube">📦</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <div className="article-tags">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="article-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

