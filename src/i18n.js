import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es_local from "./locales/es.json";
import en_local from "./locales/en.json";

const resources = {
  es: {
    translation: es_local,
  },
  en: {
    translation: en_local,
  },
};

const language = localStorage.getItem("locale") || "es";

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
