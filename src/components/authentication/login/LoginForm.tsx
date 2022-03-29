import React from "react";
import { useGoogleLogin } from "react-google-login";
import { Alert, Button } from "reactstrap";
import { appConfig } from "constants/AppConfig";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginForm = ({ onSubmit }: any) => {
    const { t } = useTranslation(["common"]);

    const appConfigGsiClientId = appConfig.gsi.clientId;
    const clientId = `${appConfigGsiClientId}.apps.googleusercontent.com`;

    const { signIn, loaded } = useGoogleLogin({
        clientId,
        onSuccess: onSubmit,
        responseType: "permission",
    });

    return (
        <div className="d-flex h-100 justify-content-center align-items-center">
            {appConfigGsiClientId && (
                <Button size="lg" color="primary" onClick={signIn} disabled={!loaded}>
                    <FontAwesomeIcon icon={faGoogle} />
                    <span className="d-inline-block ms-3">{t("common:authentication.button.signIn")}</span>
                </Button>
            )}
            {!appConfigGsiClientId && (
                <Alert color="danger">
                    <h5>{t("common:authentication.error.signIn")}</h5>
                    <p className="mb-0">{t("common:authentication.error.clientIdInvalid")}.</p>
                </Alert>
            )}
        </div>
    );
};

export default LoginForm;
