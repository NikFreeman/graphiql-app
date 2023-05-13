import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      lang: 'ENG',
      selectedLang: 'Selected Language: ENG',
      graphiqlBy: 'GraphiQL by Musical Trio',
      welcome: 'Welcome!',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      goToMain: 'Go to Main Page',
      signOut: 'Sign Out',
    },
  },
  ru: {
    translation: {
      lang: 'РУС',
      selectedLang: 'Язык: русский',
      graphiqlBy: 'GraphiQL от команды Musical Trio',
      welcome: 'Приветствуем!',
      signIn: 'Войти',
      signUp: 'Регистрация',
      goToMain: 'Вернуться на главную',
      signOut: 'Выйти',
    },
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
