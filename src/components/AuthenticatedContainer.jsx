import React from "react";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "constants/AppRoutes";
import Jumbotron from "components/atoms/compat/Jumbotron";
import AuthenticatedNavbar from "components/navbar/AuthenticatedNavbar";
import { emptyFn } from "shared/utils";
import { CustomToast } from "components/atoms/Toast";
import { appConfig } from "constants/AppConfig";

const AuthenticatedContainer = ({ children }) => {
    const navigate = useNavigate();
    const onJumbotronClick = () => {
        const path = AppRoutes.ROOT;
        navigate(path);
    };

    const { t } = useTranslation(["common"]);
    const { publicUrl } = appConfig;

    return (
        <ToastProvider autoDismiss={Notifications.toastAutoDismiss} components={{ Toast: CustomToast }}>
            <AuthenticatedNavbar onLogout={emptyFn} />
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
            <Container>
                <div className="mt-3 mb-3 text-muted d-none d-lg-block">Dashboard {">"} Breadcrumbs here...</div>
                {children}
            </Container>
        </ToastProvider>
    );
};

export default AuthenticatedContainer;
