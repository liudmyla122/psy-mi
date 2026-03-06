import { Authorization } from '../SignUp/Authorization';
import { Header, Footer } from '../../layout';

const ua = {
  locale: 'ua',
  backend_locale: 'ua',
  login_page: {
    google_provider: {
      header: 'Увійдіть до свого облікового запису',
      google_btn: 'Увійти за допомогою Google',
      email_btn: 'Увійти за допомогою пошти',
      no_account: 'Немає акаунту? ',
      register_link: 'Зареєструватися',
      support_text: 'Якщо у вас виникають проблеми пишіть',
      support_email: 'support@psy.mi'
    },
    form: {
      header_sign_up: 'Реєстрація',
      header_login: 'Увійдіть у свій акаунт',
      email: 'Email',
      first_name: "Ім'я",
      password: 'Пароль',
      re_password: 'Повторіть пароль',
      logged_in: 'Вже є акаунт? Увійти',
      registered: 'Потрібен акаунт? Зареєструватися',
      scope_placeholder: 'Сфера діяльності*',
      handle_errors: {},
    },
    created_profile: {
      register_btn: 'Зареєструватися',
      login_btn: 'Увійти',
      success_modal: {
        title: 'Успіх',
        register_text: 'Реєстрацію завершено. Ви можете розпочати тестування.',
        link: 'Перейти до тестів',
      },
      error_modal: { title: 'Помилка' },
    },
    handle_errors: {
      email_empty: "Email обов'язковий",
      first_name_empty: "Ім'я обов'язкове",
      password_empty: "Пароль обов'язковий",
      password_match_error: 'Паролі повинні співпадати',
      scope_empty: "Сфера діяльності обов'язкова",
      alert_modal: {
        password_length: 'Пароль повинен містити 8-16 символів',
        password_spacing: 'Пароль не повинен містити пробілів',
        password_uppercase: 'Пароль повинен містити хоча б одну велику літеру',
        password_spec_key: 'Пароль повинен містити хоча б один спеціальний символ',
        passwords_match: 'Паролі повинні співпадати',
      },
    },
  },
};

export function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#F6F7FB] flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-8 flex justify-center items-center">
          <Authorization lang={ua as any} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterPage;
