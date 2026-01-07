// Утилита для анимаций при прокрутке страницы

export const initScrollAnimations = () => {
  let ticking = false;

  // Функция для проверки, виден ли элемент частично
  const isElementPartiallyVisible = (element: Element, threshold: number = 0.1): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    return visibleHeight > elementHeight * threshold;
  };

  // Добавляем классы анимации при скролле
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Анимация элементов с data-scroll-animate
        const elements = document.querySelectorAll('[data-scroll-animate]:not(.scroll-animated)');
        elements.forEach((element) => {
          if (isElementPartiallyVisible(element, 0.15)) {
            element.classList.add('scroll-animated');
          }
        });

        // Анимация секций
        const sections = document.querySelectorAll('.scroll-section');
        sections.forEach((section) => {
          if (isElementPartiallyVisible(section, 0.3)) {
            section.classList.add('visible');
          }
        });

        // Параллакс эффект для фона
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        const scrollY = window.scrollY || window.pageYOffset;
        parallaxElements.forEach((element) => {
          const speed = parseFloat((element as HTMLElement).dataset.parallaxSpeed || '0.5');
          (element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Добавляем класс для плавного скролла
        document.body.classList.add('is-scrolling');
        
        // Убираем класс через небольшую задержку для плавности
        clearTimeout((window as any).scrollTimeout);
        (window as any).scrollTimeout = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 150);

        ticking = false;
      });

      ticking = true;
    }
  };

  // Автоматически добавляем анимации к основным элементам
  const addAnimationsToElements = () => {
    // Добавляем анимации к карточкам тестов
    const testCards = document.querySelectorAll('.test-card');
    testCards.forEach((card, index) => {
      if (!card.hasAttribute('data-scroll-animate')) {
        card.setAttribute('data-scroll-animate', 'slide-up');
        card.setAttribute('data-scroll-delay', String(Math.min(index * 100, 300)));
      }
    });

    // Добавляем анимации к карточкам статей
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
      if (!card.hasAttribute('data-scroll-animate')) {
        card.setAttribute('data-scroll-animate', 'slide-up');
        card.setAttribute('data-scroll-delay', String(Math.min(index * 50, 200)));
      }
    });

    // Добавляем анимации к секциям профиля
    const profileSections = document.querySelectorAll('.profile-test-section-wrapper, .profile-top-section');
    profileSections.forEach((section, index) => {
      if (!section.hasAttribute('data-scroll-animate')) {
        section.setAttribute('data-scroll-animate', 'fade-in');
        section.setAttribute('data-scroll-delay', String(Math.min(index * 100, 300)));
      }
    });

    // Добавляем анимации к заголовкам
    const headings = document.querySelectorAll('h1, h2, .profile-test-section-title, .about-main-title, .about-subtitle');
    headings.forEach((heading, index) => {
      if (!heading.hasAttribute('data-scroll-animate') && !heading.closest('[data-scroll-animate]')) {
        heading.setAttribute('data-scroll-animate', 'fade-in');
        heading.setAttribute('data-scroll-delay', String(Math.min(index * 50, 200)));
      }
    });

    // Добавляем анимации к секциям
    const sections = document.querySelectorAll('section, .about-header-section, .about-section');
    sections.forEach((section) => {
      if (!section.hasAttribute('data-scroll-animate') && !section.classList.contains('scroll-section')) {
        section.classList.add('scroll-section');
      }
    });

    // Добавляем анимации к строкам результатов в профиле
    const resultRows = document.querySelectorAll('.profile-test-result-row');
    resultRows.forEach((row, index) => {
      if (!row.hasAttribute('data-scroll-animate')) {
        row.setAttribute('data-scroll-animate', 'slide-left');
        row.setAttribute('data-scroll-delay', String(Math.min(index * 30, 200)));
      }
    });
  };

  // Инициализация при загрузке страницы
  const init = () => {
    // Добавляем анимации к элементам
    addAnimationsToElements();
    
    // Добавляем обработчик скролла с throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Вызываем несколько раз для элементов, уже видимых на экране
    // Это гарантирует, что все видимые элементы получат анимацию
    const checkVisibleElements = () => {
      handleScroll();
      // Проверяем элементы, которые уже видны на экране
      const elements = document.querySelectorAll('[data-scroll-animate]:not(.scroll-animated)');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Если элемент виден на экране (верхняя часть видна)
        if (rect.top < windowHeight && rect.bottom > 0) {
          element.classList.add('scroll-animated');
        }
      });
    };

    // Вызываем несколько раз с задержками
    setTimeout(checkVisibleElements, 50);
    setTimeout(checkVisibleElements, 200);
    setTimeout(checkVisibleElements, 500);

    // Переинициализация при изменении маршрута (для SPA)
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        addAnimationsToElements();
        handleScroll();
      }, 300);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Также переинициализируем при изменении роута
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        addAnimationsToElements();
        handleScroll();
      }, 300);
    });
  };

  // Запускаем инициализацию
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Небольшая задержка для гарантии полной загрузки
    setTimeout(init, 100);
  }
};

