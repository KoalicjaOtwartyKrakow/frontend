import React, { Suspense, useEffect, useState } from "react";
import "App.sass";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/login/LoginPage' or its ... Remove this comment to see the full error message
import LoginPage from "pages/login/LoginPage";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Auth' or its correspo... Remove this comment to see the full error message
import Auth from "services/Auth";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/loading/LoadingPage' or ... Remove this comment to see the full error message
import LoadingPage from "pages/loading/LoadingPage";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'pages/AuthenticatedPages' or i... Remove this comment to see the full error message
const Authenticated = React.lazy(() => import("pages/AuthenticatedPages"));

const App = () => {
    const [token, setToken] = useState(Auth.getAuthTokenFromStorage());
    const isAuthenticated = token !== Auth.emptyToken;

    const onSignInSuccess = (response: any) => {
        const token = Auth.startRotateRefreshToken(response);
        setToken(token);
    };

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
