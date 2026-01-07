import { Authorization } from '../SignUp/Authorization';
import { Sidebar } from '../../layout';

const ua = {
  locale: 'ua',
  backend_locale: 'ua',
  login_page: {
    google_provider: {
      header: 'Want to create your complete  psychological portrait?',
      p_highlight: 'Complete a quick registration',
      p_default: ' and I will save all your results!',
    },
    form: {
      header_sign_up: 'Sign up',
      header_login: 'Log in',
      email: 'Email',
      first_name: 'First Name',
      password: 'Password',
      re_password: 'Repeat password',
      logged_in: 'Already have an account? Log in',
      registered: 'Need an account? Sign up',
      scope_placeholder: 'Field of Activity*',
      handle_errors: {},
    },
    created_profile: {
      register_btn: 'Register',
      login_btn: 'Login',
      success_modal: {
        title: 'Success',
        register_text: 'Registration complete. You can start testing.',
        link: 'Go to tests',
      },
      error_modal: { title: 'Error' },
    },
    handle_errors: {
      email_empty: 'Email is required',
      password_empty: 'Password is required',
      password_match_error: 'Passwords must match',
      scope_empty: 'Field of Activity is required',
      alert_modal: {
        password_length: 'Password should contain 8-16 symbols',
        password_spacing: 'Password should not contain spaces',
        password_uppercase: 'Password should contain at least one uppercase letter',
        password_spec_key: 'Password should contain at least one special character',
        passwords_match: 'Passwords must match',
      },
    },
  },
};

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] px-4 py-6 md:py-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-14 md:items-start">
        <Sidebar />
        <div className="flex-1 md:pt-[124px]">
          <Authorization lang={ua as any} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
