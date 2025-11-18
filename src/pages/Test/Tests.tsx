import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../../layout';
import './Tests.css';

type TestCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'in_development';
};

const testCards: TestCard[] = [
  {
    id: '1',
    title: 'Тест Адізеса',
    description: 'В основі методики лежить PAEI-концепція, згід...',
    icon: (
      <img 
        src="/_assets/images/tests/paei_banner.png" 
        alt="Тест Адізеса" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'available',
  },
  {
    id: '2',
    title: 'Енеаграма',
    description: 'Енеаграма - це психологічна модель, яка розкриває дев\'ять типів особистості та їх взаємозв\'язки.',
    icon: (
      <img 
        src="/_assets/images/tests/enneagram_banner.png" 
        alt="Енеаграма" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'available',
  },
  {
    id: '3',
    title: 'Тест МВІ',
    description: 'Тест МВІ розроблений для оцінки рівня вигорання. Він допомагає визначити емоційне виснаження та стрес.',
    icon: (
      <img 
        src="/_assets/images/tests/MBI_banner.svg" 
        alt="Тест МВІ" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'available',
  },
  {
    id: '4',
    title: 'Інноваційний потенціал',
    description: 'Тест дозволяє виявити, наскільки ви відкриті до нових ідей та готові до інновацій.',
    icon: (
      <img 
        src="/_assets/images/tests/ipi_banner.png" 
        alt="Інноваційний потенціал" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'available',
  },
  {
    id: '5',
    title: 'Емоційний інтелект',
    description: 'Тест на емоційний інтелект демонструє, як ви розумієте та керуєте емоціями.',
    icon: (
      <img 
        src="/_assets/images/tests/EmotionalIntelligence_banner.svg" 
        alt="Емоційний інтелект" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'available',
  },
  {
    id: '6',
    title: 'Тест МВТІ',
    description: 'МВТІ широко використовується для самопізнання та розуміння своїх переваг у роботі.',
    icon: (
      <img 
        src="/_assets/images/tests/MBTI_banner.svg" 
        alt="Тест МВТІ" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'available',
  },
  {
    id: '7',
    title: 'Духовний інтелект',
    description: 'Тест на духовний інтелект допоможе зрозуміти, як ви сприймаєте духовні аспекти життя.',
    icon: (
      <img 
        src="/_assets/images/tests/SpiritualIntelligence_banner.svg" 
        alt="Духовний інтелект" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'in_development',
  },
  {
    id: '8',
    title: 'Новий тест',
    description: '',
    icon: (
      <img 
        src="/_assets/images/tests/newTest_banner.svg" 
        alt="Новий тест" 
        className="w-full h-full object-cover"
      />
    ),
    status: 'in_development',
  },
];

export function TestsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cards, setCards] = useState(testCards);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverCard, setDragOverCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем размер экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Функция для получения пути к странице теста в зависимости от ID теста и языка
  const getTestPath = (testId: string) => {
    const currentPath = location.pathname;
    
    // Определяем базовый путь для каждого теста
    let basePath = '';
    
    switch (testId) {
      case '1':
        basePath = '/test/adizes';
        break;
      case '2':
        basePath = '/test/enneagram';
        break;
      case '3':
        basePath = '/test/mbi';
        break;
      case '4':
        basePath = '/test/innovation-potential';
        break;
      case '5':
        basePath = '/emotional-intelligence';
        break;
      case '6':
        basePath = '/test/mbti';
        break;
      default:
        basePath = `/test/${testId}`;
    }
    
    // Добавляем префикс языка если нужно
    if (currentPath.startsWith('/ua/')) {
      return `/ua${basePath}`;
    } else if (currentPath.startsWith('/en/')) {
      return `/en${basePath}`;
    }
    
    return basePath;
  };

  // Обработчик клика для каждой кнопки теста
  const handleTestClick = (testId: string, isAvailable: boolean) => {
    if (isAvailable) {
      const targetPath = getTestPath(testId);
      navigate(targetPath);
    }
  };

  // Обработчики drag and drop (только для мобильных экранов)
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    if (isMobile) {
      setDraggedCard(cardId);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', cardId);
      // Делаем карточку полупрозрачной при перетаскивании
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget.style.opacity = '0.5';
      }
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (isMobile) {
      setDraggedCard(null);
      setDragOverCard(null);
      // Возвращаем непрозрачность
      if (e.currentTarget instanceof HTMLElement) {
        e.currentTarget.style.opacity = '1';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, cardId: string) => {
    if (isMobile) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (draggedCard && draggedCard !== cardId) {
        setDragOverCard(cardId);
      }
    }
  };

  const handleDragLeave = () => {
    if (isMobile) {
      setDragOverCard(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    if (isMobile) {
      e.preventDefault();
      if (!draggedCard || draggedCard === targetCardId) {
        setDragOverCard(null);
        return;
      }

      const draggedIndex = cards.findIndex(card => card.id === draggedCard);
      const targetIndex = cards.findIndex(card => card.id === targetCardId);

      if (draggedIndex === -1 || targetIndex === -1) {
        setDragOverCard(null);
        return;
      }

      const newCards = [...cards];
      const [removed] = newCards.splice(draggedIndex, 1);
      newCards.splice(targetIndex, 0, removed);

      setCards(newCards);
      setDragOverCard(null);
      setDraggedCard(null);
    }
  };

  const navItems = [
    { 
      label: 'Про проект', 
      href: '/about', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 11 12" fill="none">
          <path d="M4 11V7.19602C4 6.84587 4.26863 6.56202 4.6 6.56202H6.4C6.73137 6.56202 7 6.84587 7 7.19602V11M5.15229 1.11732L1.25229 4.04779C1.09401 4.16672 1 4.35925 1 4.56447V10.049C1 10.5742 1.40294 11 1.9 11H9.1C9.59706 11 10 10.5742 10 10.049V4.56447C10 4.35925 9.90599 4.16672 9.74771 4.04779L5.84771 1.11732C5.63954 0.960894 5.36046 0.960894 5.15229 1.11732Z" stroke="currentColor" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      label: 'Статті', 
      href: '/articles', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      label: 'Пройти тестування', 
      href: '/tests', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 13 13" fill="none">
          <path d="M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C7.36292 1 8.17943 1.19873 8.90625 1.55291M10.9688 3.0625L6.15625 7.875L4.78125 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ), 
      active: true 
    },
    { 
      label: 'Мій профіль', 
      href: '/my-profile', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
  ];

  return (
    <div className="tests-page">
      <Sidebar />
      
      <main className="tests-main">
        <div className="tests-grid">
          {cards.map((test)=> (
            <div 
              key={test.id} 
              className={`test-card ${test.status === 'in_development' ? 'test-card--blurred' : ''} ${draggedCard === test.id ? 'test-card--dragging' : ''} ${dragOverCard === test.id ? 'test-card--drag-over' : ''}`}
              draggable={isMobile}
              onDragStart={(e) => handleDragStart(e, test.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, test.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, test.id)}
            >
              <div className={`test-card-icon ${test.id === '3' ? 'test-card-icon--mbi' : ''} ${test.id === '4' ? 'test-card-icon--ipi' : ''} ${test.id === '5' ? 'test-card-icon--ei' : ''} ${test.id === '6' ? 'test-card-icon--mbti' : ''} ${test.id === '7' ? 'test-card-icon--si' : ''} ${test.id === '8' ? 'test-card-icon--new' : ''}`}>
                {test.icon}
              </div>
              <div className="test-card-content">
                <h3 className="test-card-title">{test.title}</h3>
                {test.description && (
                  <p className="test-card-description">{test.description}</p>
                )}
                <button
                  type="button"
                  className={`test-card-button ${test.status === 'available' ? 'test-card-button--available' : 'test-card-button--disabled'}`}
                  disabled={test.status === 'in_development'}
                  onClick={() => handleTestClick(test.id, test.status === 'available')}
                >
                  {test.status === 'available' ? 'Пройти тестування' : 'Тест в розробці'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Мобильная нижняя навигация - только для мобильных */}
      {isMobile && (
        <nav className="mobile-bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`mobile-nav-item ${item.active ? 'mobile-nav-item--active' : ''}`}
            onClick={() => navigate(item.href)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
        <button
          type="button"
          className="mobile-nav-item mobile-nav-item--flag"
          onClick={() => {}}
        >
          <span className="mobile-nav-icon mobile-nav-flag">🇺🇦</span>
        </button>
        </nav>
      )}
    </div>
  );
}
