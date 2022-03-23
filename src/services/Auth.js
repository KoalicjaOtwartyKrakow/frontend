import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { delay } from "lodash-es";

class Auth {
    static emptyToken = "";
    static tokenItemName = "kokon-auth-token";
    static httpHeader = "Authorization";
    static rotateTokenIntervalHandle = undefined;

    /**
     * @param {GoogleLoginResponse|GoogleLoginResponseOffline} response
     */
    static startRotateRefreshToken = (response) => {
        const persistToken = (token) => {
            Auth.putAuthTokenToStorage(token);
            Auth.updateAxiosAuthorizationHeader(token)();
        };

        const rotateToken = async () => {
            const authResponse = await response.reloadAuthResponse();
            console.log("[Auth.refreshToken] authResponse:", authResponse);
            const token = authResponse.id_token;
            persistToken(token);
        };

        const getAsMilliseconds = (timeInSeconds = 3600 - 5 * 60) => timeInSeconds * 1000;
        const authResponse = response.getAuthResponse();
        const token = authResponse.id_token;

        persistToken(token);

        const tokenRotateInterval = getAsMilliseconds(authResponse.expires_in);

        delay(() => {
            Auth.rotateTokenIntervalHandle = setInterval(rotateToken, tokenRotateInterval);
        }, tokenRotateInterval);

        return token;
    };

    static stopRotateRefreshToken = () => {
        const token = Auth.emptyToken;
        clearInterval(Auth.rotateTokenIntervalHandle);
        Auth.putAuthTokenToStorage(token);
        return token;
    };

    static getHeaderValueFromAuthToken(token) {
        return `Bearer ${token}`;
    }

    static getAuthTokenFromStorage() {
        return localStorage.getItem(Auth.tokenItemName) || Auth.emptyToken;
    }

    static putAuthTokenToStorage(token) {
        return localStorage.setItem(Auth.tokenItemName, token);
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
