import React from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Routes } from "constants/Routes";
import Jumbotron from "components/atoms/compat/Jumbotron";
import AuthenticatedNavbar from "components/navbar/AuthenticatedNavbar";
import { emptyFn } from "shared/utils";

const AuthenticatedContainer = ({ children }) => {
    const history = useHistory();
    const onJumbotronClick = () => {
        const path = Routes.ROOT;
        history.push(path);
    };

    const { t } = useTranslation(["common"]);

    return (
        <ToastProvider autoDismiss={Notifications.toastAutoDismiss}>
            <AuthenticatedNavbar onLogout={emptyFn} />
            <Jumbotron onClick={onJumbotronClick} className="pointer">
                <Container>
                    <h1 className="display-6">#KoalicjaOtwartyKraków</h1>
                    <p className="lead">
                        {t("common:application.header.subtitle")}
                    </p>
                </Container>
            </Jumbotron>
            <Container>
                <div className="mt-3 mb-3 text-muted">
                    Dashboard {">"} Breadcrumbs here...
                </div>
                {children}
            </Container>
        </ToastProvider>
    );
};

export default withRouter(AuthenticatedContainer);
