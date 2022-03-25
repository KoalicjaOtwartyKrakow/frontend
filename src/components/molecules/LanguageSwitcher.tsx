import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "reactstrap";
import { fallbackLanguage, supportedLanguages } from "i18n";

const LanguageSwitcher = ({ className }) => {
    const { i18n } = useTranslation(["accommodation"]);
    const storedLanguage = localStorage.getItem("i18nextLng") || fallbackLanguage;
    const [language, setLanguage] = useState(storedLanguage);

    const switchLanguage = (i18n, selectedLanguage) => () => {
        i18n.changeLanguage(selectedLanguage).then(() => {
            setLanguage(selectedLanguage);
        });
    };

    useEffect(() => {
        localStorage.setItem("i18nextLng", language);
    }, [language]);

    const isActive = (selectedLanguage) => language === selectedLanguage;

    return (
        <ButtonGroup size="sm" className={className}>
            {supportedLanguages.map((item) => {
                const active = isActive(item.code);
                return (
                    <Button onClick={switchLanguage(i18n, item.code)} active={active} outline={!active} key={item.code}>
                        {item.label}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default LanguageSwitcher;
