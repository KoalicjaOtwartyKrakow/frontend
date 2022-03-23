import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { delay } from "lodash-es";

class Auth {
    static emptyToken = "";
    static token = `kokon-auth-token`;
    static httpHeader = "Authorization";

    static refreshTokenIntervalHandle = undefined;

    /**
     * @param {GoogleLoginResponse|GoogleLoginResponseOffline} response
     */
    static startRotateRefreshToken = (response) => {
        const getAsMilliseconds = (timeInSeconds = 3600 - 5 * 60) => timeInSeconds * 1000;
        const authResponse = response.getAuthResponse();

        // Timing to renew access token
        const refreshIterval = getAsMilliseconds(authResponse.expires_in);

        const refreshToken = async () => {
            const authResponse = await response.reloadAuthResponse();
            console.log("[Auth.refreshToken] authResponse:", authResponse);
            const token = authResponse.id_token;
            Auth.putAuthTokenToStorage(token);
            Auth.updateAxiosAuthorizationHeader(token)();
        };

        const token = response.getAuthResponse().id_token;
        Auth.putAuthTokenToStorage(token);

        delay(() => {
            Auth.refreshTokenIntervalHandle = setInterval(refreshToken, refreshIterval);
        }, refreshIterval);

        return token;
    };

    static stopRotateRefreshToken = () => {
        const token = Auth.emptyToken;
        clearInterval(Auth.refreshTokenIntervalHandle);
        Auth.putAuthTokenToStorage(token);
        return token;
    };

    static getHeaderValueFromAuthToken(token) {
        return `Bearer ${token}`;
    }

    static getAuthTokenFromStorage() {
        return localStorage.getItem(Auth.token) || Auth.emptyToken;
    }

    static putAuthTokenToStorage(token) {
        return localStorage.setItem(Auth.token, token);
    }

    static updateAxiosAuthorizationHeader(token) {
        return function () {
            const isAuthenticated = token !== Auth.emptyToken;
            if (isAuthenticated) {
                const value = Auth.getHeaderValueFromAuthToken(token);
                axios.defaults.headers.common[Auth.httpHeader] = value;
            } else {
                delete axios.defaults.headers.common[Auth.httpHeader];
            }
        };
    }
}

export default Auth;
