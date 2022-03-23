import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "components/authentication/login/LoginPageContainer.scss";
import LoadingPage from "pages/loading/LoadingPage";
import LoginPageContainer from "components/authentication/login/LoginPageContainer";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { Redirect } from "react-router";

const LoginPage = ({ onSignInSuccess }) => {
    const isDestroyed = useRef(false);
    const [loginInProgress, setLoginInProgress] = useState(false);

    /**
     * @param {GoogleLoginResponse | GoogleLoginResponseOffline} response
     * @return
     */
    const onSignIn = (response) => {
        // eslint-disable-next-line no-debugger
        debugger;
        // const token = response.getAuthResponse().id_token;
        onSignInSuccess(response);
    };

    const onSignInError = (error, onSubmitError) => {
        const { errors, status } = {};
        onSubmitError(errors, status);
    };

    const onSignInFinally = () => {
        if (isDestroyed.current === false) {
            setLoginInProgress(false);
        }
    };

    useEffect(() => {
        isDestroyed.current = false;
        return () => {
            isDestroyed.current = true;
        };
    });

    return (
        <React.Fragment>
            <LoadingPage visible={loginInProgress} />
            <LoginPageContainer onSubmit={onSignIn} visible={!loginInProgress} />;
        </React.Fragment>
    );
};

LoginPage.propTypes = {
    onSignInSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
