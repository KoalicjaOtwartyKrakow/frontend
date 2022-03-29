import React from "react";
import Jumbotron from "components/atoms/compat/Jumbotron";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "constants/AppRoutes";
import { appConfig } from "constants/AppConfig";
import { useTranslation } from "react-i18next";

const AuthenticatedHeader = () => {
    const navigate = useNavigate();
    const onJumbotronClick = () => {
        const path = AppRoutes.ROOT;
        navigate(path);
    };

    const { publicUrl } = appConfig;
    const { t } = useTranslation(["common"]);

    return (
        <>
            <Jumbotron onClick={onJumbotronClick}>
                <Container className="jumbotron__logos">
                    <div className="justify-content-start d-none d-lg-flex mb-2">
                        <img
                            alt="Logo of Salam Lab"
                            className="jumbotron__logos--logo"
                            src={`${publicUrl}/images/logo-salam-lab.jpeg`}
                        />
                        <img
                            alt="Logo of UA in Kraków"
                            className="jumbotron__logos--logo"
                            src={`${publicUrl}/images/logo-ua-in-krakow.jpeg`}
                        />
                        <img
                            alt="Logo of Zustricz"
                            className="jumbotron__logos--logo"
                            src={`${publicUrl}/images/logo-zustricz.jpeg`}
                        />
                        <img
                            alt="Logo of Koalicja Otwarty Kraków"
                            className="jumbotron__logos--logo"
                            src={`${publicUrl}/images/logo-koalicja.png`}
                        />
                    </div>
                    <p className="lead d-none d-lg-block">{t("common:application.header.subtitle")}</p>
                </Container>
            </Jumbotron>
        </>
    );
};

export default AuthenticatedHeader;
