import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ua' | 'en';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ua: {
    // Header
    'header.about': 'ПРО ПЛАТФОРМУ',
    'header.tests': 'НАШІ ТЕСТУВАННЯ',
    'header.reviews': 'ВІДГУКИ',
    'header.takeTest': 'ПРОЙТИ ТЕСТУВАННЯ',
    'header.login': 'УВІЙТИ',

    // About Page
    'about.subtitle': 'ІННОВАЦІЙНА ПСИХОЛОГІЧНА ПЛАТФОРМА',
    'about.description': 'Перша в Україні платформа, що робить бізнес-процеси ефективнішими, а команди сильнішими',
    'about.registration': 'РЕЄСТРАЦІЯ',
    'about.takeTest': 'ПРОЙТИ ТЕСТУВАННЯ',
    'about.trustedBy': 'Нам довіряють:',
    'about.aboutPlatform': 'Про платформу:',
    'about.platformDesc': '— надійний інструмент для найму та розвитку талантів. Виявляє сильні сторони, зони для розвитку, формує ефективні команди та допомагає ухвалювати зважені рішення, адаптуючись до потреб бізнесу.',
    'about.methodologies.title': 'ПЕРЕВІРЕНІ МЕТОДИКИ',
    'about.methodologies.text': 'Методики, які підтверджують свою ефективність на практиці.',
    'about.analytics.title': 'ГЛИБОКА АНАЛІТИКА',
    'about.analytics.text': 'Детальний аналіз для ухвалення точних рішень.',
    'about.flexibility.title': 'ГНУЧКІСТЬ ЗАСТОСУВАННЯ',
    'about.flexibility.text': 'Інструменти, адаптовані під бізнес-завдання.',
    'about.clients': 'Наші клієнти:',
    'about.client.business': 'Власники бізнесу та ТОП-менеджмент',
    'about.client.hr': 'HR та рекрутингові відділи',
    'about.client.psychologists': 'Психологи та бізнес-коучі',
    'about.client.agencies': 'HR та рекрутингові агенції',
  },
  en: {
    // Header
    'header.about': 'ABOUT PLATFORM',
    'header.tests': 'OUR TESTS',
    'header.reviews': 'REVIEWS',
    'header.takeTest': 'TAKE THE TEST',
    'header.login': 'LOGIN',

    // About Page
    'about.subtitle': 'INNOVATIVE PSYCHOLOGICAL PLATFORM',
    'about.description': 'The first platform in Ukraine that enhances business processes and strengthens teams',
    'about.registration': 'REGISTRATION',
    'about.takeTest': 'TAKE THE TEST',
    'about.trustedBy': 'Trusted by us:',
    'about.aboutPlatform': 'About the platform:',
    'about.platformDesc': '— a reliable tool for hiring and talent development. It identifies strengths, areas for growth, builds effective teams, and helps make informed decisions while adapting to business needs.',
    'about.methodologies.title': 'Proven methodologies',
    'about.methodologies.text': 'Methodologies that prove their effectiveness in practice.',
    'about.analytics.title': 'In-depth analytics',
    'about.analytics.text': 'Detailed analysis for making precise decisions.',
    'about.flexibility.title': 'Flexibility in application',
    'about.flexibility.text': 'Tools tailored to business needs.',
    'about.clients': 'Our Clients:',
    'about.client.business': 'Business Owners & Top Management',
    'about.client.hr': 'HR & Recruiting Departments',
    'about.client.psychologists': 'Psychologists & Business Coaches',
    'about.client.agencies': 'HR & Recruiting Agencies',
  },
};

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('appLanguage');
    return (savedLang === 'ua' || savedLang === 'en' ? savedLang : 'ua') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}
