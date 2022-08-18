import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { i18n } = useTranslation();

  const setTranslate = (lang) => {
    localStorage.setItem("locale", lang);
    i18n.changeLanguage(lang);
  };

  const getLocale = () => {
    return localStorage.getItem("locale") || "es";
  };

  return {
    setTranslate,
    getLocale,
  };
};
