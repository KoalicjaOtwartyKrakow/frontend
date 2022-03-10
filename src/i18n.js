import i18next from "i18next";
import I18nextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const translationsPath = "../locales";

const fallbackLanguage = "en";
const language = localStorage.getItem("language") || fallbackLanguage;

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

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

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

// i18next
//     .use(
//         resourcesToBackend((language, namespace, callback) => {
//             import(`${translationsPath}/${language}/${namespace}.json`)
//                 .then((resources) => {
//                     callback(null, resources);
//                 })
//                 .catch((error) => {
//                     callback(error, null);
//                 });
//         })
//     )
//     .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//         fallbackLng: fallbackLanguage,
//         interpolation: {
//             escapeValue: false, // react already safes from xss
//         },
//         lng: language,
//         resources: {},
//     })
//     .then(() => {
//         console.log("[Translations] Initialized");
//     });
//
// i18next.addResourceBundle("en", "accommodations", translations);
//
export default i18next;
