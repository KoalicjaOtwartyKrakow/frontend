import React, { Suspense, useEffect, useState } from "react";
import "App.sass";
import LoginPage from "pages/login/LoginPage";
import Auth from "services/Auth";
import LoadingPage from "pages/loading/LoadingPage";

const Authenticated = React.lazy(() => import("pages/AuthenticatedPages"));

const App = () => {
    const [token, setToken] = useState(Auth.getAuthTokenFromStorage());
    const isAuthenticated = token !== Auth.emptyToken;

    const onSignInSuccess = (response) => {
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
