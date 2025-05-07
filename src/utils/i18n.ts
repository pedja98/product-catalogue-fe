import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import { store } from '../app/store'
import { Language } from '../types/auth'

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: store.getState().auth.language.toLowerCase() || Language.SR.toLowerCase(),
    fallbackLng: Language.SR.toLowerCase(),
    debug: false,
    backend: {
      loadPath: 'http://localhost:3001/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['general'],
    defaultNS: 'general',
    interpolation: {
      escapeValue: false,
    },
  })

export const changeLanguageManually = (lang: Language) => {
  i18n.changeLanguage(lang.toLowerCase())
}

export default i18n
