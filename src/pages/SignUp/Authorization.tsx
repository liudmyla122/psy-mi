import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import './Authorization.css';
import { getAssetUrl } from '../../utils/assetPath';

const robotImg = getAssetUrl('_assets/images/pro proekt img/robot-registr.svg');

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
    <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-[900px] gap-8 md:gap-0 relative">
      <div className="w-full md:w-[450px] z-10">
        {children || <Form lang={lang} />}
      </div>
      {/* Робот скрыт по просьбе пользователя
      <div className="hidden md:block absolute right-[-100px] top-1/2 transform -translate-y-1/2 z-20 mt-5">
         <img 
           src={robotImg} 
           alt="robot" 
           width={283} 
           height={372} 
           loading="lazy" 
           className="robot-animated" 
         />
      </div>
       <div className="md:hidden mt-8">
         <img 
           src={robotImg} 
           alt="robot" 
           width={180} 
           height={240} 
           loading="lazy" 
           className="robot-animated" 
         />
      </div>
      */}
    </section>
  );
}


