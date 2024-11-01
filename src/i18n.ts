import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as en from "./locales/en/translation.json";
import * as ru from "./locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru }
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
