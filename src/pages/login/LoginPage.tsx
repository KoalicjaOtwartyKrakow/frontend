import React, { useEffect, useRef, useState } from "react";

import "components/authentication/login/LoginPageContainer.scss";

import LoadingPage from "pages/loading/LoadingPage";

import LoginPageContainer from "components/authentication/login/LoginPageContainer";
// eslint-disable-next-line no-unused-vars
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

const LoginPage = ({ onSignInSuccess }: any) => {
    const isDestroyed = useRef(false);
    const [loginInProgress, setLoginInProgress] = useState(false);

    /**
     * @param {GoogleLoginResponse | GoogleLoginResponseOffline} response
     * @return
     */
    const onSignIn = (response: any) => {
        // const token = response.getAuthResponse().id_token;
        onSignInSuccess(response);
    };

    const onSignInError = (error: any, onSubmitError: any) => {
        const { errors, status }: any = {};
        onSubmitError(errors, status);
    };

    const onSignInFinally = () => {
        if (!isDestroyed.current) {
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
            <LoginPageContainer onSubmit={onSignIn} visible={!loginInProgress} />
        </React.Fragment>
    );
};

export default LoginPage;
