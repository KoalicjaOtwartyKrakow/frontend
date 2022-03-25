import React from "react";
import { useGoogleLogin } from "react-google-login";
import PropTypes from "prop-types";
import { Alert, Button } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppConfig' or its co... Remove this comment to see the full error message
import { appConfig } from "constants/AppConfig";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginForm = ({ onSubmit }: any) => {
    const { t } = useTranslation(["common"]);

    const appConfigGsiClientId = appConfig.gsi.clientId;
    const clientId = `${appConfigGsiClientId}.apps.googleusercontent.com`;

    console.log({ clientId });

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

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
