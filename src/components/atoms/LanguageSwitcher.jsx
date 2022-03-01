import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";

const switchLanguage = (i18n, language) => () => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
};

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    return (
        <div>
            <Button onClick={switchLanguage(i18n, "pl")}>Polski</Button>
            <Button onClick={switchLanguage(i18n, "en")}>English</Button>
            <Button onClick={switchLanguage(i18n, "ua")}>українська</Button>
        </div>
    );
};

export default LanguageSwitcher;
