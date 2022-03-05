import React from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation } from "react-i18next";

import Routes from "constants/Routes";
import LanguageSwitcher from "components/atoms/LanguageSwitcher";
import Jumbotron from "components/atoms/compat/Jumbotron";

const AuthenticatedContainer = ({ children, history }) => {
    const onJumbotronClick = () => {
        const path = Routes.ROOT;
        history.push(path);
    };

    const { t } = useTranslation();

    return (
        <ToastProvider autoDismiss={Notifications.toastAutoDismiss}>
            <Jumbotron onClick={onJumbotronClick} className="pointer">
                <Container>
                    <h1 className="display-3">#KoalicjaOtwartyKraków </h1>
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
