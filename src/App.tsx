import "App.sass";
import axios from "axios";
import { ApplicationSettings } from "components/settings/constants";
import { appConfig } from "constants/AppConfig";
import useApplicationSettings from "hooks/useApplicationSettings";
import LoadingPage from "pages/loading/LoadingPage";
import LoginPage from "pages/login/LoginPage";
import React, { Suspense, useEffect, useState } from "react";
import Auth from "services/Auth";

const Authenticated = React.lazy(() => import("pages/AuthenticatedPages"));

const App = () => {
    const applicationSettings = useApplicationSettings();
    const [token, setToken] = useState(Auth.getAuthTokenFromStorage());
    const isAuthenticated = token !== Auth.emptyToken;

    axios.defaults.timeout = Number(applicationSettings.get(ApplicationSettings.NETWORK_TIMEOUT));

    const onSignInSuccess = (response: any) => {
        const token = Auth.startRotateRefreshToken(response);
        setToken(token);
    };

    useEffect(() => {
        const checkTokenValidityHandle = setInterval(() => {
            if (Auth.isRotationActive()) {
                return;
            }
            if (!Auth.isTokenValid(token)) {
                setToken(Auth.emptyToken);
            }
        }, appConfig.checkTokenInterval);
        return () => clearInterval(checkTokenValidityHandle);
    }, [token]);

    const onLogout = () => {
        const token = Auth.stopRotateRefreshToken();
        setToken(token);
    };

    useEffect(Auth.updateAxiosAuthorizationHeader(token), [token]);

    return (
        <Suspense fallback={<LoadingPage visible={true} />}>
            {isAuthenticated ? <Authenticated onLogout={onLogout} /> : <LoginPage onSignInSuccess={onSignInSuccess} />}
        </Suspense>
    );
};

export default App;
