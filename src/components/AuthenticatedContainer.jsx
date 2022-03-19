import React from "react";
import { Container } from "reactstrap";
import { useHistory, withRouter } from "react-router-dom";
import { Notifications } from "services/Notifications";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation } from "react-i18next";
import { Routes } from "constants/Routes";
import Jumbotron from "components/atoms/compat/Jumbotron";
import AuthenticatedNavbar from "components/navbar/AuthenticatedNavbar";
import { emptyFn } from "shared/utils";
import { CustomToast } from "components/atoms/Toast";

const AuthenticatedContainer = ({ children }) => {
    const history = useHistory();
    const onJumbotronClick = () => {
        const path = Routes.ROOT;
        history.push(path);
    };

    const { t } = useTranslation(["common"]);

    return (
        <ToastProvider
            autoDismiss={Notifications.toastAutoDismiss}
            components={{ Toast: CustomToast }}
        >
            <AuthenticatedNavbar onLogout={emptyFn} />
            <Jumbotron onClick={onJumbotronClick}>
                <Container>
                    <div className="jumbotron__logos">
                        <img className="jumbotron__logos--salam" src="salam-lab-logo.jpeg"/>
                        <img className="jumbotron__logos--uaik" src="ua-in-krakow-logo.jpeg"/>
                        <img className="jumbotron__logos--zustricz" src="zustricz-logo.jpeg"/>
                        <img className="jumbotron__logos--kok" src="koalicja-logo.png"/>
                    </div>
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
