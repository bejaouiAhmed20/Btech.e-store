import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './locales/fr/translation.json'

// The site is French-only by design. i18next is kept purely as a clean,
// centralized content layer (all copy lives in translation.json) rather
// than for runtime language switching.
i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

export default i18n
