import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "./locales/en/translation.json";
import translation_th from "./locales/th/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translation_en
      },
      th: {
        translation: translation_th
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
