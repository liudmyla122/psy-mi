import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from './Form';
import './Authorization.css';

type Lang = {
  locale: string;
  backend_locale: string;
  login_page: any;
};

export function Authorization({ lang }: { lang: Lang }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = Boolean(localStorage.getItem('authToken'));
    if (isAuth) {
      navigate(`/${lang.locale}/my-profile`, { replace: true });
    }
  }, [lang.locale, navigate]);

  return (
    <section className="flex flex-col md:flex-row items-center md:items-start md:gap-[50px]">
      <img src="/_assets/images/smileRobot.png" alt="robot" width={190} height={255} loading="lazy" className="flex-shrink-0" />
      <div className="flex flex-col items-center max-w-[500px] pt-0 pb-[30px] text-center md:text-left relative">
        <div className="relative w-full max-w-[414px] mb-[-25px] hidden md:block">
          <img
            src="/_assets/images/borders/register_border.png"
            alt="border"
            width={414}
            height={240}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-auto"
          />
          <div className="relative z-10 pl-[55px] pr-[50px] pt-[15px] pb-[25px]">
            <h1 className="text-[#262626] text-[17px] font-unbounded leading-[26px] font-bold mb-[20px] whitespace-nowrap tracking-wider">
              Want to create your complete<br />
              psychological portrait?
            </h1>
            <p className="font-unbounded text-[#262626] font-normal text-[12px] leading-[20px] break-words whitespace-normal">
              <span className="text-[#347AEC] font-normal">
                {lang.login_page.google_provider.p_highlight}
              </span>
              {lang.login_page.google_provider.p_default}
            </p>
          </div>
        </div>
        <div className="md:hidden mb-[65px]">
          <h1 className="text-[#262626] text-[20px] font-unbounded leading-[26px] font-bold mb-[15px]">
            {lang.login_page.google_provider.header}
          </h1>
          <p className="text-[#262626] font-medium max-w-[350px] leading-5 mobile-text-shift">
            <span className="text-[#347AEC] font-[700] leading-5">
              {lang.login_page.google_provider.p_highlight}{' '}
            </span>
            {lang.login_page.google_provider.p_default}
          </p>
        </div>
        <div className="md:ml-[35px] md:mt-[35px]">
          <Form lang={lang} />
        </div>
      </div>
    </section>
  );
}


