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
    'header.profile': 'ПРОФІЛЬ',

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
    'about.client.business': 'ВЛАСНИКИ БІЗНЕСУ І ТОП-МЕНЕДЖМЕНТ',
    'about.client.hr': 'HR ТА РЕКРУТИНГ ВІДДІЛИ',
    'about.client.psychologists': 'ПСИХОЛОГИ ТА БІЗНЕС-КОУЧІ',
    'about.client.agencies': 'HR ТА РЕКРУТИНГОВІ АГЕНЦІЇ',
    'about.tests.title': 'НАШІ ТЕСТУВАННЯ:',
    'about.test.adizes.title': 'Тест Адізеса',
    'about.test.adizes.desc': 'В основі методики лежить PAEI-концепція, з...',
    'about.test.innovation.title': 'Інноваційний потенціал особистості',
    'about.test.innovation.desc': 'Тест дозволяє виявити, наскільки ви відкриті до...',
    'about.test.enneagram.title': 'Енеаграма',
    'about.test.enneagram.desc': 'Енеаграма – це психологічна модель, яка ро...',
    'about.author.label': 'НАША АВТОРСЬКА РОЗРОБКА',
    'about.author.description': 'Тест дозволяє виявити, наскільки ви відкриті до нових ідей, готові діяти в умовах невизначеності та здатні впроваджувати інновації у професійній та особистій діяльності. Також, оцінює ваш стиль пошуку нової інформації, рівень креативності, ставлення до інновацій, готовність до ризику, толерантність до невизначеності та здатність діяти ефективно у нових умовах.',
    'about.reviews.title': 'ВІДГУКИ КАНДИДАТІВ:',
    'about.review1.author': 'Юля, позиція: Асистент',
    'about.review1.text': 'Хочу висловити щиру подяку MI Agency за вашу професійну та людяну підтримку під час мого пошуку роботи.\n\nЯ отримала класну пропозицію, яка ідеально відповідала моїм кар’єрним цілям та світобаченню. Всі етапи співпраці були максимально чіткими, зрозумілими та евективними. Особливо приємно мене вразила емоційна складова, відчувалося щире зацікавлення моїм успіхом і підтримка на кожному етапі та дружня і тепла комунікація) за це дуже вдячна) завдяки пропозиції від вашої компанії я знайшла класне місце роботи, де я реалізовуюсь та відчуваю себе на своєму місці на всі 100%\n\nУспіхів вам!',
    'about.review2.author': 'Вікторія, позиція: Фінансовий менеджер',
    'about.review2.text': 'Півтора місяця тому я проходила співбесіду на посаду фінансового менеджера.\nХочу висловити щиру вдячність HR-менеджеру Ірині за її професіоналізм та відповідальний підхід до роботи.\nКожен етап співбесіди проходив у дружній та позитивній атмосфері, що сприяло відкритому й комфортному спілкуванню.\nІрина приділяє велику увагу деталям, чудово розпізнає таланти та потенціал кандидатів, гармонійно поєднуючи вимоги компанії з можливостями кандидатів.\nЇї підтримка та рекомендації допомогли швидко адаптуватися до роботи.\nІрина — це прекрасна людина і справжній професіонал, який завжди працює на найвищому рівні.\n\nЩиро дякую за співпрацю!',
  },
  en: {
    // Header
    'header.about': 'ABOUT PLATFORM',
    'header.tests': 'OUR TESTS',
    'header.reviews': 'REVIEWS',
    'header.takeTest': 'TAKE THE TEST',
    'header.login': 'LOGIN',
    'header.profile': 'PROFILE',

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
