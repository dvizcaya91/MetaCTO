import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import platformEn from '@/i18n/resources/en/platform'
import platformEs from '@/i18n/resources/es/platform'

void i18n.use(initReactI18next).init({
  defaultNS: 'platform',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  ns: ['platform'],
  resources: {
    en: {
      platform: platformEn,
    },
    es: {
      platform: platformEs,
    },
  },
})

export { i18n }
