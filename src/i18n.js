import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./translations";

const language = localStorage.getItem("language") || "en";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: translations,
        lng: language,
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
