import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import he from './locales/he/translation.json';

i18n.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
  lng: 'he',
  resources: {
    en: {
      translations: en
    },
    he: {
      translations: he
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'he'];

export default i18n;