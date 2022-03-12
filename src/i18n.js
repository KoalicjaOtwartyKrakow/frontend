import i18next from "i18next";
import I18nextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const translationsPath = "../locales";

const fallbackLanguage = "en";
const language = localStorage.getItem("language") || fallbackLanguage;

i18next
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(I18nextHttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(I18nextBrowserLanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: "en",
        debug: true,
        defaultNS: "common",

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18next;
