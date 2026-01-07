import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import './Authorization.css';
import { getAssetUrl } from '../../utils/assetPath';

// Компонент для печатания текста по словам
function TypewriterWords({ text, delay = 150, startDelay = 0, className = '', highlightText = '' }: { text: string; delay?: number; startDelay?: number; className?: string; highlightText?: string }) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const words = useMemo(() => text.split(' '), [text]);
  const highlightWords = useMemo(() => highlightText ? highlightText.split(' ') : [], [highlightText]);

  useEffect(() => {
    if (startDelay > 0 && !hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimeout);
    } else if (startDelay === 0) {
      setHasStarted(true);
    }
  }, [startDelay, hasStarted]);

  useEffect(() => {
    if (hasStarted && currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedWords(words.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words, delay, hasStarted]);


  return (
    <span className={className}>
      {displayedWords.map((word, index) => {
        const shouldHighlight = highlightText && index < highlightWords.length;
        return (
          <span key={index} className={shouldHighlight ? 'text-[#347AEC]' : ''}>
            {word}
            {index < displayedWords.length - 1 && ' '}
          </span>
        );
      })}
      {hasStarted && currentIndex < words.length && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

const robotImg = getAssetUrl('_assets/images/smileRobot.png');
const registerBorderImg = getAssetUrl('_assets/images/borders/register_border.png');

type Lang = {
  locale: string;
  backend_locale: string;
  login_page: any;
};

export function Authorization({ lang, children }: { lang: Lang; children?: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = Boolean(localStorage.getItem('authToken'));
    if (isAuth) {
      navigate(`/${lang.locale}/my-profile`, { replace: true });
    }
  }, [lang.locale, navigate]);

  return (
    <section className="flex flex-col md:flex-row items-center md:items-start md:gap-[50px]">
      <img src={robotImg} alt="robot" width={190} height={255} loading="lazy" className="flex-shrink-0 robot-animated" />
      <div className="flex flex-col items-center max-w-[500px] pt-0 pb-[30px] text-center md:text-left relative">
        <div className="relative w-full max-w-[414px] mb-[-25px] hidden md:block">
          <img
            src={registerBorderImg}
            alt="border"
            width={414}
            height={240}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-auto"
          />
          <div className="relative z-10 pl-[55px] pr-[50px] pt-[15px] pb-[25px]">
            <h1 className="text-[#262626] text-[17px] font-unbounded leading-[26px] font-bold mb-[20px] tracking-wider">
              <TypewriterWords 
                text="Want to create your complete psychological portrait?"
                delay={100}
              />
            </h1>
            <p className="font-unbounded text-[#262626] font-normal text-[12px] leading-[20px] break-words whitespace-normal mt-[-10px]">
              <TypewriterWords 
                text={`${lang.login_page.google_provider.p_highlight}${lang.login_page.google_provider.p_default}`}
                delay={80}
                startDelay={3000}
                highlightText={lang.login_page.google_provider.p_highlight}
              />
            </p>
          </div>
        </div>
        <div className="md:hidden mb-[65px]">
          <h1 className="text-[#262626] text-[20px] font-unbounded leading-[26px] font-bold mb-[15px]">
            <TypewriterWords 
              text={lang.login_page.google_provider.header}
              delay={100}
            />
          </h1>
          <p className="text-[#262626] font-medium max-w-[350px] leading-5 mobile-text-shift">
            <TypewriterWords 
              text={`${lang.login_page.google_provider.p_highlight} ${lang.login_page.google_provider.p_default}`}
              delay={80}
              startDelay={2500}
              highlightText={lang.login_page.google_provider.p_highlight}
            />
          </p>
        </div>
        <div className="md:ml-[35px] md:mt-[35px]">
          {children || <Form lang={lang} />}
        </div>
      </div>
    </section>
  );
}


