import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { delay } from "lodash-es";

class Auth {
    static emptyToken = "";
    static tokenItemName = "kokon-auth-token";
    static httpHeader = "Authorization";
    static rotateTokenIntervalHandle = undefined;

    /**
     * @param {GoogleLoginResponse|GoogleLoginResponseOffline} response
     */
    static startRotateRefreshToken = (response: any) => {
        const persistToken = (token: any) => {
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'Timer' is not assignable to type 'undefined'... Remove this comment to see the full error message
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

    static getHeaderValueFromAuthToken(token: any) {
        return `Bearer ${token}`;
    }

    static getAuthTokenFromStorage() {
        return localStorage.getItem(Auth.tokenItemName) || Auth.emptyToken;
    }

    static putAuthTokenToStorage(token: any) {
        return localStorage.setItem(Auth.tokenItemName, token);
    }

    static updateAxiosAuthorizationHeader(token: any) {
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
