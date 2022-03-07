import React from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation } from "react-i18next";

import { Routes } from "constants/Routes";
import LanguageSwitcher from "components/atoms/LanguageSwitcher";
import Jumbotron from "components/atoms/compat/Jumbotron";
import AuthenticatedNavbar from "components/navbar/AuthenticatedNavbar";
import { emptyFn } from "shared/utils";

const AuthenticatedContainer = ({ children, history }) => {
    const onJumbotronClick = () => {
        const path = Routes.ROOT;
        history.push(path);
    };

    const { t } = useTranslation();

    return (
        <ToastProvider autoDismiss={Notifications.toastAutoDismiss}>
            <AuthenticatedNavbar onLogout={emptyFn} />
            <Jumbotron onClick={onJumbotronClick} className="pointer">
                <Container>
                    <h1 className="display-6">#KoalicjaOtwartyKraków</h1>
                    <p className="lead">{t("header.subtitle")}</p>
                </Container>
            </Jumbotron>
            <Container>
                <LanguageSwitcher />
            </Container>
            <Container fluid={false}>{children}</Container>
        </ToastProvider>
    );
};

export default withRouter(AuthenticatedContainer);
